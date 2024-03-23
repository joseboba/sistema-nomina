import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import {departmentValidationSchema} from "./validations/departmentValidationSchema.ts";
import {useDepartmentStore} from "../../../hooks";

export const DepartmentForm = () => {


    const {
        depCodigo,
        depNombre = '',
        depDescripcion = '',
        saveOrUpdate,
        cleanForm
    } = useDepartmentStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, depCodigo});
    }


    return (
        <FormLayout
            update={!!depCodigo}
            onSubmit={onSubmit}
            initialValues={{depNombre, depDescripcion}}
            validationSchema={departmentValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'depNombre'}/>
            <CustomInputText label={'Descripcion'} name={'depDescripcion'}/>
        </FormLayout>
    )
}
