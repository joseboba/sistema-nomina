import * as Yup from 'yup';


export const suspensionValidationSchema = Yup.object({
    epuCodigo: Yup
        .number()
        .moreThan(0, 'El empleado es requerido')
        .required('El empleado es requerido'),
    susFechaSalida: Yup
        .date()
        .required('La fecha de salida es requerida'),
    susFechaRegreso: Yup
        .date()
        .required('La fecha de retorno es requerida')
});