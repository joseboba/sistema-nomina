import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeByPositionInteface, AbsenceInterface, AbsenceTypesInterface} from "../interfaces";
import {
    clearDataAbsence,
    setAbsence,
    setPageResultAbsence,
    setParamsAbsence
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_ABSENCE} = getEnvVariables();

export const useAbsenceStore = () => {

    const [employeesByPosition, setEmployeesByPosition] = useState<EmployeeByPositionInteface[]>([]);
    const [absenceType, setAbsenceType] = useState<AbsenceTypesInterface[]>([]);
    const absenceValues = useSelector((state: StoreInterface) => state.absence);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
        getAllEmployees();
        getAllAbsenceType();
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsAbsence(params));
            const {data, headers} = await payrollApi.get(`${VITE_ABSENCE}`, {params});
            const response = parsePagination<AbsenceInterface>(headers);
            response.content = data;
            dispatch(setPageResultAbsence(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_ABSENCE}/${code}`);
            dispatch(setAbsence(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (absence: AbsenceInterface) => {
        try {
            absence.ausFechaSalida = absence.ausFechaSalida.format("DD/MM/YYYY");
            absence.ausFechaRegreso = absence.ausFechaRegreso.format("DD/MM/YYYY");
            const {search, page} =  absenceValues.params;
            if (absence.ausCodigo) {
                await payrollApi.put(`${VITE_ABSENCE}`, absence);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setAbsence(absence));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_ABSENCE}`, absence);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setAbsence(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = absenceValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_ABSENCE}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === absenceValues.ausCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearDataAbsence());
    }

    const getAllEmployees = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_ABSENCE}/empleados`);
            const defaultData: EmployeeByPositionInteface[] = [{epuCodigo: 0,
                    empPrimerNombre: 'Seleccione un empleado', empSegundoNombre: "", empPrimerApellido: "", empSegundoApellido: ""}];
            setEmployeesByPosition([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllAbsenceType = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_ABSENCE}/tiposAusencia`);
            const defaultData: AbsenceTypesInterface[] = [{tauCodigo: 0,
                    tauNombre: 'Seleccione un tipo de ausencia'}];
            setAbsenceType([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }
    return {
        ...absenceValues,
        absenceValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm,
        employeesByPosition,
        absenceType
    }
}
