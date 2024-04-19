import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { PeriodForm } from "../forms/PeriodForm";
import { usePeriodStore } from "../../../hooks";


export const PeriodPage = () => {
    const {periodValues, findAll, findById, remove} = usePeriodStore();

    return (
        <>
            <TitleComponent title={'Periodos'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...periodValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={periodValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <PeriodForm/>
                </Grid>
            </Grid>
        </>
    )
}
