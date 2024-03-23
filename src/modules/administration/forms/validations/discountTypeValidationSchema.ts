import * as Yup from 'yup';

export const discountTypeValidationSchema = Yup.object({
    tdeDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 cáracteres máximo')
        .required('Descripción es requerida')
});
