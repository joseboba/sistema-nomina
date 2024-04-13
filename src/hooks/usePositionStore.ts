import {getEnvVariables, parsePagination} from "../helpers";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {Utilities} from "../util";
import {
    cleanDepartmentData, cleanPositionData,
    setPosition,
    setPositionPageResult,
    setPositionParams
} from "../store/modules/administration";
import {payrollApi} from "../api";
import {DepartmentInterface, PositionInterface} from "../interfaces";


const {VITE_POSITION_URI, VITE_DEPARTMENT_URI} = getEnvVariables();

export const usePositionStore = () => {

    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);

    const positionValues = useSelector((state: StoreInterface) => state.position);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
        getAllDepartments();
    }, []);

    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setPositionParams(params));
            const { data, headers } = await payrollApi.get(`${VITE_POSITION_URI}`, {params});
            const response = parsePagination<PositionInterface>(headers);
            response.content = data;
            dispatch(setPositionPageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_POSITION_URI}/${code}`);
            dispatch(setPosition(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (position: PositionInterface) => {
        try {
            const {search, page} = positionValues.params;
            if (position.pueCodigo) {
                await payrollApi.put(`${VITE_POSITION_URI}`, position);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setPosition(position));
                return;
            }

            const { data } = await payrollApi.post(`${VITE_POSITION_URI}`, position);
            await Utilities.successAlarm('Registro guardado');
            await findAll();
            dispatch(setPosition(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = positionValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_POSITION_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === positionValues.pueCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanPositionData());
    }

    const getAllDepartments = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_DEPARTMENT_URI}/all`);
            const defaultData = [{depCodigo: 0, depNombre: 'Seleccione un departamento'}];
            setDepartments([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    return {
        ...positionValues,
        positionValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm,
        departments
    }

}