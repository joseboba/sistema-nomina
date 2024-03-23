import {SideNavType} from "../interfaces";
import {ReceiptLong } from "@mui/icons-material";


export const ADMIN_BASE_PATH = '/admin';


export const NAVBAR_ROUTES: SideNavType = [
    {
        moduleName: 'Catalogos',
        items: [
            // {
            //     to: `${ADMIN_BASE_PATH}/employee`,
            //     name: 'Empleado',
            //     NavIcon: Engineering
            // },
            {
                to: `${ADMIN_BASE_PATH}/bonification`,
                name: 'Bonificacion',
                NavIcon: ReceiptLong 
            }
        ]
    }
];
