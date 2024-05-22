import { useSelector } from "react-redux";
import { getEnvVariables } from "../helpers";
import { StoreInterface } from "../store";
import { useDispatch } from "react-redux";
import { payrollApi } from "../api";
import { Utilities } from "../util";
import { Moment } from "moment";
import { PickerValidDate } from "@mui/x-date-pickers";
import { cleanProductionQuery, setProdEndDate, setProdStartDate, setProductionQueryContent } from "../store/modules/administration/productionUploadSlice";

const {VITE_PRODUCTION} = getEnvVariables();

export const useProductionUploadStore = () => {

    const productionUploadValues = useSelector((state: StoreInterface) => state.productionUploadSlice);
    const dispatch = useDispatch();

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await payrollApi.post(`${VITE_PRODUCTION}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await Utilities.successAlarm('Registro guardado');
            await listProductionContent(productionUploadValues.startDate, productionUploadValues.endDate);

        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const listProductionContent = async (startDate: Moment, endDate: Moment) => {
        try {
            const params: {fechaInicio: string, fechaFinal: string} = {
                fechaInicio: startDate.format('DD/MM/yyyy'),
                fechaFinal: endDate.format('DD/MM/yyyy')
            };
            const {data} = await payrollApi.get(`${VITE_PRODUCTION}`, {params});
            dispatch(setProductionQueryContent(data));
        } catch(e) {
            await Utilities.errorAlarm(e);
        }
    }

    const changeStartDate = (startDate: PickerValidDate | null) => {
        dispatch(setProdStartDate({startDate}));
    }

    const changeEndDate = (endDate: PickerValidDate | null) => {
        dispatch(setProdEndDate({endDate}));
    }

    const clean = () => {
        dispatch(cleanProductionQuery());
    }

    return {
        ...productionUploadValues,
        productionUploadValues,
        uploadFile,
        changeStartDate,
        changeEndDate,
        listProductionContent,
        clean
    }

}