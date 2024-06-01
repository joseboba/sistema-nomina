import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { SuspensionForm } from "../forms/SuspensionForm.tsx";
import { useSuspensionStore } from "../../../hooks";


export const SuspensionPage = () => {
    const {suspensionValues, findAll, findById, remove} = useSuspensionStore();

    return (
        <>
            <TitleComponent title={'Suspensiones'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...suspensionValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={suspensionValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SuspensionForm/>
                </Grid>
            </Grid>
        </>
    )
}
