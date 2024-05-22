import moment from "moment";
import { SaleUploadInterface } from "../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PickerValidDate } from "@mui/x-date-pickers";

const initialState: SaleUploadInterface = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    content: [],
    file: null
};

export const saleUploadSlice = createSlice({
    name: 'saleUploadS',
    initialState,
    reducers: {
        setSaleStartDate: (state, {payload}: PayloadAction<{startDate: PickerValidDate | null}>) => {
            if(!payload.startDate) {
                return;
            }
            state.startDate = payload.startDate;
        },
        setSaleEndDate: (state, {payload}: PayloadAction<{endDate: PickerValidDate | null}>) => {
            if(!payload.endDate) {
                return;
            }
            state.endDate = payload.endDate;
        },
        setSaleQueryContent: (state, {payload}) => {
            state.content = payload;
        },
        cleanSaleQuery: (state) => {
            state.startDate = moment().startOf('month');
            state.endDate = moment().endOf('month');
            state.content = [];
            state.file = null;
        }
    }
});

export const {
    setSaleStartDate,
    setSaleEndDate,
    setSaleQueryContent,
    cleanSaleQuery
} = saleUploadSlice.actions;