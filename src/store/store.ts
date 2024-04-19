import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice, suspensionTypesSlice, otherIncomeSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface, OtherIncomeInterface, SuspensionTypeInterface} from "../interfaces";
import {sidenavSlice} from "./ui";

export interface StoreInterface {
    department: DepartmentInterface;
    bonification: BonificationInterface;
    suspensionTypes: SuspensionTypeInterface;
    otherIncome: OtherIncomeInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        sideNav: sidenavSlice.reducer,
        bonification: bonificationSlice.reducer,
        suspensionTypes: suspensionTypesSlice.reducer,
        otherIncome: otherIncomeSlice.reducer
    }
});

