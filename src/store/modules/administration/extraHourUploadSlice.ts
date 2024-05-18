import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExtraHourInterface, ExtraHourUploadInterface} from "../../../interfaces";
import moment from "moment";
import {PickerValidDate} from "@mui/x-date-pickers";

const initialState: ExtraHourUploadInterface = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    file: null,
    empCodigo: 0,
    extraHours: []
};

export const extraHourUploadSlice = createSlice({
    name: 'extraHourUploadS',
    initialState,
    reducers: {
        setStartDateExtraHours: (state, {payload}: PayloadAction<{startDate: PickerValidDate | null }>) => {
            if (!payload.startDate) {
                return;
            }

            state.startDate = payload.startDate;
        },
        setEndDateExtraHours: (state, {payload}: PayloadAction<{endDate: PickerValidDate | null }>) => {
            if (!payload.endDate) {
                return;
            }

            state.endDate = payload.endDate;
        },
        setExtraHours: (state, {payload}: PayloadAction<{extraHours: ExtraHourInterface[] | null }> ) => {
            if (!payload.extraHours) {
                return;
            }

            state.extraHours = payload.extraHours;
        }
    }
});


export const {
    setStartDateExtraHours,
    setEndDateExtraHours,
    setExtraHours
} = extraHourUploadSlice.actions;
