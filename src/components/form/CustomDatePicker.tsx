import {Grid} from "@mui/material";
import {useField, useFormikContext} from "formik";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


interface Props {
    label: string;
    name: string;
    placeholder?: string;
    xs?: number;
    [x: string]: any;
}

export const CustomDatePicker = ({xs = 6, ...props}: Props) => {

    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    return (
        <Grid item xs={xs}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    {...field}
                    {...props}
                    onChange={value => {
                        setFieldValue(field.name, value);
                    }}
                    sx={{width: '100%'}}
                    slotProps={{
                        field: {
                            readOnly: true
                        }
                    }}
                    error={meta.touched && meta.error !== undefined && meta.error !== null && meta.error.trim().length > 0}
                    helperText={meta.touched && meta.error ? meta.error : ''}
                />
            </LocalizationProvider>
        </Grid>
    );
};
