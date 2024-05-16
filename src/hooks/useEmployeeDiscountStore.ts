import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeDiscountAssociated, EmployeeDiscountNoAssociated, EmployeeInterface} from "../interfaces";
import {Utilities} from "../util";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanEmployeeDiscount,
    setDiscountAssociated,
    setDiscountNoAssociated,
    setEmployeeDiscount,
    setEmployeeDiscountPage,
    setEmployeeDiscountParams
} from "../store/modules/administration";
import {useEffect} from "react";
import {StoreInterface} from "../store";


const {VITE_EMPLOYEE_URI, VITE_EMPLOYEE_DISCOUNT} = getEnvVariables();

export interface DiscountAssociation {
    tdeCodigo: number | null;
    demEstado: boolean;
    empCodigo: number;
}


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

    const findById = async (empCode: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_URI}/${empCode}`);
            const discountData = {
                empCodigo: data.empCodigo,
                tdeCodigo: 0,
                empPrimerNombre: data.empPrimerNombre,
                empSegundoNombre: data.empSegundoNombre,
            };

            await findDiscountAssociated(empCode);
            await findDiscountNoAssociated(empCode);
            dispatch(setEmployeeDiscount(discountData));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findDiscountAssociated = async (empCode: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_DISCOUNT}/deducciones-por-empleado/${empCode}`);
            const employeeDiscountAssociated: EmployeeDiscountAssociated[] = [];
            for (const o of data) {
                employeeDiscountAssociated.push({
                    empCodigo: o['empCodigo'],
                    epuCodigo: o['epuCodigo'],
                    demCodigo: o['demCodigo'],
                    demEstado: o['demEstado'],
                    tdeCodigo: o['tdeCodigo'],
                    tdeNombre: o['tdeNombre'],
                    tdeDescripcion: o['tdeDescripcion'],
                    tdeMonto: o['tdeMonto'],
                    tdePorcentaje: o['tdePorcentaje'],
                    tdeEstado: o['tdeEstado']
                });
            }

            dispatch(setDiscountAssociated(employeeDiscountAssociated));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findDiscountNoAssociated = async (empCode: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_EMPLOYEE_DISCOUNT}/deducciones-sin-asignar/${empCode}`);
            const employeeDiscountNoAssociated: EmployeeDiscountNoAssociated[] = [{
                tdeCodigo: 0,
                tdeNombre: 'Selecciona una deducción',
                tdeDescripcion: '',
                tdeMonto: 0,
                tdePorcentaje: 0,
                tdeEstado: 0,
            }];

            for (const o of data) {
                employeeDiscountNoAssociated.push({
                    tdeCodigo: o['tdeCodigo'],
                    tdeNombre: o['tdeNombre'],
                    tdeDescripcion: o['tdeDescripcion'],
                    tdeMonto: o['tdeMonto'],
                    tdePorcentaje: o['tdePorcentaje'],
                    tdeEstado: o['tdeEstado']
                });
            }

            dispatch(setDiscountNoAssociated(employeeDiscountNoAssociated));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const deleteAssociateDiscount = async (empCodigo: number, tdeCodigo: number) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_EMPLOYEE_DISCOUNT}/${tdeCodigo}`);
            await findById(empCodigo);
            await Utilities.successAlarm('Registro eliminado');
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveDiscountAssociation = async (empCodigo: number, tdeCodigo: number | null) => {
        try {
            const newData = {...employeeDiscountValues, tdeCodigo};
            dispatch(setEmployeeDiscount(newData));
            const bonusAssociation: DiscountAssociation = {
                empCodigo,
                tdeCodigo,
                demEstado: true
            };
            await payrollApi.post(`${VITE_EMPLOYEE_DISCOUNT}`, bonusAssociation);
            await findById(empCodigo);
            await Utilities.successAlarm('Registro guardado');
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
        findDiscountNoAssociated,
        findDiscountAssociated,
        deleteAssociateDiscount,
        saveDiscountAssociation,
        cleanForm
    }

};
