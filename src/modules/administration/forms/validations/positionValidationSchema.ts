import * as Yup from 'yup';


export const positionValidationSchema = Yup.object({
    pueNombre: Yup
        .string()
        .max(100, 'El nombre puede ser de 100 cáracteres máximo')
        .required('Nombre es requerido'),
    pueDescripcion: Yup
        .string()
        .max(200, 'La descripción puede ser de 200 cáracteres máximo')
        .required('Descripción es requerida'),
    depCodigo: Yup
        .number()
        .moreThan(0, 'Departamento es requerido')
        .required('Departamento es requerido')
});