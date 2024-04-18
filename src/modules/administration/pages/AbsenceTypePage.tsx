import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import {AbsenceTypeForm} from "../forms/AbsenceTypeForm";
import { useAbsenceTypeStore} from "../../../hooks";


export const AbsenceTypePage = () => {
    const {absenceTypeValues, findAll, findById, remove} = useAbsenceTypeStore();

    return (
        <>
            <TitleComponent title={'Tipos de ausencias'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        items={absenceTypeValues.items}
                        {...absenceTypeValues.page}
                        onChangePage={(page, search) => findAll(search, page)}
                        onChangeSearch={search => findAll(search, 0)}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <AbsenceTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
