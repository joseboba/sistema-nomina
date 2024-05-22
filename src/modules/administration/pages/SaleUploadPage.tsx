import { ChangeEvent, useRef } from "react";
import { useSaleUploadStore } from "../../../hooks";
import { TitleComponent } from "../components";
import { QueryContentLayout, SearchBarLayout } from "../../../layout";
import { CustomDatePicker } from "../../../components/form";

const tableHeaders = ['Nombre', 'Apellido', 'Fecha', 'Monto'];
const properties = ['empPrimerNombre', 'empPrimerApellido', 'venFecha', 'venMonto'];

export const SaleUploadPage = () => {

    const {
        startDate,
        endDate,
        content,
        changeStartDate,
        changeEndDate,
        uploadFile,
        listSaleContent,
        clean
    } = useSaleUploadStore();

    const ref = useRef(null);
    const onAdd = () => {
        ref.current?.click();
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0];
            await uploadFile(file);
            ref.current.value = null;
        }
        ref.current.value = null;
    };

    return (
        <>
            <TitleComponent title={'Carga de Ventas'}/>
            <SearchBarLayout
                initialValues={{
                    startDate,
                    endDate
                }}
                onClick={() => listSaleContent(startDate, endDate)}
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
                <input ref={ref} onChange={handleFileChange} hidden type={'file'} id={'saleFile'}/>
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