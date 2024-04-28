import * as Yup from 'yup';

export const deductionTypeValidationSchema = Yup.object({
    tdeNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    tdeDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida'),
    tdeMonto: Yup
        .number()
        .min(0, 'El monto debe ser un valor mayor o igual a cero')
        .required('El monto es requerido'),
    tdePorcentaje: Yup
        .number()
        .min(0, 'El porcentaje debe ser un valor mayor o igual a cero ')
        .required('El porcentaje es requerido'),
    tdeEstado: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
        .required('El estado es requerido')
});
