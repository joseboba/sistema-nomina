import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { DeductionTypeForm } from "../forms/DeductionTypeForm";
import { useDeductionTypeStore} from "../../../hooks";


export const DeductionTypePage = () => {
    const {deductionTypeValues, findAll, findById, remove} = useDeductionTypeStore();

    return (
        <>
            <TitleComponent title={'Tipo Deducciones'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...deductionTypeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={deductionTypeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <DeductionTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
