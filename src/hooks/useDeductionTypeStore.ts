import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import { DeductionTypeInterface } from "../interfaces";
import {
    clearDataDeductionType,
    setDeductionType,
    setPageResultDeductionType,
    setParamsDeductionType
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_TIPO_DEDUCCIONES_URI} = getEnvVariables();

export const useDeductionTypeStore = () => {

    const deductionTypeValues = useSelector((state: StoreInterface) => state.deductionType);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsDeductionType(params));
            const { data, headers } = await payrollApi.get(`${VITE_TIPO_DEDUCCIONES_URI}`, {params});
            const response = parsePagination<DeductionTypeInterface>(headers);
            response.content = data;
            dispatch(setPageResultDeductionType(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const { data } = await payrollApi.get(`${VITE_TIPO_DEDUCCIONES_URI}/${code}`);
            dispatch(setDeductionType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (deductionType: DeductionTypeInterface) => {
        try {
            const {search, page} = deductionTypeValues.params;
            if (deductionType.tdeCodigo) {
                await payrollApi.put(`${VITE_TIPO_DEDUCCIONES_URI}`, deductionType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setDeductionType(deductionType));
                return;
            }

            const { data } = await payrollApi.post(`${VITE_TIPO_DEDUCCIONES_URI}`, deductionType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setDeductionType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = deductionTypeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_TIPO_DEDUCCIONES_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === deductionTypeValues.tdeCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearDataDeductionType());
    }


    return {
        ...deductionTypeValues,
        deductionTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
