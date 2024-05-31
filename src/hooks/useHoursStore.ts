import { useEffect, useState } from "react";
import { getEnvVariables } from "../helpers";
import { EmployeeInterface, HoursInterface } from "../interfaces";
import { useSelector } from "react-redux";
import { StoreInterface } from "../store";
import { useDispatch } from "react-redux";
import moment, { Moment } from "moment";
import { payrollApi } from "../api";
import { cleanHours, setEmployee, setHours } from "../store/modules/administration";
import { Utilities } from "../util";

const {VITE_HOURS_URI, VITE_EMPLOYEE_URI} = getEnvVariables();

export const useHoursStore = () => {

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const hoursValues = useSelector((state: StoreInterface) => state.hours);
    const employeeValues = useSelector((state: StoreInterface) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const findByEmployeeAndDate = async (empCode: number, date: Moment, employee: EmployeeInterface) => {
        try {
            var stringDate = date.format('DD-MM-YYYY');
            const {data} = await payrollApi.get(`${VITE_HOURS_URI}/${empCode}&${stringDate}`);
            dispatch(setHours(data));
            dispatch(setEmployee(employee));
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveHourIncome = async (hours: HoursInterface, employee: EmployeeInterface) => {
        try {
            hours.hrsHoraEntrada = moment().format("DD-MM-YYYY HH:mm");
            const {data} = await payrollApi.post(`${VITE_HOURS_URI}`, hours);
            await Utilities.successAlarm('Ingreso Registrado');
            await findByEmployeeAndDate(employee.empCodigo!, moment(), employee);
            dispatch(setHours(data));
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveHourOutcome = async (hours: HoursInterface, employee: EmployeeInterface) => {
        try {
            hours.hrsHoraSalida = moment().format("DD-MM-YYYY HH:mm");
            await payrollApi.put(`${VITE_HOURS_URI}`, hours);
            await Utilities.successAlarm('Salida Registrada');
            await findByEmployeeAndDate(employee.empCodigo!, moment(), employee);
            dispatch(setHours(hours));
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanHours());
    }

    const getAllEmployees = async () => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_URI}/all`);
            const defaultData = [{empCodigo: 0, empCUI: '', empPrimerNombre: 'Seleccione un empleado', empPrimerApellido: ''}];
            setEmployees([...defaultData, ...data]);
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    return{
        ...hoursValues,
        ...employeeValues,
        hoursValues,
        employeeValues,
        findByEmployeeAndDate,
        saveHourIncome,
        saveHourOutcome,
        cleanForm,
        employees
    }

}
