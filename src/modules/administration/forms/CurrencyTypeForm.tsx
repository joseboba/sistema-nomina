import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useCurrencyTypeStore } from "../../../hooks/useCurrencyTypeStore.ts";
import { currencyTypeValidationSchema } from "./validations/currencyTypeValidationSchema.ts";

export const CurrencyTypeForm = () => {


    const {
        tmoCodigo,
        tmoNombre = '',
        tmoSimbolo = '',
        tmoTasaCambio = 0,
        tmoEstado,
        currencyTypeValues,
        saveOrUpdate,
        cleanForm
    } = useCurrencyTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tmoEstado , tmoCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...currencyTypeValues, tmoEstado: (tmoEstado === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!tmoCodigo}
            onSubmit={onSubmit}
            initialValues={{tmoNombre, tmoSimbolo, tmoTasaCambio, tmoEstado}}
            validationSchema={currencyTypeValidationSchema}
            onClean={onClean}
            useStatus={!!tmoCodigo}
            statusActive={tmoEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'tmoNombre'} type="text"/>
            <CustomInputText label={'Simobolo'} name={'tmoSimbolo'}  type="text"/>
            <CustomInputText label={'Tasa de cambio'} name={'tmoTasaCambio'}  type="number"/>
        </FormLayout>
    )
}
