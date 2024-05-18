import {Utilities} from "../util";
import {payrollApi} from "../api";
import {getEnvVariables} from "../helpers";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {PickerValidDate} from "@mui/x-date-pickers";
import {setLoanQueryContent, setEndDate, setStartDate, cleanLoanQuery} from "../store/modules/administration";
import {Moment} from "moment";

const {VITE_LOAN} = getEnvVariables();

export const useLoanUploadStore = () => {

    const loadUploadValues = useSelector((state: StoreInterface) => state.loanUploadSlice);
    const dispatch = useDispatch();

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await payrollApi.post(`${VITE_LOAN}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await Utilities.successAlarm('Registro guardado');
            await listLoanContent(loadUploadValues.startDate, loadUploadValues.endDate);
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const listLoanContent = async (startDate: Moment, endDate: Moment) => {
        try {
            const params: {fechaInicio: string; fechaFinal: string} = {
                fechaInicio: startDate.format('DD/MM/yyyy'),
                fechaFinal: endDate.format('DD/MM/yyyy')
            };

            const { data } = await payrollApi.get(`${VITE_LOAN}`, {params});
            dispatch(setLoanQueryContent(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const changeStartDate = (startDate: PickerValidDate | null) => {
        dispatch(setStartDate({ startDate }));
    }

    const changeEndDate = (endDate: PickerValidDate | null) => {
        dispatch(setEndDate({ endDate }));
    }

    const clean = () => {
        dispatch(cleanLoanQuery());
    }

    return {
        ...loadUploadValues,
        loadUploadValues,
        uploadFile,
        changeStartDate,
        changeEndDate,
        listLoanContent,
        clean
    }

}
