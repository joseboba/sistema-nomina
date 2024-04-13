import {usePositionStore} from "../../../hooks";
import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText, CustomSelect} from "../../../components/form";
import {positionValidationSchema} from "./validations/positionValidationSchema.ts";
import {MenuItem} from "@mui/material";


export const PositionForm = () => {

    const {
        pueCodigo,
        depCodigo,
        pueNombre,
        pueDescripcion,
        pueEstado,
        positionValues,
        saveOrUpdate,
        cleanForm,
        departments
    } = usePositionStore();

    const onSubmit = async (values: FormikValues) => {
      await saveOrUpdate({...values, pueEstado, pueCodigo})
    };

    const onClean = () => {
        cleanForm();
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...positionValues, pueEstado: (pueEstado === 1) ? 0 : 1});
    }

    return (
        <FormLayout
            update={!!pueCodigo}
            initialValues={{pueNombre, pueDescripcion, depCodigo}}
            validationSchema={positionValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            useStatus={!!pueCodigo}
            statusActive={pueEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomInputText label={'Nombre'} name={'pueNombre'} />
            <CustomInputText label={'Descripcion'} name={'pueDescripcion'} />
            <CustomSelect label={'Departamento'} name={'depCodigo'}>
                {
                    departments.map(d => (
                        <MenuItem key={d.depCodigo} value={d.depCodigo}>
                            {d.depNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
        </FormLayout>
    )

}