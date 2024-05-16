import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText, CustomSelect} from "../../../components/form";
import {
    IconButton, MenuItem,
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
import {useEmployeeBonusStore} from "../../../hooks";
import {FormikValues} from "formik";
import {employeeBonusValidationSchema} from "./validations/employeeBonusValidationSchema.ts";

const tableHeaders = ['Bonificación', 'Valor', 'Porcentaje', 'Eliminar'];

const StyledTableCell = styled(TableCell)((_) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#001b40',
        color: '#f1f1f1',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const EmployeeBonusForm = () => {

    const {
        empCodigo,
        empPrimerNombre = '',
        empSegundoNombre = '',
        bonCodigo,
        bonusNoAssociated,
        bonusAssociated,
        saveBonusAssociation,
        deleteAssociateBonus,
        cleanForm
    } = useEmployeeBonusStore();

    const onSubmit = async ({empCodigo, bonCodigo}: FormikValues) => {
        await saveBonusAssociation(empCodigo, bonCodigo);
    };

    const onClean = () => {
        cleanForm();
    }

    return (
        <FormLayout
            update={empPrimerNombre !== ''}
            initialValues={{
                empCodigo,
                empPrimerNombre,
                empSegundoNombre,
                bonCodigo
            }}
            onSubmit={onSubmit}
            onClean={onClean}
            validationSchema={employeeBonusValidationSchema}
        >
            <CustomInputText label={'Primer Nombre'} name={'empPrimerNombre'} disabled />
            <CustomInputText label={'Segundo Nombre'} name={'empSegundoNombre'} disabled />
            <CustomSelect label={'Bonificación'} name={'bonCodigo'} xs={12}>
                    {
                        bonusNoAssociated.map((bonus) => (
                            <MenuItem key={bonus.bonCodigo} value={bonus.bonCodigo}>
                                { bonus.bonNombre }
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
                                    <StyledTableCell align={'center'} key={header}> { header } </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bonusAssociated.map((row) => (
                                <TableRow key={row.empBonificacionCodigo}>
                                    <TableCell align={'center'}> { row.bonNombre } </TableCell>
                                    <TableCell align={'center'}> { row.bonMonto ? row.bonMonto : row.bonPorcentaje } </TableCell>
                                    <TableCell align={'center'}> { row.bonPorcentaje ? 'Si' : 'No' } </TableCell>
                                    <TableCell align={'center'}>
                                        <IconButton
                                            type={'button'}
                                            onClick={() => deleteAssociateBonus(empCodigo, row.empBonificacionCodigo)}
                                        >
                                            <Delete style={{ color: 'red' }} />
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
