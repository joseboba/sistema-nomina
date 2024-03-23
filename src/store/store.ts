import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface} from "../interfaces";

export interface StoreInterface {
    department: DepartmentInterface;
    bonification: BonificationInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        bonification: bonificationSlice.reducer
    }
});

