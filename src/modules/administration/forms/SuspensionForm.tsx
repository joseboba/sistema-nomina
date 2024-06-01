import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText, CustomDatePicker, CustomSelect } from "../../../components/form";
import {} from "../../../hooks";
import { useSuspensionStore } from "../../../hooks/useSuspensionStore.ts";
import { suspensionValidationSchema } from "./validations/suspensionValidationSchema.ts";
import moment from "moment";
import { MenuItem } from "@mui/material";
import { Utilities } from "../../../util/utilities.ts";

export const SuspensionForm = () => {


    const {
        susCodigo,
        epuCodigo,
        tsuCodigo,
        susFechaSalida = moment().toDate(),
        susFechaRegreso = moment().toDate(),
        susEstado,
        suspensionValues,
        saveOrUpdate,
        cleanForm,
        employeesByPosition,
        suspensionType
    } = useSuspensionStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, susCodigo, susEstado});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...suspensionValues, susEstado: (susEstado === 1) ? 0 : 1 });
    }

    return (
        <FormLayout
            update={!!susCodigo}
            onSubmit={onSubmit}
            initialValues={{susCodigo, epuCodigo, tsuCodigo, susFechaSalida, susFechaRegreso, susEstado}}
            validationSchema={suspensionValidationSchema}
            onClean={onClean}
            useStatus={!!susCodigo}
            statusActive={susEstado === 1}
            onChangeStatus={onChangeStatus}
        >
            <CustomSelect label={'Empleado'} name={'epuCodigo'}>
                {
                    employeesByPosition.map(employee => (
                        <MenuItem key={employee.epuCodigo} value={employee.epuCodigo}>
                            {`${employee.empCodigo ? employee.empCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(employee.empPrimerNombre!)} 
                             ${Utilities.capitalizeFirstLetter(employee.empPrimerApellido!)}`}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomSelect label={'Tipo de Suspension'} name={'tsuCodigo'}>
                {
                    suspensionType.map(suspension => (
                        <MenuItem key={suspension.tsuCodigo} value={suspension.tsuCodigo}>
                            {`${suspension.tsuCodigo ? suspension.tsuCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(suspension.tsuNombre!)} `}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            

            <CustomDatePicker label={'Fecha de inicio de suspension'} name={'susFechaSalida'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha de fin de suspension'} name={'susFechaRegreso'} ></CustomDatePicker>
        </FormLayout>
    )
}
