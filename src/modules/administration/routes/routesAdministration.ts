import {SidNavItemInterface} from "../../../interfaces";
import {ADMIN_BASE_PATH} from "../../../util";


export const routesAdministration: SidNavItemInterface[] = [
    {
        path: 'department',
        to: `${ADMIN_BASE_PATH}/department`
    }
];
