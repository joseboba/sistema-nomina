import {configureStore} from "@reduxjs/toolkit";
<<<<<<< HEAD
import {departmentSlice, bonificationSlice, suspensionTypesSlice, otherIncomeSlice, absenceTypeSlice, discountTypeSlice, currencyTypeSlice, periodSlice, deductionTypeSlice, benefitTypeSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface, OtherIncomeInterface, SuspensionTypeInterface, PositionInterface, AbsenceTypeInterface, DiscountTypeInterface, CurrencyTypeInterface, PeriodInterface, DeductionTypeInterface, BenefitTypeInterface} from "../interfaces";
=======
import {departmentSlice, bonificationSlice, suspensionTypesSlice, otherIncomeSlice, absenceTypeSlice, discountTypeSlice, currencyTypeSlice, periodSlice, employeeSlice} from "./modules/administration";
import {BonificationInterface, DepartmentInterface, OtherIncomeInterface, SuspensionTypeInterface, PositionInterface, AbsenceTypeInterface, DiscountTypeInterface, CurrencyTypeInterface, PeriodInterface, EmployeeInterface, BankInterface, AccountTypeInterface} from "../interfaces";
>>>>>>> 0bf0623c41cc529f3b32b8815543d6674d518c0d
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
    deductionType: DeductionTypeInterface;
    currencyType: CurrencyTypeInterface;
    benefitType: BenefitTypeInterface;
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
        deductionType: deductionTypeSlice.reducer,
        currencyType: currencyTypeSlice.reducer,
        benefitType: benefitTypeSlice.reducer,
        period: periodSlice.reducer
    }
});

