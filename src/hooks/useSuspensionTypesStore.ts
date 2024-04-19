import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import { SuspensionTypeInterface} from "../interfaces";
import {
    clearSuspensionTypeData,
    setSuspensionType,
    setPageResultSuspensionTypes,
    setSuspensionTypesParameters
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_SUSPENSION_TYPES_URI} = getEnvVariables();

export const useSuspensionTypesStore = () => {

    const suspensionTypesValues = useSelector((state: StoreInterface) => state.suspensionTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setSuspensionTypesParameters(params));
            const {data, headers} = await payrollApi.get(`${VITE_SUSPENSION_TYPES_URI}`, {params});
            const response = parsePagination<SuspensionTypeInterface>(headers);
            response.content = data;
            dispatch(setPageResultSuspensionTypes(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_SUSPENSION_TYPES_URI}/${code}`);
            dispatch(setSuspensionType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (suspensionType: SuspensionTypeInterface) => {
        try {
            const {search, page} = suspensionTypesValues.params;
            if (suspensionType.tsuCodigo) {
                await payrollApi.put(`${VITE_SUSPENSION_TYPES_URI}`, suspensionType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setSuspensionType(suspensionType));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_SUSPENSION_TYPES_URI}`, suspensionType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setSuspensionType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = suspensionTypesValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_SUSPENSION_TYPES_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === suspensionTypesValues.tsuCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearSuspensionTypeData());
    }


    return {
        ...suspensionTypesValues,
        suspensionTypesValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
