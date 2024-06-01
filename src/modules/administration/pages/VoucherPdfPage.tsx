import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem} from "@mui/material";
import {setOpenExtraHourCsv, setOpenVoucherPdf} from "../../../store/modules/administration";
import {payrollApi} from "../../../api";
import {getEnvVariables} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import { CustomSelect } from "../../../components/form";
import { useEffect, useState } from "react";
import { EmployeeByPositionInteface, EmployeeInterface } from "../../../interfaces";
import { Utilities } from "../../../util";

const {VITE_VOUCHER_PDF, VITE_OTHER_INCOME_URI} = getEnvVariables();

export const VoucherPdfPage = () => {

    const voucherPdf = useSelector(state => state.voucherPdfSlice);
    const dispatch = useDispatch();

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    var selectedEmployee: EmployeeInterface;

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        try {
            const { data } = await payrollApi.get(`${VITE_OTHER_INCOME_URI}/empleados`);
            const defaultData: EmployeeByPositionInteface[] = [{epuCodigo: 0,
                    empPrimerNombre: 'Seleccione un empleado', empSegundoNombre: "", empPrimerApellido: "", empSegundoApellido: ""}];
                    setEmployees([...defaultData, ...data]);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const onHandlerDownload = async (codigo: number) => {
        const { data } = await payrollApi.get(`${VITE_VOUCHER_PDF}/${codigo}`);
        const decodedData = atob(data);

        const byteNumbers = new Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            byteNumbers[i] = decodedData.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recibo.pdf';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        dispatch(setOpenVoucherPdf({ open: false }));
    }

    return (
        <Dialog
            open={voucherPdf.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Descarga de Recibo de Pago a Empleado"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Opción para descargar el archivo de recibo de pago a empleado
                </DialogContentText>
                <CustomSelect label={'Empleado'} name={'empCodigo'}>
                {
                    employees.map(em => (
                        <MenuItem key={em.empCodigo} value={em.empCodigo} onSelect={ selectedEmployee = em }>
                            { em.empCodigo + ' | ' + em.empPrimerNombre + ' ' + em.empPrimerApellido}
                        </MenuItem>
                    ))
                }
                </CustomSelect>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpenExtraHourCsv({open: false}))}>Cerrar</Button>
                <Button onClick={onHandlerDownload(selectedEmployee!.empCodigo ?? 0)} autoFocus> Descargar </Button>
            </DialogActions>
        </Dialog>
    );

}