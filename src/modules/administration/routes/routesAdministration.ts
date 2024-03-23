import {DepartmentPage} from "../pages";
import {SidNavItemInterface} from "../../../interfaces";
import {Badge} from "@mui/icons-material";

export const ADMIN_BASE_PATH = '/admin';

export const routesAdministration: SidNavItemInterface[] = [
    {
        path: 'department',
        to: `${ADMIN_BASE_PATH}/department`,
        Component: DepartmentPage,
        name: "Departamento",
        NavIcon: Badge
    },
    // {
    //     path: 'log',
    //     to: 'log',
    //     Component: LogPage,
    // }
];
