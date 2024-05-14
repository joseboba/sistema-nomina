import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeInterface} from "../interfaces";
import {Utilities} from "../util";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanEmployeeBonusData,
    setEmployeeBonusData,
    setEmployeeBonusDataParams,
    setEmployeeBonusPage
} from "../store/modules/administration";
import {useEffect} from "react";
import {StoreInterface} from "../store";


const {VITE_EMPLOYEE_URI} = getEnvVariables();

export const useEmployeeBonusStore = () => {

    const employeeBonusValues = useSelector((state: StoreInterface) => state.employeeBonus);

    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);

    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setEmployeeBonusDataParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_EMPLOYEE_URI}`, {params});
            const response = parsePagination<EmployeeInterface>(headers);
            response.content = data;
            dispatch(setEmployeeBonusPage(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_URI}/${code}`);
            const bonusData = {
                empCodigo: data.empCodigo,
                bonCodigo: 0,
                empPrimerNombre: data.empPrimerNombre,
                empSegundoNombre: data.empSegundoNombre,
            };

            dispatch(setEmployeeBonusData(bonusData));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanEmployeeBonusData());
    }

    return {
        ...employeeBonusValues,
        employeeBonusValues,
        findAll,
        findById,
        cleanForm
    }

};
