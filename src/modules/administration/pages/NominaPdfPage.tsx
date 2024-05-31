import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {setOpenNominaPdf} from "../../../store/modules/administration";
import {payrollApi} from "../../../api";
import {getEnvVariables} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";

const {VITE_NOMINA_PDF} = getEnvVariables();

export const NominaPdfPage = () => {

    const nominaPdfSlice = useSelector(state => state.nominaPdfSlice);
    const dispatch = useDispatch();

    const onHandlerDownload = async () =>  {
        const { data } = await  payrollApi.get(VITE_NOMINA_PDF);
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
        a.download = 'nomina.pdf';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        dispatch(setOpenNominaPdf({ open: false }));
    }

    return (
        <Dialog
            open={nominaPdfSlice.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Descarga de reporte de Nomina"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Opción para descargar el reporte de nomina
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpenNominaPdf({open: false}))}>Cerrar</Button>
                <Button onClick={onHandlerDownload} autoFocus> Descargar </Button>
            </DialogActions>
        </Dialog>
    );

}