import moment from "moment";
import { ProductionUploadInterface } from "../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PickerValidDate } from "@mui/x-date-pickers";

const initialState: ProductionUploadInterface = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    content: [],
    file: null
};

export const productionUploadSlice = createSlice({
    name: 'productionUploadS',
    initialState,
    reducers: {
        setProdStartDate: (state, {payload}: PayloadAction<{startDate: PickerValidDate | null}>) => {
            if(!payload.startDate) {
                return;
            }
            state.startDate = payload.startDate;
        },
        setProdEndDate: (state, {payload}: PayloadAction<{endDate: PickerValidDate | null}>) => {
            if(!payload.endDate) {
                return;
            }
            state.endDate = payload.endDate;
        },
        setProductionQueryContent: (state, {payload}) => {
            state.content = payload;
        },
        cleanProductionQuery: (state) => {
            state.startDate = moment().startOf('month');
            state.endDate = moment().endOf('month');
            state.content = [];
            state.file = null;
        }
    }
});

export const {
    setProdStartDate,
    setProdEndDate,
    setProductionQueryContent,
    cleanProductionQuery
} = productionUploadSlice.actions;