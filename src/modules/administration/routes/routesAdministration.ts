import {ModuleRoute} from "../../../interfaces";
<<<<<<< HEAD
import { BonificacionPage, DepartmentPage, SuspensionTypesPage, OtherIncomePage, PositionPage, PeriodPage, AbsenceTypePage, DeductionTypePage, DiscountTypePage, BenefitTypePage, CurrencyTypePage} from "../pages";
=======
import {BonificacionPage, DepartmentPage, SuspensionTypesPage, OtherIncomePage, PositionPage, PeriodPage, AbsenceTypePage, DiscountTypePage, CurrencyTypePage, EmployeePage} from "../pages";
>>>>>>> 0bf0623c41cc529f3b32b8815543d6674d518c0d


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
    }
];
