import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import {absenceTypeValidationSchema} from "./validations/absenceTypeValidationSchema.ts";
import {useAbsenceTypeStore} from "../../../hooks";

export const AbsenceTypeForm = () => {


    const {
        tauCodigo,
        tauNombre = '',
        tauDescripcion = '',
        tauGoceSalario = 0,
        saveOrUpdate,
        cleanForm
    } = useAbsenceTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tauCodigo});
    }


    return (
        <FormLayout
            update={!!tauCodigo}
            onSubmit={onSubmit}
            initialValues={{tauNombre, tauDescripcion, tauGoceSalario}}
            validationSchema={absenceTypeValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'tauNombre'}/>
            <CustomInputText label={'Descripcion'} name={'tauDescripcion'}/>
            <CustomInputText label={'Goce de salario'} name={'tauGoceSalario'} type="text"/>
        </FormLayout>
    )
}
