import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import {EmployeeForm} from "../forms/EmployeeForm.tsx";
import {useEmployeeStore} from "../../../hooks";

export const EmployeePage = () => {

    const {employeeValues, findAll, findById, remove} = useEmployeeStore();

    return(
        <>
            <TitleComponent title={'Empleados'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...employeeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={employeeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <EmployeeForm/>
                </Grid>
            </Grid>
        </>
    )

}