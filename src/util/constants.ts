import {SideNavType} from "../interfaces";
import {routesAdministration} from "../modules/administration/routes/routesAdministration.ts";


export const NAVBAR_ROUTES: SideNavType = [
    {
        moduleName: 'Catalogos',
        items: routesAdministration
    }
];
