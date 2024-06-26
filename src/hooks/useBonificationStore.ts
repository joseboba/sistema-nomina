import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {BonificationInterface} from "../interfaces";
import {
    clearDataBonification,
    setBonification,
    setPageResultBonification,
    setParamsBonification
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_BONIFICATION_URI} = getEnvVariables();

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
            const {data, headers} = await payrollApi.get(`${VITE_BONIFICATION_URI}`, {params});
            const response = parsePagination<BonificationInterface>(headers);
            response.content = data;
            dispatch(setPageResultBonification(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_BONIFICATION_URI}/${code}`);
            dispatch(setBonification(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (bonification: BonificationInterface) => {
        try {
            const {search, page} = bonificationValues.params;
            if (bonification.bonCodigo) {
                await payrollApi.put(`${VITE_BONIFICATION_URI}`, bonification);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setBonification(bonification));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_BONIFICATION_URI}`, bonification);
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
            await payrollApi.delete(`${VITE_BONIFICATION_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === bonificationValues.bonCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearDataBonification());
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
