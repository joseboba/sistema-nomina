import * as Yup from 'yup';


export const otherIncomeValidationSchema = Yup.object({
    epuCodigo: Yup
        .number()
        .moreThan(0, 'El empleado es requerido')
        .required('El empleado es requerido'),
    oinMonto: Yup
        .number()
        .moreThan(0, 'El monto debe ser un valor mayor a cero')
        .required('El monto es requerido'),
    oinFecha: Yup
        .date()
        .required('La fecha es requerida')
});