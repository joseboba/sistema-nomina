import {ListComponent, TitleComponent} from "../components";
import {Grid} from "@mui/material";
import {EmployeeDiscountForm} from "../forms/EmployeeDiscountForm.tsx";
import {useEmployeeDiscountStore} from "../../../hooks";



export const EmployeeDiscountPage = () => {

    const {employeeDiscountValues, findAll, findById} = useEmployeeDiscountStore();


    return (
        <>
            <TitleComponent title={'Empleado Deducción'} />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        useDelete={false}
                        {...employeeDiscountValues.page}
                        onSelectItem={code => findById(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={employeeDiscountValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <EmployeeDiscountForm />
                </Grid>
            </Grid>
        </>
    );
};
