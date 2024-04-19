import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import { DiscountTypeForm } from "../forms/DiscountTypeForm";
import { useDiscountTypeStore } from "../../../hooks";


export const DiscountTypePage = () => {
    const {discountTypeValues, findAll, findById, remove} = useDiscountTypeStore();

    return (
        <>
            <TitleComponent title={'Tipos de descuentos'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        {...discountTypeValues.page}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                        onChangeSearch={search => findAll(search, 0)}
                        onChangePage={(page, search) => findAll(search, page)}
                        items={discountTypeValues.items}
                    />
                </Grid>
                <Grid item xs={9}>
                    <DiscountTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
