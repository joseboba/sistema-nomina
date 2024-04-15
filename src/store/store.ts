import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface, PositionInterface} from "../interfaces";
import {sidenavSlice} from "./ui";
import {positionSlice} from "./modules/administration/positionSlice.ts";

export interface StoreInterface {
    department: DepartmentInterface;
    bonification: BonificationInterface;
    position: PositionInterface;
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        sideNav: sidenavSlice.reducer,
        bonification: bonificationSlice.reducer,
        position: positionSlice.reducer
    }
});

