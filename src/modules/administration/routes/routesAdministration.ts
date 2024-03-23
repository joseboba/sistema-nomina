import {SidNavItemInterface} from "../../../interfaces";
import {ADMIN_BASE_PATH} from "../../../util";
import {DepartmentPage} from "../pages";


export const routesAdministration: SidNavItemInterface[] = [
    {
        path: 'department',
        to: `${ADMIN_BASE_PATH}/department`,
        Component: DepartmentPage
    }
];
