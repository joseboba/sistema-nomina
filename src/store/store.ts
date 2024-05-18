import {configureStore} from "@reduxjs/toolkit";
import {
    absenceTypeSlice,
    benefitTypeSlice,
    bonificationSlice,
    currencyTypeSlice,
    deductionTypeSlice,
    departmentSlice,
    discountTypeSlice,
    employeeSlice,
    otherIncomeSlice,
    periodSlice,
    positionSlice,
    suspensionTypesSlice,
    employeeBonusSlice,
    employeeDiscountSlice,
    hoursSlice
} from "./modules/administration";
import {
    AbsenceTypeInterface,
    AccountTypeInterface,
    BankInterface,
    BenefitTypeInterface,
    BonificationInterface,
    CurrencyTypeInterface,
    DeductionTypeInterface,
    DepartmentInterface,
    DiscountTypeInterface,
    EmployeeInterface,
    OtherIncomeInterface,
    PeriodInterface,
    PositionInterface,
    SuspensionTypeInterface,
    EmployeeBonusInterface,
    EmployeeDiscountInterface,
    HoursInterface
} from "../interfaces";
import {sidenavSlice} from "./ui";

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
    period: PeriodInterface;
    employeeBonus: EmployeeBonusInterface;
    employeeDiscount: EmployeeDiscountInterface;
    hours: HoursInterface;
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
        period: periodSlice.reducer,
        employeeBonus: employeeBonusSlice.reducer,
        employeeDiscount: employeeDiscountSlice.reducer,
        hours: hoursSlice.reducer
    }
});

