import * as Yup from 'yup';


export const absenceValidationSchema = Yup.object({
    epuCodigo: Yup
        .number()
        .moreThan(0, 'El empleado es requerido')
        .required('El empleado es requerido'),
    ausFechaSalida: Yup
        .date()
        .required('La fecha de salida es requerida'),
    ausFechaRegreso: Yup
        .date()
        .required('La fecha de retorno es requerida')
});