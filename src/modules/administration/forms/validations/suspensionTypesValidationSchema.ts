import * as Yup from 'yup';

export const suspensionTypesValidationSchema = Yup.object({
    tsuNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    tsuDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida')
});