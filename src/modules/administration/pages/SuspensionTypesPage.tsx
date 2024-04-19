import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { SuspensionTypesForm } from "../forms/SuspensionTypesForm";
import { useSuspensionTypesStore } from "../../../hooks";


export const SuspensionTypesPage = () => {
    const {suspensionTypesValues, findAll, findById, remove} = useSuspensionTypesStore();

    return (
        <>
            <TitleComponent title={'Tipos de suspensiones'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...suspensionTypesValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={suspensionTypesValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SuspensionTypesForm/>
                </Grid>
            </Grid>
        </>
    )
}
