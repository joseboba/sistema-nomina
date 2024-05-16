import * as Yup from "yup";

export const employeeBonusValidationSchema = Yup.object({
    tdeCodigo: Yup
        .number()
        .moreThan(0, 'Deducción es requerida')
        .required('Deducción es requerida')
});
