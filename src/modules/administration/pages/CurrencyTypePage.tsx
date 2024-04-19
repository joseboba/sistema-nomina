import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { CurrencyTypeForm } from "../forms/CurrencyTypeForm";
import { useCurrencyTypeStore } from "../../../hooks";


export const CurrencyTypePage = () => {
    const {currencyTypeValues, findAll, findById, remove} = useCurrencyTypeStore();

    return (
        <>
            <TitleComponent title={'Tipos de moneda'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...currencyTypeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={currencyTypeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <CurrencyTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
