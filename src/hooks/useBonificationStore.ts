import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {BonificationInterface} from "../interfaces";
import {
    cleanDataBonification,
    setBonification,
    setPageResultBonification,
    setParamsBonification
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_BONIFICACION_URI} = getEnvVariables();

export const useBonificationStore = () => {

    const bonificationValues = useSelector((state: StoreInterface) => state.bonification);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsBonification(params));
            const {data, headers} = await payrollApi.get(`${VITE_BONIFICACION_URI}`, {params});
            const response = parsePagination<BonificationInterface>(headers);
            response.content = data;
            dispatch(setPageResultBonification(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_BONIFICACION_URI}/${code}`);
            dispatch(setBonification(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (bonification: BonificationInterface) => {
        try {
            const {search, page} = bonificationValues.params;
            if (bonification.bonCodigo) {
                await payrollApi.put(`${VITE_BONIFICACION_URI}`, bonification);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                return;
            }

            const {data} = await payrollApi.post(`${VITE_BONIFICACION_URI}`, bonification);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setBonification(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = bonificationValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_BONIFICACION_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            cleanForm();
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanDataBonification());
    }


    return {
        ...bonificationValues,
        bonificationValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
