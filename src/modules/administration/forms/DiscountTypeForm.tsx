import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useDiscountTypeStore } from "../../../hooks/useDiscountTypeStore.ts";
import { discountTypeValidationSchema } from "./validations/discountTypeValidationSchema.ts";

export const DiscountTypeForm = () => {


    const {
        tdsCodigo,
        tdsNombre = '',
        tdsDescripcion = '',
        tdsMonto = 0,
        tdsPorcentaje = 0,
        tdsEstado,
        discountTypeValues,
        saveOrUpdate,
        cleanForm
    } = useDiscountTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tdsEstado , tdsCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...discountTypeValues, tdsEstado: (tdsEstado === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!tdsCodigo}
            onSubmit={onSubmit}
            initialValues={{tdsNombre, tdsDescripcion, tdsMonto, tdsPorcentaje, tdsEstado}}
            validationSchema={discountTypeValidationSchema}
            onClean={onClean}
            useStatus={!!tdsCodigo}
            statusActive={tdsEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'tdsNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'tdsDescripcion'}  type="text"/>
            <CustomInputText label={'Monto'} name={'tdsMonto'}  type="number"/>
            <CustomInputText label={'Porcentaje'} name={'tdsPorcentaje'} type="number"/>
        </FormLayout>
    )
}
