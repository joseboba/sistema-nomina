import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText} from "../../../components/form";
import {} from "../../../hooks";
import { useDeductionTypeStore } from "../../../hooks/useDeductionTypeStore.ts";
import { deductionTypeValidationSchema } from "./validations/deductionTypeValidationSchema.ts";

export const DeductionTypeForm = () => {


    const {
        tdeCodigo,
        tdeNombre = '',
        tdeDescripcion = '',
        tdeMonto = 0,
        tdePorcentaje= 0,
        tdeEstado,
        deductionTypeValues,
        saveOrUpdate,
        cleanForm
    } = useDeductionTypeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, tdeEstado , tdeCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...deductionTypeValues, tdeEstado: (tdeEstado === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!tdeCodigo}
            onSubmit={onSubmit}
            initialValues={{tdeNombre, tdeDescripcion,tdeMonto,tdePorcentaje,tdeEstado}}
            validationSchema={deductionTypeValidationSchema}
            onClean={onClean}
            useStatus={!!tdeCodigo}
            statusActive={tdeEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'tdeNombre'} type="text"/>
            <CustomInputText label={'Descripcion'} name={'tdeDescripcion'}  type="text"/>
            <CustomInputText label={'Monto'} name={'tdeMonto'}  type="number"/>
            <CustomInputText label={'Porcentaje'} name={'tdePorcentaje'} type="number"/>
        </FormLayout>
    )
}
