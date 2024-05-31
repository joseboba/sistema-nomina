import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const extraHourPdfSlice = createSlice({
    name: 'extraHourPdfSlice',
    initialState,
    reducers: {
        setOpenExtraHourCsv: (state, {payload}: PayloadAction<{ open: boolean }>) => {
            state.open = payload.open;
        }
    }
});

export const {
    setOpenExtraHourCsv
} = extraHourPdfSlice.actions;