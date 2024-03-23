import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import {DepartmentForm} from "../forms/DepartmentForm.tsx";
import {useDepartmentStore} from "../../../hooks";


export const DepartmentPage = () => {
    const {departmentValues, findAll, findById, remove} = useDepartmentStore();

    return (
        <>
            <TitleComponent title={'Departamentos'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        items={departmentValues.items}
                        {...departmentValues.page}
                        onChangePage={(page, search) => findAll(search, page)}
                        onChangeSearch={search => findAll(search, 0)}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <DepartmentForm/>
                </Grid>
            </Grid>
        </>
    )
}
