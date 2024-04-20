import {configureStore} from "@reduxjs/toolkit";
import {departmentSlice, bonificationSlice, suspensionTypesSlice, otherIncomeSlice, absenceTypeSlice, discountTypeSlice, currencyTypeSlice, periodSlice, employeeSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface, OtherIncomeInterface, SuspensionTypeInterface, PositionInterface, AbsenceTypeInterface, DiscountTypeInterface, CurrencyTypeInterface, PeriodInterface, EmployeeInterface, BankInterface, AccountTypeInterface} from "../interfaces";
import {sidenavSlice} from "./ui";
import {positionSlice} from "./modules/administration/positionSlice.ts";

export interface StoreInterface {
    department: DepartmentInterface;
    employee: EmployeeInterface;
    bank: BankInterface;
    accountType: AccountTypeInterface;
    bonification: BonificationInterface;
    suspensionTypes: SuspensionTypeInterface;
    otherIncome: OtherIncomeInterface;
    position: PositionInterface;
    absenceType: AbsenceTypeInterface;
    discountType: DiscountTypeInterface;
    currencyType: CurrencyTypeInterface;
    period: PeriodInterface
}

export const store = configureStore({
    reducer: {
        department: departmentSlice.reducer,
        employee: employeeSlice.reducer,
        sideNav: sidenavSlice.reducer,
        bonification: bonificationSlice.reducer,
        suspensionTypes: suspensionTypesSlice.reducer,
        otherIncome: otherIncomeSlice.reducer,
        position: positionSlice.reducer,
        absenceType: absenceTypeSlice.reducer,
        discountType: discountTypeSlice.reducer,
        currencyType: currencyTypeSlice.reducer,
        period: periodSlice.reducer
    }
});

