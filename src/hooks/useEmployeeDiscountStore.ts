import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeInterface} from "../interfaces";
import {Utilities} from "../util";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanEmployeeDiscount,
    setEmployeeDiscount,
    setEmployeeDiscountPage,
    setEmployeeDiscountParams
} from "../store/modules/administration";
import {useEffect} from "react";
import {StoreInterface} from "../store";


const {VITE_EMPLOYEE_URI} = getEnvVariables();

export const useEmployeeDiscountStore = () => {

    const employeeDiscountValues = useSelector((state: StoreInterface) => state.employeeDiscount);

    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);

    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setEmployeeDiscountParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_EMPLOYEE_URI}`, {params});
            const response = parsePagination<EmployeeInterface>(headers);
            response.content = data;
            dispatch(setEmployeeDiscountPage(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_URI}/${code}`);
            const discountData = {
                empCodigo: data.empCodigo,
                tdsCodigo: 0,
                empPrimerNombre: data.empPrimerNombre,
                empSegundoNombre: data.empSegundoNombre,
            };

            dispatch(setEmployeeDiscount(discountData));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanEmployeeDiscount());
    }

    return {
        ...employeeDiscountValues,
        employeeDiscountValues,
        findAll,
        findById,
        cleanForm
    }

};
