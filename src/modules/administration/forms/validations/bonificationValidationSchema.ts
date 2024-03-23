import * as Yup from 'yup';

export const bonificationValidationSchema = Yup.object({
    bonNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 cáracteres máximo')
        .required('Nombre es requerido'),
    bonDescripcion: Yup
        .string()
        .max(100, 'La descripción puede ser de 150 cáracteres máximo')
        .required('Descripción es requerida'),
    bonMonto: Yup
        .number()
        .min(0, 'El monto debe ser un valor mayor o igual a cero'),
    bonPorcentaje: Yup
        .number()
        .min(0, 'El porcentaje debe ser un valor mayor o igual a cero '),
    bonEstado: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
});
