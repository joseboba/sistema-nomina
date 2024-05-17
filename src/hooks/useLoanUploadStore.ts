import {Utilities} from "../util";
import {payrollApi} from "../api";
import {getEnvVariables} from "../helpers";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../store";
import {PickerValidDate} from "@mui/x-date-pickers";
import {setEndDate, setStartDate} from "../store/modules/administration";

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

    return {
        ...loadUploadValues,
        loadUploadValues,
        uploadFile,
        changeStartDate,
        changeEndDate
    }

}
