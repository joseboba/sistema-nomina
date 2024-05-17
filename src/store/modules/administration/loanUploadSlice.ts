import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoanUploadInterface} from "../../../interfaces";
import moment from "moment";
import {PickerValidDate} from "@mui/x-date-pickers";

const initialState: LoanUploadInterface = {
    startDate: moment(),
    endDate: moment().endOf('month'),
    file: null
};

export const loanUploadSlice = createSlice({
    name: 'loanUploadS',
    initialState,
    reducers: {
        setStartDate: (state, {payload}: PayloadAction<{startDate: PickerValidDate | null }>) => {
            if (!payload.startDate) {
                return;
            }

            state.startDate = payload.startDate;
        },
        setEndDate: (state, {payload}: PayloadAction<{endDate: PickerValidDate | null }>) => {
            if (!payload.endDate) {
                return;
            }

            state.endDate = payload.endDate;
        }
    }
});


export const {
    setStartDate,
    setEndDate
} = loanUploadSlice.actions;
