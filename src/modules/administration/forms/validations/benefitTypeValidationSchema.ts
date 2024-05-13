import * as Yup from 'yup';

export const benefitTypeValidationSchema = Yup.object({
    tprNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
});
