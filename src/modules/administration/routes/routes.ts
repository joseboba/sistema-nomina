import {LogPage, EmployeePage, BonificacionPage} from "../pages";


export const routes = [
    {
        path: 'employee',
        to: 'employee',
        Component: EmployeePage,
        name: 'Empleado'
    },
    {
        path: 'log',
        to: 'log',
        Component: LogPage,
        name: 'LogPage'
    },
    {
        path: 'bonification',
        to: 'bonification',
        Component: BonificacionPage,
        name: 'LogPage'
    }
];

