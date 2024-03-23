import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {DiscountTypeInterface} from "../interfaces";
import {cleanData, setPageResult, setParams,  setDiscountType } from "../store/modules/administration/discountTypeSlice";
import Swal from 'sweetalert2';

const {VITE_DISCOUNT_TYPE_URI} = getEnvVariables();

export const useDiscountTypeStore = () => {

    const discountTypeValues = useSelector((state: StoreInterface) => state.discountType);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setParams(params));
            const {data, headers} = await payrollApi.get(`${VITE_DISCOUNT_TYPE_URI}`, {params});
            const response = parsePagination<DiscountTypeInterface>(headers);
            response.content = data;
            dispatch(setPageResult(response));
        } catch (e) {
            console.log(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const {data} = await payrollApi.get(`${VITE_DISCOUNT_TYPE_URI}/${code}`);
            dispatch(setDiscountType(data));
        } catch (e) {
            console.log(e);
        }
    }

    const saveOrUpdate = async (discountType: DiscountTypeInterface) => {
        discountType.tdeEstado = false;
        try {
            const { search, page } = discountTypeValues.params;
            if (discountType.tdeCodigo) {
                await payrollApi.put(`${VITE_DISCOUNT_TYPE_URI}`, discountType);
                await Swal.fire({
                    title: 'Registro actualizado',
                    icon: 'success'
                })
                await findAll(search, page);
                return;
            }

            const {data} = await payrollApi.post(`${VITE_DISCOUNT_TYPE_URI}`, discountType);
            await Swal.fire({
                title: 'Registro guardado',
                icon: 'success'
            })
            await findAll(search, page);
            dispatch(setDiscountType(data));
        } catch (e) {
            console.log(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const { search, page } = discountTypeValues.params;
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
            await payrollApi.delete(`${VITE_DISCOUNT_TYPE_URI}/${code}`);
            await Swal.fire({
                title: 'Registro eliminado',
                icon: 'success'
            });
            await findAll(search, page);
        } catch (e) {
            console.log(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanData());
    }


    return {
        ...discountTypeValues,
        discountTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}