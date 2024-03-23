import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText} from "../../../components/form";
import {discountTypeValidationSchema} from "./validations/discountTypeValidationSchema.ts";
import { useDiscountTypeStore } from "../../../hooks/useDiscountTypeStore.ts";

export const DiscountTypeForm = () => {


    const {
        tdeCodigo,
        tdeNombre = '',
        tdeDescripcion = '',
        tdeEstado = '',
        tdeMonto = '',
        tdePorcentaje = '',
        saveOrUpdate,
        cleanForm
    } = useDiscountTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tdeCodigo});
    }


    return (
        <FormLayout
            update={!!tdeCodigo}
            onSubmit={onSubmit}
            initialValues={{tdeNombre, tdeDescripcion, tdeMonto, tdePorcentaje}}
            validationSchema={discountTypeValidationSchema}
            onClean={onClean}
        >
            <CustomInputText label={'Nombre'} name={'tdeNombre'}/>
            <CustomInputText label={'Descripcion'} name={'tdeDescripcion'}/>
            <CustomInputText label={'Monto'} name={'tdeMonto'} />
            <CustomInputText label={'Porcentaje'} name={'tdePorcentaje'} />

        </FormLayout>
    )
}
