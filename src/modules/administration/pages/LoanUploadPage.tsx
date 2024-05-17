import {TitleComponent} from "../components";
import {QueryContentLayout, SearchBarLayout} from "../../../layout";
import {CustomDatePicker} from "../../../components/form";
import {ChangeEvent, useRef} from "react";
import {useLoanUploadStore} from "../../../hooks";

const tableHeaders = ['Empleado', 'Total Prestamo', 'Cuota'];
const properties = ['empNombre', 'preTotal', 'preCuota'];
const content = [
    {empNombre: 'Jose', preTotal: 10000, preCuota: 100},
    {empNombre: 'Enrique', preTotal: 20000, preCuota: 200},
    {empNombre: 'Bobadilla', preTotal: 30000, preCuota: 300},
    {empNombre: 'Firulais', preTotal: 40000, preCuota: 400},
    {empNombre: 'teletubi', preTotal: 50000, preCuota: 500},
    {empNombre: 'alfred', preTotal: 60000, preCuota: 600},
]
export const LoanUploadPage = () => {

    const {startDate, endDate, changeStartDate, changeEndDate, uploadFile} = useLoanUploadStore();

    const ref = useRef(null);
    const onAdd = () => {
        ref.current?.click();
    }

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
            <TitleComponent title={'Carga de Prestamos'}/>

            <SearchBarLayout
                initialValues={{
                    startDate,
                    endDate
                }}
                onSubmit={() => console.log('')}
                onClean={() => console.log('clean')}
            >
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
                <input ref={ref} onChange={handleFileChange} hidden type={'file'} id={'loanFile'}/>
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
