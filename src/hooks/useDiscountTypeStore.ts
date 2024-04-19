import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {DiscountTypeInterface} from "../interfaces";
import {
    setDiscountTypePageResult,
    cleanDiscountTypeData,
    setDiscountType,
    setDiscountTypeParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_DISCOUNT_TYPE_URI} = getEnvVariables();

export const useDiscountTypeStore = () => {

    const discountTypeValues = useSelector((state: StoreInterface) => state.discountType);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setDiscountTypeParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_DISCOUNT_TYPE_URI}`, {params});
            const response = parsePagination<DiscountTypeInterface>(headers);
            response.content = data;
            dispatch(setDiscountTypePageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_DISCOUNT_TYPE_URI}/${code}`);
            dispatch(setDiscountType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (discountType: DiscountTypeInterface) => {
        try {
            const {search, page} =  discountTypeValues.params;
            if (discountType.tdsCodigo) {
                await payrollApi.put(`${VITE_DISCOUNT_TYPE_URI}`, discountType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setDiscountType(discountType));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_DISCOUNT_TYPE_URI}`, discountType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setDiscountType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = discountTypeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_DISCOUNT_TYPE_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === discountTypeValues.tdsCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanDiscountTypeData());
    }


    return {
        ...discountTypeValues,
        discountTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
