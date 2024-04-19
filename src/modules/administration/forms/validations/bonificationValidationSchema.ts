import * as Yup from 'yup';

export const bonificationValidationSchema = Yup.object({
    bonNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    bonDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida'),
    bonMonto: Yup
        .number()
        .min(0, 'El monto debe ser un valor mayor o igual a cero')
        .required('El monto es requerido'),
    bonPorcentaje: Yup
        .number()
        .min(0, 'El porcentaje debe ser un valor mayor o igual a cero ')
        .required('El porcentaje es requerido'),
    bonEstado: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
        .required('El estado es requerido')
});
