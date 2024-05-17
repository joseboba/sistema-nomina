import {TitleComponent} from "../components";
import {QueryContentLayout, SearchBarLayout} from "../../../layout";
import {CustomDatePicker} from "../../../components/form";

export const ExtraHoursPage = () => {
    return (
        <>
            <TitleComponent title={'Carga de Horas Extra'}/>

            <SearchBarLayout
                initialValues={{}}
                validationSchema={{}}
                onSubmit={() => console.log('')}
                onClean={() => console.log('clean')}
            >
                <CustomDatePicker label={'Fecha inicial'} name={'startDate'} xs={2}/>
                <CustomDatePicker label={'Fecha final'} name={'endDate'} xs={2}/>
            </SearchBarLayout>
            <QueryContentLayout/>
        </>
    );
};
