import * as Yup from 'yup';

export const discountTypeValidationSchema = Yup.object({
    tdsNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    tdsDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida'),
    tdsMonto: Yup
        .number()
        .min(0, 'El monto debe ser un valor mayor o igual a cero')
        .required('El monto es requerido'),
    tdsPorcentaje: Yup
        .number()
        .min(0, 'El porcentaje debe ser un valor mayor o igual a cero ')
        .required('El porcentaje es requerido'),
    tdsEstado: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
        .required('El estado es requerido')
});
