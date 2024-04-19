import * as Yup from 'yup';


export const periodValidationSchema = Yup.object({
    perNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    perFechaInicio: Yup
        .date()
        .required('La fecha de inicio es requerida'),
    perFechaFinal: Yup
        .date()
        .required('La fecha final es requerida'),
    perFechaPago: Yup
        .date()
        .required('La fecha de pago es requerida')
});