import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {DepartmentInterface} from "../interfaces";
import {
    cleanDepartmentData,
    setDepartment,
    setDepartmentPageResult,
    setDepartmentParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_DEPARTMENT_URI} = getEnvVariables();

export const useDepartmentStore = () => {

    const departmentValues = useSelector((state: StoreInterface) => state.department);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setDepartmentParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_DEPARTMENT_URI}`, {params});
            const response = parsePagination<DepartmentInterface>(headers);
            response.content = data;
            dispatch(setDepartmentPageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_DEPARTMENT_URI}/${code}`);
            dispatch(setDepartment(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (department: DepartmentInterface) => {
        try {
            const {search, page} = departmentValues.params;
            if (department.depCodigo) {
                await payrollApi.put(`${VITE_DEPARTMENT_URI}`, department);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                return;
            }

            const {data} = await payrollApi.post(`${VITE_DEPARTMENT_URI}`, department);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setDepartment(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = departmentValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_DEPARTMENT_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanDepartmentData());
    }


    return {
        ...departmentValues,
        departmentValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
