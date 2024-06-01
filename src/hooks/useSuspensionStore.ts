import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect, useState} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {EmployeeByPositionInteface, SuspensionInterface, SuspensionTypesInterface} from "../interfaces";
import {
    clearDataSuspension,
    setSuspension,
    setPageResultSuspension,
    setParamsSuspension
} from "../store/modules/administration";
import {Utilities} from "../util";

const {VITE_SUSPENSION} = getEnvVariables();

export const useSuspensionStore = () => {

    const [employeesByPosition, setEmployeesByPosition] = useState<EmployeeByPositionInteface[]>([]);
    const [suspensionType, setSuspensionType] = useState<SuspensionTypesInterface[]>([]);
   

    const suspensionValues = useSelector((state: StoreInterface) => state.suspension);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
        getAllEmployees();
        
        getAllSuspensionType();
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsSuspension(params));
            const {data, headers} = await payrollApi.get(`${VITE_SUSPENSION}`, {params});
            const response = parsePagination<SuspensionInterface>(headers);
            response.content = data;
            dispatch(setPageResultSuspension(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_SUSPENSION}/${code}`);
            dispatch(setSuspension(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (suspension: SuspensionInterface) => {
        try {
            suspension.susFechaSalida = suspension.susFechaSalida.format("DD/MM/YYYY");
            suspension.susFechaRegreso = suspension.susFechaRegreso.format("DD/MM/YYYY");
            const {search, page} =  suspensionValues.params;
            if (suspension.susCodigo) {
                await payrollApi.put(`${VITE_SUSPENSION}`, suspension);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setSuspension(suspension));
                return;
            }

            const {data} = await payrollApi.post(`${VITE_SUSPENSION}`, suspension);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setSuspension(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = suspensionValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_SUSPENSION}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === suspensionValues.susCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(clearDataSuspension());
    }

    const getAllEmployees = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_SUSPENSION}/empleados`);
            const defaultData: EmployeeByPositionInteface[] = [{epuCodigo: 0,
                    empPrimerNombre: 'Seleccione un empleado', empSegundoNombre: "", empPrimerApellido: "", empSegundoApellido: ""}];
            setEmployeesByPosition([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const getAllSuspensionType = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_SUSPENSION}/tiposSuspension`);
            const defaultData: SuspensionTypesInterface[] = [{
                tsuCodigo: 0,
                tsuNombre: 'Seleccione un tipo de Suspension'
            }];
            setSuspensionType([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }



    return {
        ...suspensionValues,
        suspensionValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm,
        employeesByPosition,
        suspensionType
    }
}
