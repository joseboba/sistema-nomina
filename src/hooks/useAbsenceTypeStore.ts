import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {AbsenceTypeInterface} from "../interfaces";
import {
    cleanAbsenceTypeData,
    setAbsenceType,
    setAbsenceTypePageResult,
    setAbsenceTypeParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_ABSENCE_TYPE_URI} = getEnvVariables();

export const useAbsenceTypeStore = () => {

    const absenceTypeValues = useSelector((state: StoreInterface) => state.absenceType);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setAbsenceTypeParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_ABSENCE_TYPE_URI}`, {params});
            const response = parsePagination<AbsenceTypeInterface>(headers);
            response.content = data;
            dispatch(setAbsenceTypePageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_ABSENCE_TYPE_URI}/${code}`);
            dispatch(setAbsenceType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (absenceType: AbsenceTypeInterface) => {
        try {
            const {search, page} = absenceTypeValues.params;
            if (absenceType.tauCodigo) {
                await payrollApi.put(`${VITE_ABSENCE_TYPE_URI}`, absenceType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setAbsenceType(absenceType));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_ABSENCE_TYPE_URI}`, absenceType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setAbsenceType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = absenceTypeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_ABSENCE_TYPE_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === absenceTypeValues.tauCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanAbsenceTypeData());
    }


    return {
        ...absenceTypeValues,
        absenceTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
