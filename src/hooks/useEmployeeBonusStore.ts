import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeBonusAssociated, EmployeeBonusNoAssociated, EmployeeInterface} from "../interfaces";
import {Utilities} from "../util";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanEmployeeBonusData, setBonusAssociated, setBonusNoAssociated,
    setEmployeeBonusData,
    setEmployeeBonusDataParams,
    setEmployeeBonusPage
} from "../store/modules/administration";
import {useEffect} from "react";
import {StoreInterface} from "../store";


const {VITE_EMPLOYEE_URI, VITE_EMPLOYEE_BONUS} = getEnvVariables();

export interface BonusAssociation {
    empCodigo: number;
    bonCodigo: number | null;
    eboEstado: number;
}


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
            await findBonusAssociated(code);
            await findBonusNoAssociated(code);
            dispatch(setEmployeeBonusData(bonusData));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findBonusAssociated = async (code: number) => {
        try {
            const { data } = await payrollApi.get(`${VITE_EMPLOYEE_BONUS}/bonificaciones-por-empleado/${code}`);
            const employeeBonusAssociated: EmployeeBonusAssociated[] = [];
            for (const o of data) {
                employeeBonusAssociated.push({
                    empCodigo:             o['empCodigo'],
                    epuCodigo:             o['epuCodigo'],
                    empBonificacionCodigo: o['empBonificacionCodigo'],
                    eboEstado:             o['eboEstado'],
                    bonCodigo:             o['bonCodigo'],
                    bonNombre:             o['bonNombre'],
                    bonDescripcion:        o['bonDescripcion'],
                    bonMonto:              o['bonMonto'],
                    bonPorcentaje:         o['bonPorcentaje'],
                    bonEstado:             o['bonEstado']
                });
            }

            dispatch(setBonusAssociated(employeeBonusAssociated));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findBonusNoAssociated = async (code: number) => {
        try {
            const { data } = await payrollApi.get(`${VITE_EMPLOYEE_BONUS}/bonificaciones-sin-asignar/${code}`);
            const employeeBonusNoAssociated: EmployeeBonusNoAssociated[] = [{
                bonCodigo: 0,
                bonNombre: 'Seleccione una bonificación',
                bonDescripcion: '',
                bonMonto: 0,
                bonPorcentaje: 0,
                bonEstado: 0
            }];
            for (const o of data) {
                employeeBonusNoAssociated.push({
                    bonCodigo:      o['bonCodigo'],
                    bonNombre:      o['bonNombre'],
                    bonDescripcion: o['bonDescripcion'],
                    bonMonto:       o['bonMonto'],
                    bonPorcentaje:  o['bonPorcentaje'],
                    bonEstado:      o['bonEstado'],

                });
            }

            dispatch(setBonusNoAssociated(employeeBonusNoAssociated));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const deleteAssociateBonus = async (employeeCode: number, code: number) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_EMPLOYEE_BONUS}/${code}`);
            await findById(employeeCode);
            await Utilities.successAlarm('Registro eliminado');
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveBonusAssociation = async (empCodigo: number, bonCodigo: number | null) => {
        try {
            const newData = {...employeeBonusValues, bonCodigo};
            dispatch(setEmployeeBonusData(newData));
            const bonusAssociation: BonusAssociation = {
                empCodigo,
                bonCodigo,
                eboEstado: 1
            };
            await payrollApi.post(`${VITE_EMPLOYEE_BONUS}`, bonusAssociation);
            await findById(empCodigo);
            await Utilities.successAlarm('Registro guardado');
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
        deleteAssociateBonus,
        saveBonusAssociation,
        cleanForm
    }

};
