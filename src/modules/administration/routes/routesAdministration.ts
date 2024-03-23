import {BonificacionPage, DepartmentPage} from "../pages";
import {SidNavItemInterface} from "../../../interfaces";
import {Badge, ReceiptLong} from "@mui/icons-material";

export const ADMIN_BASE_PATH = '/admin';

export const routesAdministration: SidNavItemInterface[] = [
    // {
    //     path: 'department',
    //     to: `${ADMIN_BASE_PATH}/department`,
    //     Component: DepartmentPage,
    //     name: "Departamento",
    //     NavIcon: Badge
    // },
        {
            path: 'bonification',
            to: `${ADMIN_BASE_PATH}/bonification`,
            Component: BonificacionPage,
            name: "Bonificación",
            NavIcon: ReceiptLong
        },
    // {
    //     path: 'log',
    //     to: 'log',
    //     Component: LogPage,
    // }
];
