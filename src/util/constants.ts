import {SideNavType} from "../interfaces";
import {Badge, Discount} from "@mui/icons-material";

export const ADMIN_BASE_PATH = '/admin';

export const NAVBAR_ROUTES: SideNavType = [
    {
        moduleName: 'Catalogos',
        items: [
            {
                path: 'department',
                to: `${ADMIN_BASE_PATH}/department`,
                name: "Departamento",
                NavIcon: Badge
            },
            {
                path: 'discountType',
                to: `${ADMIN_BASE_PATH}/discountType`,
                name: "Tipo de descuento",
                NavIcon: Discount
            },
        ]
    }
];
