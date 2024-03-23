import {Grid} from "@mui/material";
import {ListComponent, TitleComponent} from "../components";
import {DiscountTypeForm} from "../forms/DiscountTypeForm.tsx";
import { useDiscountTypeStore } from "../../../hooks/useDiscountTypeStore.ts";

export const DiscountTypePage = () => {
    const {discountTypeValues, findAll, findById, remove} = useDiscountTypeStore();

    return (
        <>
            <TitleComponent title={'Tipos de descuento'}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListComponent
                        items={discountTypeValues.items}
                        {...discountTypeValues.page}
                        onChangePage={(page, search) => findAll(search, page)}
                        onChangeSearch={search => findAll(search, 0)}
                        onSelectItem={code => findById(+code)}
                        onDeleteItem={code => remove(+code)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <DiscountTypeForm/>
                </Grid>
            </Grid>
        </>
    )
}
