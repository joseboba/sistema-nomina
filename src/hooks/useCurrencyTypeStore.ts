import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {CurrencyTypeInterface} from "../interfaces";
import {
    setCurrencyTypePageResult,
    cleanCurrencyTypeData,
    setCurrencyType,
    setCurrencyTypeParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_CURRENCY_TYPE_URI} = getEnvVariables();

export const useCurrencyTypeStore = () => {

    const currencyTypeValues = useSelector((state: StoreInterface) => state.currencyType);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setCurrencyTypeParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_CURRENCY_TYPE_URI}`, {params});
            const response = parsePagination<CurrencyTypeInterface>(headers);
            response.content = data;
            dispatch(setCurrencyTypePageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_CURRENCY_TYPE_URI}/${code}`);
            dispatch(setCurrencyType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (currencyType: CurrencyTypeInterface) => {
        try {
            const {search, page} =  currencyTypeValues.params;
            if (currencyType.tmoCodigo) {
                await payrollApi.put(`${VITE_CURRENCY_TYPE_URI}`, currencyType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setCurrencyType(currencyType));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_CURRENCY_TYPE_URI}`, currencyType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setCurrencyType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = currencyTypeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_CURRENCY_TYPE_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === currencyTypeValues.tmoCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanCurrencyTypeData());
    }


    return {
        ...currencyTypeValues,
        currencyTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
