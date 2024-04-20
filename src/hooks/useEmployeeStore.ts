import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeInterface, BankInterface, AccountTypeInterface, PositionInterface, CurrencyTypeInterface} from "../interfaces";
import {
    cleanEmployeeData, cleanBankData, cleanAccountTypeData, cleanPositionData, cleanCurrencyTypeData,
    setEmployee,
    setEmployeePageResult,
    setEmployeeParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_EMPLOYEE_URI, VITE_BANK_URI, VITE_ACCOUNT_TYPE_URI, VITE_POSITION_URI, VITE_CURRENCY_TYPE_URI} = getEnvVariables();

export const useEmployeeStore = () => {

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [banks, setBanks] = useState<BankInterface[]>([]);
    const [accountTypes, setAccountTypes] = useState<AccountTypeInterface[]>([]);
    const [positions, setPositions] = useState<PositionInterface[]>([]);
    const [currencyTypes, setCurrencyTypes] = useState<CurrencyTypeInterface[]>([]);

    const employeeValues = useSelector((state: StoreInterface) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
        getAllEmployees();
        getAllBanks();
        getAllAccountTypes();
        getAllPositions();
        getAllCurrencyTypes();
    }, []);

    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setEmployeeParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_EMPLOYEE_URI}`, {params});
            const response = parsePagination<EmployeeInterface>(headers);
            response.content = data;
            dispatch(setEmployeePageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_URI}/${code}`);
            dispatch(setEmployee(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (employee: EmployeeInterface) => {
        try {
            const {search, page} = employeeValues.params;
            employee.epuSalario = +employee.epuSalario;
            employee.empFechaNacimiento = employee.empFechaNacimiento.format('DD-MM-YYYY');
            employee.empFechaInicio = employee.empFechaInicio.format('DD-MM-YYYY');
            if(employee.empCodigo) {
                await payrollApi.put(`${VITE_EMPLOYEE_URI}`, employee);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setEmployee(employee));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_EMPLOYEE_URI}`, employee);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setEmployee(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = employeeValues.params;
            const result = await Utilities.warningAlarm('¿Desea deshabilitar este registro?');
            if(result) {
                return;
            }

            await payrollApi.put(`${VITE_EMPLOYEE_URI}/${code}`);
            await Utilities.successAlarm('Registro deshabilitado');
            await findAll(search, page);
            if(code === employeeValues.empCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanEmployeeData());
    }

    const getAllEmployees = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_EMPLOYEE_URI}/all`);
            const defaultData = [{empCodigo: 0, empPrimerNombre: 'Seleccione un encargado'}];
            setEmployees([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllBanks = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_BANK_URI}/all`);
            const defaultData = [{banCodigo: 0, banNombre: 'Seleccione un banco'}];
            setBanks([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllAccountTypes = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_ACCOUNT_TYPE_URI}/all`);
            const defaultData = [{tcuCodigo: 0, tcuNombre: 'Seleccione un tipo de cuenta'}];
            setAccountTypes([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllPositions = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_POSITION_URI}/all`);
            const defaultData = [{pueCodigo: 0, pueNombre: 'Seleccione un puesto'}];
            setPositions([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllCurrencyTypes = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_CURRENCY_TYPE_URI}/all`);
            const defaultData = [{tmoCodigo: 0, tmoNombre: 'Seleccione un tipo de moneda'}];
            setCurrencyTypes([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    return {
        ...employeeValues,
        employeeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm,
        employees,
        banks,
        accountTypes,
        positions,
        currencyTypes
    }

}