import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface} from "../interfaces";
import {sidenavSlice} from "./ui";

export interface StoreInterface {
    department: DepartmentInterface;
    bonification: BonificationInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        sideNav: sidenavSlice.reducer,
        bonification: bonificationSlice.reducer
    }
});

