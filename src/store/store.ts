import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice} from "./modules/administration";
import {DepartmentInterface, DiscountTypeInterface} from "../interfaces";
import {sidenavSlice} from "./ui";
import { discountTypeSlice } from "./modules/administration/discountTypeSlice";

export interface StoreInterface {
    department: DepartmentInterface;
    discountType: DiscountTypeInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        discountType: discountTypeSlice.reducer,
        sideNav: sidenavSlice.reducer
    }
});

