import {TitleComponent} from "../components";
import {QueryContentLayout, SearchBarLayout} from "../../../layout";
import {CustomDatePicker, CustomSelect} from "../../../components/form";
import {ChangeEvent, useRef} from "react";
import {useExtraHourUploadStore} from "../../../hooks";
import { Utilities } from "../../../util";
import { ExtraHourDataTable } from "../../../interfaces";
import { setEndDate, setExtraHours, setStartDate } from "../../../store/modules/administration";
import moment, { Moment } from "moment";

const tableHeaders = ['Empleado', 'Cantidad de horas', 'Fecha'];
const properties = ['nombreEmpleado', 'cantidad', 'fecha'];

export const ExtraHourUploadPage = () => {

    const {startDate, endDate, changeStartDate, changeEndDate, uploadFile, empCodigo, extraHours, findExtraHours, cleanData} = useExtraHourUploadStore();

    const ref = useRef(null);
    const onAdd = () => {
        ref.current?.click();
    }

    const content = extraHours.map(extraHour => {
        console.log("data " + JSON.stringify(extraHour));
        return {
            nombreEmpleado: Utilities.capitalizeFirstLetter(extraHour.empPrimerNombre!) + " " + Utilities.capitalizeFirstLetter(extraHour.empPrimerApellido),
            cantidad: extraHour.hexCantidad,
            fecha: extraHour.hexFecha?.split(" ")[0]
        }
    });

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            await uploadFile(file);
            ref.current.value = null;
        }
        ref.current.value = null;
    };

    return (
        <>
            <TitleComponent title={'Carga de horas extra'}/>

            <SearchBarLayout
                initialValues={{
                    startDate,
                    endDate
                }}
                onSubmit={() => findExtraHours(startDate.format("DD/MM/YYYY"), endDate.format("DD/MM/YYYY"))}
                onClean={() => {
                    cleanData([]);
                    changeStartDate(moment().startOf("month")) 
                    changeEndDate(moment().endOf("month"))}}
            >
                {/* <CustomSelect label={'Empleado'} name={'empCodigo'}>
                {
                    employeesByPosition.map(employee => (
                        <MenuItem key={employee.epuCodigo} value={employee.epuCodigo}>
                            {`${employee.empCodigo ? employee.empCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(employee.empPrimerNombre!)} 
                             ${Utilities.capitalizeFirstLetter(employee.empPrimerApellido!)}`}
                        </MenuItem>
                    ))
                }
                </CustomSelect> */}
                <CustomDatePicker
                    maxDate={endDate}
                    label={'Fecha inicial'}
                    name={'startDate'}
                    xs={2}
                    onChange={(value) => changeStartDate(value)}
                />
                <CustomDatePicker
                    minDate={startDate}
                    label={'Fecha final'}
                    name={'endDate'}
                    xs={2}
                    onChange={(value) => changeEndDate(value)}
                />
                <input ref={ref} onChange={handleFileChange} hidden type={'file'} id={'extraHoursFile'}/>
            </SearchBarLayout>
            <QueryContentLayout
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                properties={properties}
                tableBody={content}
            />
        </>
    );
};
