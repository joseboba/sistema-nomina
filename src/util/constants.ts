import {SideNavType} from "../interfaces";
import {Badge} from "@mui/icons-material";

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
        ]
    }
];
