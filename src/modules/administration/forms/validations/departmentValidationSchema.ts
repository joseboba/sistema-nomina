import * as Yup from 'yup';

export const departmentValidationSchema = Yup.object({
    depNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 cáracteres máximo')
        .required('Nombre es requerido'),
    depDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 cáracteres máximo')
        .required('Descripción es requerida')
});
