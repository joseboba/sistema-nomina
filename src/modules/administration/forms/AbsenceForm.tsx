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
        epuCodigo,
        ausFechaSalida = moment().toDate(),
        ausFechaRegreso = moment().toDate(),
        absenceValues,
        saveOrUpdate,
        cleanForm,
        employeesByPosition,
        absenceType

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
            initialValues={{ ausCodigo, tauCodigo, epuCodigo, ausFechaSalida, ausFechaRegreso }}
            validationSchema={absenceValidationSchema}
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
            <CustomSelect label={'Tipo Ausencia'} name={'tauCodigo'}>
                {
                    absenceType.map(absencetype => (
                        <MenuItem key={absencetype.tauCodigo} value={absencetype.tauCodigo}>
                            {`${absencetype.tauCodigo ? absencetype.tauCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(absencetype.tauNombre!)} `}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomDatePicker label={'Fecha de salida'} name={'ausFechaSalida'} ></CustomDatePicker>
            <CustomDatePicker label={'Fecha de retorno'} name={'ausFechaRegreso'} ></CustomDatePicker>
        </FormLayout>
    )
}
