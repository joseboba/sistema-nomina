import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {useEffect} from "react";
import {getEnvVariables, parsePagination} from "../helpers";
import {payrollApi} from "../api";
import {BenefitTypeInterface} from "../interfaces";
import {
    cleanBenefitTypeData,
    setBenefitType,
    setBenefitTypePageResult,
    setBenefitTypeParams
} from "../store/modules/administration";
import {Utilities} from "../util";

const { VITE_TIPO_PRESTACION_URI } = getEnvVariables();

export const useBenefitTypeStore = () => {

    const benefitTypeValues = useSelector((state: StoreInterface) => state.benefitType);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('first entry');
        findAll('', 0);
    }, []);


    const findAll = async (search: string, page: number) => {
        try {
            const params = {search, page, size: 10};
            dispatch(setBenefitTypeParams(params));
            const { data, headers } = await payrollApi.get(`${VITE_TIPO_PRESTACION_URI}`, {params});
            const response = parsePagination<BenefitTypeInterface>(headers);
            response.content = data;
            dispatch(setBenefitTypePageResult(response));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const findById = async (code: number) => {
        try {
            const { data } = await payrollApi.get(`${VITE_TIPO_PRESTACION_URI}/${code}`);
            dispatch(setBenefitType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (benefitType: BenefitTypeInterface) => {
        try {
            const {search, page} = benefitTypeValues.params;
            if (benefitType.tprCodigo) {
                await payrollApi.put(`${VITE_TIPO_PRESTACION_URI}`, benefitType);
                await Utilities.successAlarm('Registro actualizado');
                await findAll(search, page);
                dispatch(setBenefitType(benefitType));
                return;
            }

            const { data } = await payrollApi.post(`${VITE_TIPO_PRESTACION_URI}`, benefitType);
            await Utilities.successAlarm('Registro guardado');
            await findAll(search, page);
            dispatch(setBenefitType(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
            const {search, page} = benefitTypeValues.params;
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await payrollApi.delete(`${VITE_TIPO_PRESTACION_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll(search, page);
            if (code === benefitTypeValues.tprCodigo) {
                cleanForm();
            }
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanBenefitTypeData());
    }


    return {
        ...benefitTypeValues,
        benefitTypeValues,
        findAll,
        findById,
        saveOrUpdate,
        remove,
        cleanForm
    }
}
