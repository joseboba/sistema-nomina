import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const voucherPdfSlice = createSlice({
    name: 'voucherPdfSlice',
    initialState,
    reducers: {
        setOpenVoucherPdf: (state, {payload}: PayloadAction<{ open: boolean }>) => {
            state.open = payload.open;
        }
    }
});

export const {
    setOpenVoucherPdf
} = voucherPdfSlice.actions;