import moment from "moment";
import { HoursInterface } from "../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HoursInterface = {
    hrsCodigo: 0,
    epuCodigo: 0,
    hrsHoraEntrada: moment(),
    hrsHoraSalida: moment()
}

export const hoursSlice = createSlice({
    name: 'hours',
    initialState,
    reducers: {
        cleanHours: (state) => {
            state.hrsCodigo = 0;
            state.epuCodigo = 0;
            state.hrsHoraEntrada = moment();
            state.hrsHoraSalida = moment();
        },
        setHours: (state, {payload}: PayloadAction<HoursInterface>) => {
            state.hrsCodigo = payload.hrsCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.hrsHoraEntrada = moment(payload.hrsHoraEntrada, "DD-MM-YYYY hh:mm A");
            state.hrsHoraSalida = moment(payload.hrsHoraSalida, "DD-MM-YYYY hh:mm A");
        }
    }
});

export const {
    cleanHours,
    setHours
} = hoursSlice.actions;