import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {pagoNominaslice, setOpenNominaPdf, setOpenPagoNomina} from "../../../store/modules/administration";
import {payrollApi} from "../../../api";
import {getEnvVariables} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";

const {VITE_PAGO_NOMINA} = getEnvVariables();

export const PagoNominaPage = () => {

    const pagoNominaslice = useSelector(state => state.pagoNominaslice);
    const dispatch = useDispatch();

    const onHandlerDownload = async () =>  {
        await payrollApi.post(VITE_PAGO_NOMINA);
        dispatch(setOpenPagoNomina({ open: false }));
    }

    return (
        <Dialog
            open={pagoNominaslice.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Pago de nomina"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Opción para realizar el pago de la nomina
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpenPagoNomina({open: false}))}>Cerrar</Button>
                <Button onClick={onHandlerDownload} autoFocus> Pagar </Button>
            </DialogActions>
        </Dialog>
    );

}