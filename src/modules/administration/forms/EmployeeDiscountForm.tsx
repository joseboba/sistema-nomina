import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText, CustomSelect} from "../../../components/form";
import {
    IconButton,
    MenuItem,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useEmployeeDiscountStore} from "../../../hooks";
import {FormikValues} from "formik";
import {employeeBonusValidationSchema} from "./validations/employeeDiscountValidationSchema.ts";

const tableHeaders = ['Deducción', 'Valor', 'Porcentaje', 'Eliminar'];

const StyledTableCell = styled(TableCell)((_) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#001b40',
        color: '#f1f1f1',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const EmployeeDiscountForm = () => {

    const {
        empCodigo,
        empPrimerNombre = '',
        empSegundoNombre = '',
        discountAssociated,
        discountNoAssociated,
        tdeCodigo,
        saveDiscountAssociation,
        deleteAssociateDiscount,
        cleanForm
    } = useEmployeeDiscountStore();

    const onSubmit = async ({empCodigo, tdeCodigo}: FormikValues) => {
        await saveDiscountAssociation(empCodigo, tdeCodigo);
    };

    const onClean = () => {
        cleanForm();
    }

    return (
        <FormLayout
            update={true}
            initialValues={{
                empCodigo,
                empPrimerNombre,
                empSegundoNombre,
                tdeCodigo
            }}
            onSubmit={onSubmit}
            onClean={onClean}
            validationSchema={employeeBonusValidationSchema}
        >
            <CustomInputText label={'Primer Nombre'} name={'empPrimerNombre'} disabled/>
            <CustomInputText label={'Segundo Nombre'} name={'empSegundoNombre'} disabled/>
            <CustomSelect label={'Deduccion'} name={'tdeCodigo'} xs={12}>
                {
                    discountNoAssociated.map((discount) => (
                        <MenuItem key={discount.tdeCodigo} value={discount.tdeCodigo}>
                            {discount.tdeNombre}
                        </MenuItem>
                    ))
                }
            </CustomSelect>
            <TableContainer component={Paper} className={'table'}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeaders.map((header) => (
                                    <StyledTableCell align={'center'}> {header} </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            discountAssociated.map((row) => (
                                <TableRow key={row.tdeCodigo}>
                                    <TableCell align={'center'}> {row.tdeNombre} </TableCell>
                                    <TableCell
                                        align={'center'}> {row.tdeMonto ? row.tdeMonto : row.tdePorcentaje} </TableCell>
                                    <TableCell align={'center'}> {row.tdePorcentaje ? 'Si' : 'No'} </TableCell>
                                    <TableCell align={'center'}>
                                        <IconButton
                                            type={'button'}
                                            onClick={() => deleteAssociateDiscount(empCodigo, row.demCodigo)}
                                        >
                                            <Delete style={{color: 'red'}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </FormLayout>
    );
};
