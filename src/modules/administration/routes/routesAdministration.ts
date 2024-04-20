import {ModuleRoute} from "../../../interfaces";
import { BonificacionPage, DepartmentPage, SuspensionTypesPage, OtherIncomePage, PositionPage, PeriodPage, AbsenceTypePage, DeductionTypePage, DiscountTypePage, BenefitTypePage, CurrencyTypePage} from "../pages";


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
    }
];
