import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useSuspensionTypesStore } from "../../../hooks/useSuspensionTypesStore.ts";
import { suspensionTypesValidationSchema } from "./validations/suspensionTypesValidationSchema.ts";

export const SuspensionTypesForm = () => {


    const {
        tsuCodigo,
        tsuNombre = '',
        tsuDescripcion = '',
        saveOrUpdate,
        cleanForm
    } = useSuspensionTypesStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
       await saveOrUpdate({...values, tsuCodigo});
    }


    return (
        <FormLayout
            update={tsuCodigo}
            onSubmit={onSubmit}
            initialValues={{tsuNombre, tsuDescripcion}}
            validationSchema={suspensionTypesValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'tsuNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'tsuDescripcion'}  type="text"/>
        </FormLayout>
    )
}
