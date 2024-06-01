import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText, CustomDatePicker, CustomSelect } from "../../../components/form";
import {} from "../../../hooks";
import { useAbsenceStore } from "../../../hooks/useAbsenceStore.ts";
import { absenceValidationSchema } from "./validations/absenceValidationSchema.ts";
import moment from "moment";
import { MenuItem } from "@mui/material";
import { Utilities } from "../../../util/utilities.ts";

export const AbsenceForm = () => {


    const {
        ausCodigo,
        tauCodigo,
        tdsCodigo,
        epuCodigo,
        ausFechaSalida = moment().toDate(),
        ausFechaRegreso = moment().toDate(),
        absenceValues,
        saveOrUpdate,
        cleanForm,
        employeesByPosition,
        absenceType,
        deductionType
    } = useAbsenceStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, ausCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...absenceValues});
    }

    return (
        <FormLayout
            update={!!ausCodigo}
            onSubmit={onSubmit}
            initialValues={{ ausCodigo, tauCodigo, tdsCodigo, epuCodigo, ausFechaSalida, ausFechaRegreso }}
            validationSchema={absenceValidationSchema}
            onClean={onClean}
            useStatus={!!ausCodigo}
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
            <CustomSelect label={'Tipo Ausencia'} name={'tauCodigo'}>
                {
                    absenceType.map(absencetype => (
                        <MenuItem key={absencetype.tauCodigo} value={absencetype.tauCodigo}>
                            {`${absencetype.tauCodigo ? absencetype.tauCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(absencetype.tauNombre!)} `}
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
            <CustomDatePicker label={'Fecha de salida'} name={'ausFechaSalida'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha de retorno'} name={'ausFechaRegreso'} ></CustomDatePicker>
        </FormLayout>
    )
}
