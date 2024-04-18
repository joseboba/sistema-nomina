import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import {discountTypeValidationSchema} from "./validations/discountTypeValidationSchema.ts";
import {useDiscountTypeStore} from "../../../hooks";

export const DiscountTypeForm = () => {


    const {
        tdsCodigo,
        tdsNombre = '',
        tdsDescripcion = '',
        tdsMonto = 0,
        tdsPorcentaje = 0,
        tdsEstado = 0,
        saveOrUpdate,
        cleanForm
    } = useDiscountTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tdsCodigo});
    }


    return (
        <FormLayout
            update={!!tdsCodigo}
            onSubmit={onSubmit}
            initialValues={{tdsNombre, tdsDescripcion, tdsMonto, tdsPorcentaje, tdsEstado}}
            validationSchema={discountTypeValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'tdsNombre'}/>
            <CustomInputText label={'Descripcion'} name={'tdsDescripcion'}/>
            <CustomInputText label={'Monto'} name={'tdsMonto'}  type="text"/>
            <CustomInputText label={'Porcentaje'} name={'tdsPorcentaje'} type="number"/>
            <CustomInputText label={'Estado'} name={'tdsEstado'} type="text"/>
        </FormLayout>
    )
}
