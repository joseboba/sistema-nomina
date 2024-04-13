import {ModuleRoute} from "../../../interfaces";
import {BonificacionPage, DepartmentPage, PositionPage} from "../pages";


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
];
