import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
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
        bonEstado= 'A',
        saveOrUpdate,
        cleanForm
    } = useBonificationStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        saveOrUpdate({...values, bonCodigo});
    }


    return (
        <FormLayout
            update={bonCodigo}
            onSubmit={onSubmit}
            initialValues={{bonNombre, bonDescripcion,bonMonto,bonPorcentaje,bonEstado}}
            validationSchema={bonificationValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'bonNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'bonDescripcion'}  type="text"/>
            <CustomInputText label={'Monto'} name={'bonMonto'}  type="text"/>
            <CustomInputText label={'Porcentaje'} name={'bonPorcentaje'} type="number"/>
            <CustomInputText label={'Estado'} name={'bonEstado'} type="text"/>
        </FormLayout>
    )
}
