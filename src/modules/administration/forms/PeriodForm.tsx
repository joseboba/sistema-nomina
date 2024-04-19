import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText, CustomDatePicker } from "../../../components/form";
import {} from "../../../hooks";
import { usePeriodStore } from "../../../hooks/index.ts";
import { periodValidationSchema } from "./validations/periodValidationSchema.ts";
import moment from "moment";

export const PeriodForm = () => {


    const {
        perCodigo,
        perNombre = '',
        perFechaInicio = moment().toDate(),
        perFechaFinal = moment().toDate(),
        perFechaPago = moment().toDate(),
        periodValues,
        saveOrUpdate,
        cleanForm
    } = usePeriodStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values , perCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...periodValues});
    }

    return (
        <FormLayout
            update={!!perCodigo}
            onSubmit={onSubmit}
            initialValues={{perNombre, perFechaInicio, perFechaFinal, perFechaPago}}
            validationSchema={periodValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'perNombre'} type="text"/>
            <CustomDatePicker label={'Fecha de inicio'} name={'perFechaInicio'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha fin'} name={'perFechaFinal'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha de pago'} name={'perFechaPago'} ></CustomDatePicker>
        </FormLayout>
    )
}
