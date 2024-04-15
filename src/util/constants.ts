import {SideNavType} from "../interfaces";
import {Badge, ReceiptLong, Work} from "@mui/icons-material";

export const ADMIN_BASE_PATH = '/admin';

export const NAVBAR_ROUTES: SideNavType = [
    {
        moduleName: 'Catalogos',
        items: [
            {
                to: `${ADMIN_BASE_PATH}/department`,
                name: "Departamento",
                NavIcon: Badge
            },
            {
                to: `${ADMIN_BASE_PATH}/position`,
                name: 'Puesto',
                NavIcon: Work
            },
            {
                to: `${ADMIN_BASE_PATH}/bonification`,
                name: "Bonificación",
                NavIcon: ReceiptLong
            },
        ]
    }
];
