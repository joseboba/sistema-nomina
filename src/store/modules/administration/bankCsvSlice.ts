import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    open: false
};



export const bankCsvSlice = createSlice({
    name: 'bankCsvSlice',
    initialState,
    reducers: {
        setOpenBankCsv: (state, {payload}: PayloadAction<{ open: boolean }>) => {
            state.open = payload.open;
        }
    }
});

export const {
    setOpenBankCsv
} = bankCsvSlice.actions;