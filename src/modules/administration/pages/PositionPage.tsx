import {ListComponent, TitleComponent} from "../components";
import {Grid} from "@mui/material";
import {usePositionStore} from "../../../hooks";
import {PositionForm} from "../forms/PositionForm.tsx";

export const PositionPage = () => {

    const  {positionValues, findAll, findById, remove} = usePositionStore();

    return (
        <>
            <TitleComponent title={'Puestos'} />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...positionValues.page}
                        onSelectItem={code => findById(code)}
                        onDeleteItem={code => remove(code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={positionValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <PositionForm/>
                </Grid>
            </Grid>
        </>
    )
}