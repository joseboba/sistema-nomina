import {SideNavType} from "../interfaces";
import {Badge, ReceiptLong, Sick, CurrencyExchange} from "@mui/icons-material";

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
                to: `${ADMIN_BASE_PATH}/bonification`,
                name: "Bonificación",
                NavIcon: ReceiptLong
            },
            {
                to: `${ADMIN_BASE_PATH}/suspension-type`,
                name: "Tipos de suspensión",
                NavIcon: Sick
            },
            {
                to: `${ADMIN_BASE_PATH}/other-income`,
                name: "Otro ingreso",
                NavIcon: CurrencyExchange
            }
        ]
    }
];
