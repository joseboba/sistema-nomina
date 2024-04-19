import * as Yup from 'yup';

export const currencyTypeValidationSchema = Yup.object({
    tmoNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    tmoSimbolo: Yup
        .string()
        .max(3, 'El simbolo puede ser de 3 cáracteres máximo')
        .required('Simbolo es requerido'),
    tmoTasaCambio: Yup
        .number()
        .min(0, 'La tasa de cambio debe ser un valor mayor o igual a cero')
        .required('La tasa de cambio es requerida'),
    tmoEstado: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
        .required('El estado es requerido')
});
