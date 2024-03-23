import {SidNavItemInterface} from "../../../interfaces";
import {ADMIN_BASE_PATH} from "../../../util";
import {DepartmentPage} from "../pages";
import { DiscountTypePage } from "../pages/DiscountTypePage";


export const routesAdministration: SidNavItemInterface[] = [
    {
        path: 'department',
        to: `${ADMIN_BASE_PATH}/department`,
        Component: DepartmentPage
    },
    {
        path: 'discountType',
        to: `${ADMIN_BASE_PATH}/discountType`,
        Component: DiscountTypePage
    }
];
