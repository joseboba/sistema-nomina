import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object({
    empCUI: Yup
        .string()
        .max(13, 'El CUI puede ser de 13 carácteres máximo')
        .required('CUI es requerido'),
    empNIT: Yup
        .string()
        .max(9, 'El NIT puede ser de 9 carácteres máximo')
        .required('NIT es requerido'),
    empPrimerNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 carácteres máximo')
        .required('Primer nombre es requerido'),
    empSegundoNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 carácteres máximo'),
    empTercerNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 carácteres máximo'),
    empPrimerApellido: Yup
        .string()
        .max(30, 'El apellido puede ser de 30 carácteres máximo')
        .required('Primer apellido es requerido'),
    empSegundoApellido: Yup
        .string()
        .max(30, 'El apellido puede ser de 30 carácteres máximo')
        .required('Segundo apellido es requerido'),
    empApellidoCasada: Yup
        .string()
        .max(30, 'El apellido puede ser de 30 carácteres máximo'),
    empFechaNacimiento: Yup
        .date()
        .required('Fecha de nacimiento requerida'),
    empProfesion: Yup
        .string()
        .max(30, 'La profesion puede ser de 30 carácteres máximo')
        .required('Profesion es requerida'),
    empTelefono: Yup
        .string()
        .max(8, 'El telefono puede ser de 8 carácteres máximo')
        .required('Telefono es requerido'),
    empCorreo: Yup
        .string()
        .max(30, 'El correo puede ser de 30 carácteres máximo')
        .required('Correo es requerido'),
    empCodigoIGSS: Yup
        .string()
        .max(13, 'El codigo de IGSS puede ser de 13 carácteres máximo')
        .required('Codigo de IGSS es requerido'),
    empFechaInicio: Yup
        .date()
        .required('Fecha inicio es requerida'),
    empNumeroCuenta: Yup
        .string()
        .max(15, 'El número de cuenta puede ser de 15 carácteres máximo')
        .required('Número de cuenta es requerido'),
    banCodigo: Yup
        .number()
        .moreThan(0, 'Banco es requerido')
        .required('Banco es requerido'),
    tcuCodigo: Yup
        .number()
        .moreThan(0, 'Tipo de cuenta es requerida')
        .required('Tipo de cuenta es requerida'),
    pueCodigo: Yup
        .number()
        .moreThan(0, 'Puesto es requerido')
        .required('Puesto es requerido'),
    tmoCodigo: Yup
        .number()
        .moreThan(0, 'Tipo de moneda es requerida')
        .required('Tipo de moneda es requerida'),
    epuSalario: Yup
        .number()
        .min(1, 'El salario debe ser un valor mayor o igual a 1')
        .required('Salario es requerido')
});