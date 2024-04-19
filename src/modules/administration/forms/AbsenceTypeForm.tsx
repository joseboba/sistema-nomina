import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useAbsenceTypeStore } from "../../../hooks/useAbsenceTypeStore.ts";
import { absenceTypeValidationSchema } from "./validations/absenceTypeValidationSchema.ts";

export const AbsenceTypeForm = () => {


    const {
        tauCodigo,
        tauNombre = '',
        tauDescripcion = '',
        tauGoceSalario,
        absenceTypeValues,
        saveOrUpdate,
        cleanForm
    } = useAbsenceTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tauGoceSalario , tauCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...absenceTypeValues, tauGoceSalario: (tauGoceSalario === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!tauCodigo}
            onSubmit={onSubmit}
            initialValues={{tauNombre, tauDescripcion, tauGoceSalario}}
            validationSchema={absenceTypeValidationSchema}
            onClean={onClean}
            useStatus={!!tauCodigo}
            statusActive={tauGoceSalario === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'tauNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'tauDescripcion'}  type="text"/>
        </FormLayout>
    )
}
