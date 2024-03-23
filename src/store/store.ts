import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice} from "./modules/administration";
import {DepartmentInterface} from "../interfaces";
import {sidenavSlice} from "./ui";

export interface StoreInterface {
    department: DepartmentInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        sideNav: sidenavSlice.reducer
    }
});

