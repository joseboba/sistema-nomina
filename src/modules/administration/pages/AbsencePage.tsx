import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { AbsenceForm } from "../forms/AbsenceForm";
import { useAbsenceStore } from "../../../hooks";


export const AbsencePage = () => {
    const {absenceValues, findAll, findById, remove} = useAbsenceStore();

    return (
        <>
            <TitleComponent title={'Ausencias'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...absenceValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={absenceValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <AbsenceForm/>
                </Grid>
            </Grid>
        </>
    )
}
