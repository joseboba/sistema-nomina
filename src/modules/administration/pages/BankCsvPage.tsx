import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setOpenBankCsv} from "../../../store/modules/administration";
import {getEnvVariables} from "../../../helpers";
import {payrollApi} from "../../../api";

const {VITE_BANK_CSV_URI} = getEnvVariables();

export const BankCsvPage = () => {

    const bankCsv = useSelector(state => state.bankCsvSlice);
    const dispatch = useDispatch();

    const onHandlerDownload = async () =>  {
        const { data } = await  payrollApi.get(VITE_BANK_CSV_URI);
        const decodedData = atob(data);

        const byteNumbers = new Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            byteNumbers[i] = decodedData.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'text/csv' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bancos.csv';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        dispatch(setOpenBankCsv({ open: false }));
    }

    return (
        <Dialog
            open={bankCsv.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Descarga de reporte de Bancos"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Opción para descargar el archivo para pagos, hacia el sistema de banco
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpenBankCsv({open: false}))}>Cerrar</Button>
                <Button onClick={onHandlerDownload} autoFocus> Descargar </Button>
            </DialogActions>
        </Dialog>
    )

 }