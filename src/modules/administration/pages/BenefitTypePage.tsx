import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { BenefitTypeForm } from "../forms/BenefitTypeForm";
import { useBenefitTypeStore} from "../../../hooks";


export const BenefitTypePage = () => {
    const { benefitTypeValues, findAll, findById, remove } = useBenefitTypeStore();

    return (
        <>
            <TitleComponent title={'Tipo de prestacion'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...benefitTypeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={benefitTypeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <BenefitTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
