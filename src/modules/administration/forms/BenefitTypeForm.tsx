import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import { benefitTypeValidationSchema } from "./validations/benefitTypeValidationSchema.ts";
import {useBenefitTypeStore} from "../../../hooks";

export const BenefitTypeForm = () => {


    const {
        tprCodigo,
        tprNombre = '',
        saveOrUpdate,
        cleanForm
    } = useBenefitTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tprCodigo});
    }


    return (
        <FormLayout
            update={!!tprCodigo}
            onSubmit={onSubmit}
            initialValues={{tprNombre}}
            validationSchema={benefitTypeValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'tprNombre'}/>
        </FormLayout>
    )
}
