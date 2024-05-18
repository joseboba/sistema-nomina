import {TitleComponent} from "../components";
import {QueryContentLayout, SearchBarLayout} from "../../../layout";
import {CustomDatePicker} from "../../../components/form";
import {ChangeEvent, useRef} from "react";
import {useLoanUploadStore} from "../../../hooks";

const tableHeaders = ['Empleado', 'Total Prestamo', 'Cuota'];
const properties = ['empNombre', 'preMonto', 'preCuotaMensual'];
export const LoanUploadPage = () => {

    const {
        startDate,
        endDate,
        content,
        changeStartDate,
        changeEndDate,
        uploadFile,
        listLoanContent,
        clean
    } = useLoanUploadStore();

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
                onClick={() => listLoanContent(startDate, endDate)}
                onSubmit={() => console.log('submit')}
                onClean={() => clean()}
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
