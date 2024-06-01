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
        tdsCodigo,
        tsuCodigo,
        susFechaSalida = moment().toDate(),
        susFechaRegreso = moment().toDate(),
        susMotivo = "",
        suspensionValues,
        saveOrUpdate,
        cleanForm,
        employeesByPosition,
        suspensionType,
        deductionType
    } = useSuspensionStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, susCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...suspensionValues});
    }

    return (
        <FormLayout
            update={!!susCodigo}
            onSubmit={onSubmit}
            initialValues={{susCodigo, epuCodigo, tdsCodigo, tsuCodigo, susFechaSalida, susFechaRegreso, susMotivo}}
            validationSchema={suspensionValidationSchema}
            onClean={onClean}
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
            <CustomSelect label={'Tipo de deduccion'} name={'tdsCodigo'}>
                {
                    deductionType.map(deduction => (
                        <MenuItem key={deduction.tdsCodigo} value={deduction.tdsCodigo}>
                            {`${deduction.tdsCodigo ? deduction.tdsCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(deduction.tdsNombre!)} `}
                        </MenuItem>
                    ))
                }
            </CustomSelect>

            <CustomDatePicker label={'Fecha de inicio de suspension'} name={'susFechaSalida'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha de fin de suspension'} name={'susFechaRegreso'} ></CustomDatePicker>
            <CustomInputText label={'Motivo'} name={'susMotivo'} type="text" />
        </FormLayout>
    )
}
