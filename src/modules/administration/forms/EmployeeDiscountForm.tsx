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
import {useEmployeeDiscountStore} from "../../../hooks/useEmployeeDiscountStore.ts";

const dummyExample = [
    {tdeNombre: 'IGSS', tdeMonto: 1, tdePorcentaje: 0},
    {tdeNombre: 'IRTRA', tdeMonto: 10.45, tdePorcentaje: null},
];

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
        cleanForm
    } = useEmployeeDiscountStore();

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
            }}
            onSubmit={() => console.log('submit')}
            onClean={onClean}
            validationSchema={{}}
        >
            <CustomInputText label={'Primer Nombre'} name={'empPrimerNombre'} disabled/>
            <CustomInputText label={'Segundo Nombre'} name={'empSegundoNombre'} disabled/>
            <CustomSelect label={'Deduccion'} name={'tdsCodigo'} xs={12}>
                {
                    dummyExample.map((discount, i) => (
                        <MenuItem key={i} value={discount.tdeNombre}>
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
                            dummyExample.map((row) => (
                                <TableRow>
                                    <TableCell align={'center'}> {row.tdeNombre} </TableCell>
                                    <TableCell
                                        align={'center'}> {row.tdeMonto ? row.tdeMonto : row.tdePorcentaje} </TableCell>
                                    <TableCell align={'center'}> {row.tdePorcentaje ? 'Si' : 'No'} </TableCell>
                                    <TableCell align={'center'}>
                                        <IconButton
                                            onClick={() => console.log('hola eliminar')}
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
