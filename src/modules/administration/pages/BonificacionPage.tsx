import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import {BonificationForm} from "../forms/BonificacionForm";
import { useBonificationStore} from "../../../hooks";


export const BonificacionPage = () => {
    const {bonificationValues, findAll, findById, remove} = useBonificationStore();

    return (
        <>
            <TitleComponent title={'Bonificaciones'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        items={bonificationValues.items}
                        {...bonificationValues.page}
                        onChangePage={(page, search) => findAll(search, page)}
                        onChangeSearch={search => findAll(search, 0)}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <BonificationForm/>
                </Grid>
            </Grid>
        </>
    )
}
