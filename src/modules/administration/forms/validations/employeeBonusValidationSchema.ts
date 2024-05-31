import * as Yup from "yup";

export const employeeBonusValidationSchema = Yup.object({
    bonCodigo: Yup
        .number()
        .moreThan(0, 'Bonificación es requerida')
        .required('Bonificación es requerida')
});
