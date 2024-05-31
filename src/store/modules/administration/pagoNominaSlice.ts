import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const pagoNominaslice = createSlice({
    name: 'pagoNominaslice',
    initialState,
    reducers: {
        setOpenPagoNomina: (state, {payload}: PayloadAction<{ open: boolean }>) => {
            state.open = payload.open;
        }
    }
});

export const {
    setOpenPagoNomina
} = pagoNominaslice.actions;