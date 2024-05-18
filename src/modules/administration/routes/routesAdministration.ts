import {ModuleRoute} from "../../../interfaces";
import {
    AbsenceTypePage,
    BenefitTypePage,
    BonificacionPage,
    CurrencyTypePage,
    DeductionTypePage,
    DepartmentPage,
    DiscountTypePage,
    EmployeeBonusPage,
    EmployeeDiscountPage,
    EmployeePage, LoanUploadPage,
    OtherIncomePage,
    PeriodPage,
    PositionPage,
    SuspensionTypesPage,
    ExtraHourUploadPage
} from "../pages";


export const routesAdministration: ModuleRoute[] = [
    {
        path: 'department',
        Component: DepartmentPage
    },
    {
        path: 'position',
        Component: PositionPage
    },
    {
        path: 'bonification',
        Component: BonificacionPage,
    },
    {
        path: 'suspension-type',
        Component: SuspensionTypesPage
    },
    {
        path: 'other-income',
        Component: OtherIncomePage
    },
    {
        path: 'period',
        Component: PeriodPage
    },
    {
        path: 'absenceType',
        Component: AbsenceTypePage
    },
    {
        path: 'deductionType',
        Component: DeductionTypePage
    },
    {
        path: 'absenceType',
        Component: AbsenceTypePage
    },
    {
        path: 'benefitType',
        Component: BenefitTypePage
    },
    {
        path: 'currencyType',
        Component: CurrencyTypePage
    },
    {
        path: 'employee',
        Component: EmployeePage
    },
    {
        path: 'employee-bonification',
        Component: EmployeeBonusPage
    },
    {
        path: 'discountType',
        Component: DiscountTypePage
    },
    {
        path: 'employee-discount',
        Component: EmployeeDiscountPage
    },
    {
        path: 'extra-hours',
        Component: ExtraHourUploadPage
    },
    {
        path: 'loan',
        Component: LoanUploadPage
    }
];
