import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import { CustomInputText, CustomDatePicker, CustomSelect } from "../../../components/form";
import {} from "../../../hooks";
import { useOtherIncomeStore } from "../../../hooks/useOtherIncomeStore.ts";
import { otherIncomeValidationSchema } from "./validations/otherIncomeValidationSchema.ts";
import moment from "moment";
import { MenuItem } from "@mui/material";
import { Utilities } from "../../../util/utilities.ts";

export const OtherIncomeForm = () => {


    const {
        oinCodigo,
        epuCodigo,
        oinMonto = 0,
        oinFecha = moment().toDate(),
        otherIncomeValues,
        saveOrUpdate,
        cleanForm,
        employeesByPosition
    } = useOtherIncomeStore();

    const onClean = () => {
        cleanForm();
    }

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, oinCodigo});
    }

    const onChangeStatus = async () => {
        await saveOrUpdate({...otherIncomeValues});
    }

    return (
        <FormLayout
            update={!!oinCodigo}
            onSubmit={onSubmit}
            initialValues={{oinCodigo, epuCodigo,oinMonto,oinFecha}}
            validationSchema={otherIncomeValidationSchema}
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
            <CustomInputText label={'Monto'} name={'oinMonto'}  type="number"/>
            <CustomDatePicker label={'Fecha que se recibe el ingreso'} name={'oinFecha'} ></CustomDatePicker>
        </FormLayout>
    )
}
