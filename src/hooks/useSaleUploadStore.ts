import { useSelector } from "react-redux";
import { getEnvVariables } from "../helpers";
import { StoreInterface } from "../store";
import { useDispatch } from "react-redux";
import { payrollApi } from "../api";
import { Utilities } from "../util";
import { Moment } from "moment";
import { cleanSaleQuery, setSaleEndDate, setSaleQueryContent, setSaleStartDate } from "../store/modules/administration";
import { PickerValidDate } from "@mui/x-date-pickers";

const {VITE_SALE} = getEnvVariables();

export const useSaleUploadStore = () => {

    const saleUploadValues = useSelector((state: StoreInterface) => state.saleUploadSlice);
    const dispatch = useDispatch();

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await payrollApi.post(`${VITE_SALE}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await Utilities.successAlarm('Registro guardado');
            await listSaleContent(saleUploadValues.startDate, saleUploadValues.endDate);
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const listSaleContent = async (startDate: Moment, endDate: Moment) => {
        try {
            const params: {fechaInicio: string, fechaFinal: string} = {
                fechaInicio: startDate.format('DD/MM/yyyy'),
                fechaFinal: endDate.format('DD/MM/yyyy')
            };
            const {data} = await payrollApi.get(`${VITE_SALE}`, {params});
            dispatch(setSaleQueryContent(data));
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const changeStartDate = (startDate: PickerValidDate | null) => {
        dispatch(setSaleStartDate({startDate}));
    }

    const changeEndDate = (endDate: PickerValidDate | null) => {
        dispatch(setSaleEndDate({endDate}));
    }

    const clean = () => {
        dispatch(cleanSaleQuery());
    }
    
    return {
        ...saleUploadValues,
        saleUploadValues,
        uploadFile,
        changeStartDate,
        changeEndDate,
        listSaleContent,
        clean
    }

}