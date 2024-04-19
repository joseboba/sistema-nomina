import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {PeriodInterface} from "../interfaces";
import {
    setPeriodPageResult,
    cleanPeriodData,
    setPeriod,
    setPeriodParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_PERIOD_URI} = getEnvVariables();

export const usePeriodStore = () => {

    const periodValues = useSelector((state: StoreInterface) => state.period);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setPeriodParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_PERIOD_URI}`, {params});
            const response = parsePagination<PeriodInterface>(headers);
            response.content = data;
            dispatch(setPeriodPageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_PERIOD_URI}/${code}`);
            dispatch(setPeriod(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (period: PeriodInterface) => {
        try {
            period.perFechaInicio = period.perFechaInicio.format("DD/MM/YYYY");
            period.perFechaFinal = period.perFechaFinal.format("DD/MM/YYYY");
            period.perFechaPago = period.perFechaPago.format("DD/MM/YYYY");

            const {search, page} =  periodValues.params;
            if (period.perCodigo) {
                await payrollApi.put(`${VITE_PERIOD_URI}`, period);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setPeriod(period));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_PERIOD_URI}`, period);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setPeriod(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = periodValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_PERIOD_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === periodValues.perCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanPeriodData());
    }


    return {
        ...periodValues,
        periodValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
