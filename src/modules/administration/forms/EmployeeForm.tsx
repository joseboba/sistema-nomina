import {FormikValues} from "formik";
import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText, CustomDatePicker, CustomSelect} from "../../../components/form";
import {employeeValidationSchema} from "./validations/employeeValidationSchema.ts";
import {useEmployeeStore} from "../../../hooks";
import {MenuItem} from "@mui/material";
import moment from "moment";

export const EmployeeForm = () => {

    const {
        empCodigo,
        empCUI = '',
        empNIT = '',
        empPrimerNombre = '',
        empSegundoNombre = '',
        empTercerNombre = '',
        empPrimerApellido = '',
        empSegundoApellido = '',
        empApellidoCasada = '',
        empFechaNacimiento = moment().toDate(),
        empProfesion = '',
        empTelefono = '',
        empCorreo = '',
        empCodigoIGSS = '',
        empEncargado,
        empFechaInicio = moment().toDate(),
        empNumeroCuenta = '',
        banCodigo,
        tcuCodigo,
        pueCodigo,
        tmoCodigo,
        epuSalario = 0,
        employeeValues,
        saveOrUpdate,
        cleanForm,
        employees,
        banks,
        accountTypes,
        positions,
        currencyTypes
    } = useEmployeeStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, empCodigo});
    }

    const onClean = () => {
        cleanForm();
    }

    return(
        <FormLayout
            update={!!empCodigo}
            initialValues={{empCUI, empNIT, empPrimerNombre, empSegundoNombre, empTercerNombre, empPrimerApellido, empSegundoApellido, empApellidoCasada, empFechaNacimiento, empProfesion, empTelefono, empCorreo, empCodigoIGSS, empEncargado, empFechaInicio, empNumeroCuenta, banCodigo, tcuCodigo, pueCodigo, tmoCodigo, epuSalario}}
            validationSchema={employeeValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
        >
            <CustomInputText label={'CUI'} name={'empCUI'} />
            <CustomInputText label={'NIT'} name={'empNIT'} />
            <CustomInputText label={'Primer Nombre'} name={'empPrimerNombre'} />
            <CustomInputText label={'Segundo Nombre'} name={'empSegundoNombre'} />
            <CustomInputText label={'Tercer Nombre'} name={'empTercerNombre'} />
            <CustomInputText label={'Primer Apellido'} name={'empPrimerApellido'} />
            <CustomInputText label={'Segundo Apellido'} name={'empSegundoApellido'} />
            <CustomInputText label={'Apellido Casada'} name={'empApellidoCasada'} />
            <CustomDatePicker label={'Fecha de nacimiento'} name={'empFechaNacimiento'} ></CustomDatePicker>
            <CustomInputText label={'Profesión'} name={'empProfesion'} />
            <CustomInputText label={'Teléfono'} name={'empTelefono'} />
            <CustomInputText label={'Correo'} name={'empCorreo'} />
            <CustomInputText label={'Código de IGSS'} name={'empCodigoIGSS'} />
            <CustomSelect label={'Encargado'} name={'empEncargado'}>
                {
                    employees.map(em => (
                        <MenuItem key={em.empCodigo} value={em.empCodigo}>
                            {em.empPrimerNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomDatePicker label={'Fecha de inicio'} name={'empFechaInicio'} ></CustomDatePicker>
            <CustomInputText label={'Número de cuenta'} name={'empNumeroCuenta'} />
            <CustomSelect label={'Banco'} name={'banCodigo'}>
                {
                    banks.map(b => (
                        <MenuItem key={b.banCodigo} value={b.banCodigo}>
                            {b.banNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomSelect label={'Tipo de cuenta'} name={'tcuCodigo'}>
                {
                    accountTypes.map(at => (
                        <MenuItem key={at.tcuCodigo} value={at.tcuCodigo}>
                            {at.tcuNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomSelect label={'Puesto'} name={'pueCodigo'}>
                {
                    positions.map(po => (
                        <MenuItem key={po.pueCodigo} value={po.pueCodigo}>
                            {po.pueNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomSelect label={'Tipo de moneda'} name={'tmoCodigo'}>
                {
                    currencyTypes.map(ct => (
                        <MenuItem key={ct.tmoCodigo} value={ct.tmoCodigo}>
                            {ct.tmoNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <CustomInputText label={'Salario'} name={'epuSalario'} />
        </FormLayout>
    )

}