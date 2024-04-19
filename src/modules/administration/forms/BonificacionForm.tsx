import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useBonificationStore } from "../../../hooks/useBonificationStore.ts";
import { bonificationValidationSchema } from "./validations/bonificationValidationSchema.ts";

export const BonificationForm = () => {


    const {
        bonCodigo,
        bonNombre = '',
        bonDescripcion = '',
        bonMonto = 0,
        bonPorcentaje= 0,
        bonEstado,
        bonificationValues,
        saveOrUpdate,
        cleanForm
    } = useBonificationStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, bonEstado , bonCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...bonificationValues, bonEstado: (bonEstado === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!bonCodigo}
            onSubmit={onSubmit}
            initialValues={{bonNombre, bonDescripcion,bonMonto,bonPorcentaje,bonEstado}}
            validationSchema={bonificationValidationSchema}
            onClean={onClean}
            useStatus={!!bonCodigo}
            statusActive={bonEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'bonNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'bonDescripcion'}  type="text"/>
            <CustomInputText label={'Monto'} name={'bonMonto'}  type="number"/>
            <CustomInputText label={'Porcentaje'} name={'bonPorcentaje'} type="number"/>
        </FormLayout>
    )
}
