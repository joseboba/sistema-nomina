import * as Yup from 'yup';

export const absenceTypeValidationSchema = Yup.object({
    tauNombre: Yup
        .string()
        .max(30, 'El nombre puede ser de 30 cáracteres máximo')
        .required('Nombre es requerido'),
    tauDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida'),
    tauGoceSalario: Yup
        .string()
        .length(1,'El estado solo puede tener un valor de A o N')
        .required('El estado es requerido')
});
