import {ListComponent, TitleComponent} from "../components";
import {Grid} from "@mui/material";
import {EmployeeBonusForm} from "../forms/EmployeeBonusForm.tsx";
import {useEmployeeBonusStore} from "../../../hooks";



export const EmployeeBonusPage = () => {

    const {employeeBonusValues, findAll, findById} = useEmployeeBonusStore();


    return (
        <>
            <TitleComponent title={'Empleados Bonificación'} />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...employeeBonusValues.page}
                        onSelectItem={code => findById(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        useDelete={false}
                        items={employeeBonusValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <EmployeeBonusForm />
                </Grid>
            </Grid>
        </>
    );
};
