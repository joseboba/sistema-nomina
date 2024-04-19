import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeByPositionInteface, OtherIncomeInterface} from "../interfaces";
import {
    clearDataOtherIncome,
    setOtherIncome,
    setPageResultOtherIncome,
    setParamsOtherIncome
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_OTHER_INCOME_URI} = getEnvVariables();

export const useOtherIncomeStore = () => {

    const [employeesByPosition, setEmployeesByPosition] = useState<EmployeeByPositionInteface[]>([]);

    const otherIncomeValues = useSelector((state: StoreInterface) => state.otherIncome);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
        getAllEmployees();
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsOtherIncome(params));
            const {data, headers} = await payrollApi.get(`${VITE_OTHER_INCOME_URI}`, {params});
            const response = parsePagination<OtherIncomeInterface>(headers);
            response.content = data;
            dispatch(setPageResultOtherIncome(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_OTHER_INCOME_URI}/${code}`);
            dispatch(setOtherIncome(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (otherIncome: OtherIncomeInterface) => {
        try {
            otherIncome.oinFecha = otherIncome.oinFecha.format("DD/MM/YYYY");
            const {search, page} =  otherIncomeValues.params;
            if (otherIncome.oinCodigo) {
                await payrollApi.put(`${VITE_OTHER_INCOME_URI}`, otherIncome);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setOtherIncome(otherIncome));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_OTHER_INCOME_URI}`, otherIncome);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setOtherIncome(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = otherIncomeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_OTHER_INCOME_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === otherIncomeValues.oinCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearDataOtherIncome());
    }

    const getAllEmployees = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_OTHER_INCOME_URI}/empleados`);
            const defaultData: EmployeeByPositionInteface[] = [{epuCodigo: 0,
                    empPrimerNombre: 'Seleccione un empleado', empSegundoNombre: "", empPrimerApellido: "", empSegundoApellido: ""}];
            setEmployeesByPosition([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    return {
        ...otherIncomeValues,
        otherIncomeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm,
        employeesByPosition
    }
}
