import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const nominaPdfSlice = createSlice({
    name: 'nominaPdfSlice',
    initialState,
    reducers: {
        setOpenNominaPdf: (state, {payload}: PayloadAction<{ open: boolean }>) => {
            state.open = payload.open;
        }
    }
});

export const {
    setOpenNominaPdf
} = nominaPdfSlice.actions;