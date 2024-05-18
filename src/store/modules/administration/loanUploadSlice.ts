import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoanUploadInterface} from "../../../interfaces";
import moment from "moment";
import {PickerValidDate} from "@mui/x-date-pickers";

const initialState: LoanUploadInterface = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    content: [],
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
        },
        setLoanQueryContent: (state, {payload}) => {
            state.content = payload;
        },
        cleanLoanQuery: (state) => {
            state.startDate = moment().startOf('month');
            state.endDate = moment().endOf('month');
            state.content = [];
            state.file = null;
        }
    }
});


export const {
    setStartDate,
    setEndDate,
    setLoanQueryContent,
    cleanLoanQuery
} = loanUploadSlice.actions;
