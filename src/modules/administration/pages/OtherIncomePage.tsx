import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { OtherIncomeForm } from "../forms/OtherIncomeForm";
import { useOtherIncomeStore } from "../../../hooks";


export const OtherIncomePage = () => {
    const {otherIncomeValues, findAll, findById, remove} = useOtherIncomeStore();

    return (
        <>
            <TitleComponent title={'Otros ingresos'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...otherIncomeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={otherIncomeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <OtherIncomeForm/>
                </Grid>
            </Grid>
        </>
    )
}
