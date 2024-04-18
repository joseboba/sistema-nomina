import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice, discountTypeSlice, absenceTypeSlice} from "./modules/administration";
import {AbsenceTypeInterface, BonificationInterface, DepartmentInterface, DiscountTypeInterface, PositionInterface} from "../interfaces";
import {sidenavSlice} from "./ui";
import {positionSlice} from "./modules/administration/positionSlice.ts";

export interface StoreInterface {
    department: DepartmentInterface;
    bonification: BonificationInterface;
    position: PositionInterface;
    discountType: DiscountTypeInterface;
    absenceType: AbsenceTypeInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        sideNav: sidenavSlice.reducer,
        bonification: bonificationSlice.reducer,
        position: positionSlice.reducer,
        discountType: discountTypeSlice.reducer,
        absenceType: absenceTypeSlice.reducer
    }
});

