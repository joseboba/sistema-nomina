import {ModuleRoute} from "../../../interfaces";
import {BonificacionPage, DepartmentPage} from "../pages";


export const routesAdministration: ModuleRoute[] = [
    {
        path: 'department',
        Component: DepartmentPage
    },
    {
        path: 'bonification',
        Component: BonificacionPage,
    }
];
