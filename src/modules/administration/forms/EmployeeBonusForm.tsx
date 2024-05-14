import {FormLayout} from "../../../layout/FormLayout.tsx";
import {CustomInputText, CustomSelect} from "../../../components/form";
import {useEmployeeStore} from "../../../hooks";
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
import {useEmployeeBonusStore} from "../../../hooks/useEmployeeBonusStore.ts";

const dummyExample = [
    { bonNombre: 'Netflix', bonMonto: 1, bonPorcentaje: 0 },
    { bonNombre: 'Gimnasio', bonMonto: 10.45, bonPorcentaje: null },
];

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
        cleanForm
    } = useEmployeeBonusStore();

    const onClean = () => {
        cleanForm();
    }

    return (
        <FormLayout
            update={empPrimerNombre}
            initialValues={{
                empCodigo,
                empPrimerNombre,
                empSegundoNombre,
                bonCodigo: '0',
            }}
            onSubmit={() => console.log('submit')}
            onClean={onClean}
            validationSchema={{}}
        >
            <CustomInputText label={'Primer Nombre'} name={'empPrimerNombre'} disabled />
            <CustomInputText label={'Segundo Nombre'} name={'empSegundoNombre'} disabled />
            <CustomSelect label={'Bonificación'} name={'bonCodigo'} xs={12}>
                    {
                        dummyExample.map((bonus, i) => (
                            <MenuItem key={i} value={bonus.bonNombre}>
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
                                    <StyledTableCell align={'center'}> { header } </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dummyExample.map((row) => (
                                <TableRow>
                                    <TableCell align={'center'}> { row.bonNombre } </TableCell>
                                    <TableCell align={'center'}> { row.bonMonto ? row.bonMonto : row.bonPorcentaje } </TableCell>
                                    <TableCell align={'center'}> { row.bonPorcentaje ? 'Si' : 'No' } </TableCell>
                                    <TableCell align={'center'}>
                                        <IconButton
                                            onClick={() => console.log('hola eliminar')}
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
