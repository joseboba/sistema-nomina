import {Utilities} from "../util";
import {payrollApi} from "../api";
import {getEnvVariables} from "../helpers";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {PickerValidDate} from "@mui/x-date-pickers";
import {setEndDateExtraHours, setStartDateExtraHours, setExtraHours} from "../store/modules/administration";
import { useEffect, useState } from "react";
import { EmployeeByPositionInteface, ExtraHourInterface } from "../interfaces";

const {VITE_EXTRA_HOUR, VITE_OTHER_INCOME_URI} = getEnvVariables();

export const useExtraHourUploadStore = () => {

   
    const extraHourUploadValues = useSelector((state: StoreInterface) => state.extraHourUploadSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findExtraHours(extraHourUploadValues.startDate.format("DD/MM/YYYY"), extraHourUploadValues.endDate.format("DD/MM/YYYY"));
    }, []);

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await payrollApi.post(`${VITE_EXTRA_HOUR}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await Utilities.successAlarm('Registro guardado');
            findExtraHours(extraHourUploadValues.startDate.format("DD/MM/YYYY"), extraHourUploadValues.endDate.format("DD/MM/YYYY"))
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const changeStartDate = (startDate: PickerValidDate | null) => {
        dispatch(setStartDateExtraHours({ startDate }));
    }

    const changeEndDate = (endDate: PickerValidDate | null) => {
        dispatch(setEndDateExtraHours({ endDate }));
    }

    const findExtraHours = async (fechaInicio: string, fechaFinal: string) => {
        try {
            const params = {fechaInicio, fechaFinal};
            const {data, headers} = await payrollApi.get(`${VITE_EXTRA_HOUR}`, {params});
            const list : ExtraHourInterface[] = data;
           
            dispatch(setExtraHours({extraHours: list}));
            
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanData = (extraHours: ExtraHourInterface[] | null) => {
        dispatch(setExtraHours({ extraHours: []}));
    }


    return {
        ...extraHourUploadValues,
        extraHourUploadValues,
        uploadFile,
        changeStartDate,
        changeEndDate,
        findExtraHours,
        cleanData
    }

}
