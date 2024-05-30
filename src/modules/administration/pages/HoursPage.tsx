import { Box, Button, Grid, MenuItem, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { TitleComponent } from "../components";
import { useHoursStore } from "../../../hooks/useHoursStore";
import { Form, Formik, FormikValues } from "formik";
import moment from "moment";
import { CustomSelect } from "../../../components/form";

const tableHeaders = ['Empleado', 'Entrada', 'Salida'];

const StyledTableCell = styled(TableCell)((_) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#001b40',
        color: '#f1f1f1',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const HoursPage = () => {

    const {
        empCodigo,
        empCUI = '',
        empPrimerNombre = '',
        empPrimerApellido = '',
        hrsCodigo,
        epuCodigo,
        hrsHoraEntrada,
        hrsHoraSalida,
        findByEmployeeAndDate,
        saveHourIncome,
        saveHourOutcome,
        cleanForm,
        employees
    } = useHoursStore();

    var buttonType: number = 1;

    const onEmployeeSelect = async (values: FormikValues) => {
        await findByEmployeeAndDate(values.empCodigo, moment(), employees.find((em) => em.empCodigo == values.empCodigo)!);
    };

    const onHourIncome = async (values: FormikValues) => {
        await saveHourIncome({...values, hrsCodigo}, employees.find((em) => em.empCodigo == values.empCodigo)!);
    };

    const onHourOutcome = async (values: FormikValues) => {
        await saveHourOutcome({...values, hrsCodigo}, employees.find((em) => em.empCodigo == values.empCodigo)!);
    };

    const onClean = () => {
        cleanForm();
    };

    return (
        <>
            <TitleComponent title={'Registro de Horas'}/>

            <Grid
                container
                spacing={0}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    p: 3
                }}
                className={'grid-main-container'}
            >
                <Box sx={{width: '100%'}}>
                    <Formik
                        initialValues={{
                            empCodigo,
                            empCUI,
                            empPrimerNombre,
                            empPrimerApellido,
                            hrsCodigo,
                            epuCodigo,
                            hrsHoraEntrada,
                            hrsHoraSalida,
                            buttonType
                        }}
                        onSubmit={values => {
                            switch(values.buttonType) {
                                case 1:
                                    onEmployeeSelect(values);
                                    break;
                                case 2:
                                    onHourIncome(values);
                                    break;
                                case 3:
                                    onHourOutcome(values);
                                    break;
                            }
                        }}
                        enableReinitialize={true}
                    >
                        {
                            (v) => (
                                <Form>
                                    <Box className={'form-content'}>
                                        <Grid container spacing={2}>
                                            <CustomSelect label={'Empleado'} name={'empCodigo'} xs={12} /*onChange={() => {onEmployeeSelect({empCodigo})}} */>
                                                {
                                                    employees.map((emp) => (
                                                        <MenuItem key={emp.empCodigo} value={emp.empCodigo}>
                                                            {emp.empCUI + ' - ' + emp.empPrimerNombre + ' ' + emp.empPrimerApellido}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </CustomSelect>
                                            <Grid item xs={4}>
                                                <Button variant="contained" onClick={() => { v.values.buttonType = 1 }} type="submit"> Buscar Registro </Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" onClick={() => { v.values.buttonType = 2 }} type="submit"> Registrar Entrada </Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" onClick={() => { v.values.buttonType = 3 }} type="submit"> Registrar Salida </Button>
                                            </Grid>
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
                                                            <TableRow key={hrsCodigo}>
                                                                <TableCell align={'center'}> {empCUI + ' - ' + empPrimerNombre + ' ' + empPrimerApellido} </TableCell>
                                                                <TableCell align={'center'}> {hrsHoraEntrada.format("DD-MM-YYYY hh:mm A")} </TableCell>
                                                                <TableCell align={'center'}> {hrsHoraSalida.format("DD-MM-YYYY hh:mm A")}  </TableCell>
                                                            </TableRow>
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Box>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Grid>
        </>
    );

};
