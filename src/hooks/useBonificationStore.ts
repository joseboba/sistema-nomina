import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {BonificationInterface} from "../interfaces";
import {cleanDataBonification, setBonification , setPageResultBonification, setParamsBonification} from "../store/modules/administration";
import Swal from 'sweetalert2';

const {VITE_BONIFICACION_URI} = getEnvVariables();

export const useBonificationStore = () => {

    const bonificationValues = useSelector((state: StoreInterface) => state.bonification);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParamsBonification(params));
            const {data, headers} = await payrollApi.get(`${VITE_BONIFICACION_URI}`, {params});
            const response = parsePagination<BonificationInterface>(headers);
            response.content = data;
            dispatch(setPageResultBonification(response));
        } catch (e) {
            console.log(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_BONIFICACION_URI}/${code}`);
            dispatch(setBonification(data));
        } catch (e) {
            console.log(e);
        }
    }

    const saveOrUpdate = async (bonification: BonificationInterface) => {
        try {
            const { search, page } = bonificationValues.params;
            if (bonification.bonCodigo) {
                await payrollApi.put(`${VITE_BONIFICACION_URI}`, bonification);
                await Swal.fire({
                    title: 'Registro actualizado',
                    icon: 'success'
                })
                await findAll(search, page);
                return;
            }

            const {data} = await payrollApi.post(`${VITE_BONIFICACION_URI}`, bonification);
            await Swal.fire({
                title: 'Registro guardado',
                icon: 'success'
            })
            await findAll(search, page);
            dispatch(setBonification(data));
        } catch (e) {
            console.log(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const { search, page } = bonificationValues.params;
            const result = await Swal.fire({
                title: '¿Desea eliminar el registro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#689f38',
                confirmButtonText: 'Confirmar',
                cancelButtonColor: "#FF0000FF",
                cancelButtonText: 'Cancelar',
            });
            if (result.isDismissed) {
                return;
            }
            await payrollApi.delete(`${VITE_BONIFICACION_URI}/${code}`);
            await Swal.fire({
                title: 'Registro eliminado',
                icon: 'success'
            });
            await findAll(search, page);
            cleanForm();
        } catch (e) {
            console.log(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanDataBonification());
    }


    return {
        ...bonificationValues,
        bonificationValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}