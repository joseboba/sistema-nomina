import {ModuleRoute} from "../../../interfaces";
import {AbsenceTypePage, BonificacionPage, DepartmentPage, DiscountTypePage, PositionPage} from "../pages";


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
        path: 'discountType',
        Component: DiscountTypePage,
    },
    {
        path: 'absenceType',
        Component: AbsenceTypePage,
    },
];
