import {SideNavType} from "../interfaces";
import {
    Badge,
    CalendarMonth,
    CurrencyExchange,
    Discount,
    HourglassTop,
    Paid,
    ReceiptLong,
    Sick,
    Work,
    CardGiftcard,
    CreditCardOff, Schedule, Money, FoodBank
} from "@mui/icons-material";

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
            {
                to: `${ADMIN_BASE_PATH}/suspension-type`,
                name: "Tipos de suspensión",
                NavIcon: Sick
            },
            {
                to: `${ADMIN_BASE_PATH}/other-income`,
                name: "Otro ingreso",
                NavIcon: Paid
            },
            {
                to: `${ADMIN_BASE_PATH}/period`,
                name: "Periodos",
                NavIcon: CalendarMonth
            },
            {
                to: `${ADMIN_BASE_PATH}/absenceType`,
                name: "Tipos de ausencias",
                NavIcon: HourglassTop
            },
            {
                to: `${ADMIN_BASE_PATH}/deductionType`,
                name: "Tipos de deducciones",
                NavIcon: Discount
            },
            {
                to: `${ADMIN_BASE_PATH}/currencyType`,
                name: "Tipos de moneda",
                NavIcon: CurrencyExchange
            },
            {
                to: `${ADMIN_BASE_PATH}/benefitType`,
                name: "Tipos de prestaciones",
                NavIcon: Discount
            },
            {
                to: `${ADMIN_BASE_PATH}/employee`,
                name: "Empleado",
                NavIcon: Badge
            },
            {
                to: `${ADMIN_BASE_PATH}/employee-bonification`,
                name: 'Empleado Bonificación',
                NavIcon: CardGiftcard
            },
            {
                to: `${ADMIN_BASE_PATH}/employee-discount`,
                name: 'Empleado Deducción',
                NavIcon: CreditCardOff
            },
            {
                to: `${ADMIN_BASE_PATH}/extra-hours`,
                name: 'Carga de horas extra',
                NavIcon: Schedule
            },
            {
                to: `${ADMIN_BASE_PATH}/hours`,
                name: 'Registro de Horas',
                NavIcon: Schedule
            },
            {
                to: `${ADMIN_BASE_PATH}/loan`,
                name: 'Carga de prestamo',
                NavIcon: Money
            },
            {
                to: `${ADMIN_BASE_PATH}/production`,
                name: 'Carga de producción',
                NavIcon: Money
            },
            {
                to: `${ADMIN_BASE_PATH}/sale`,
                name: 'Carga de venta',
                NavIcon: Money
            },
            {
                to: `${ADMIN_BASE_PATH}/absence`,
                name: 'Ausencias',
                NavIcon: Discount
            },
            {
                to: `${ADMIN_BASE_PATH}/suspension`,
                name: 'Suspensiones',
                NavIcon: Discount
            },
            {
                to: `${ADMIN_BASE_PATH}/bank-csv`,
                name: 'Reporte de banco',
                NavIcon: FoodBank
            },
            {
                to: `${ADMIN_BASE_PATH}/extra-hour-pdf`,
                name: 'Reporte de horas extra',
                NavIcon: FoodBank
            },
            {
                to: `${ADMIN_BASE_PATH}/nomina-pdf`,
                name: 'Reporte de nomina',
                NavIcon: FoodBank
            },
            {
                to: `${ADMIN_BASE_PATH}/pago-nomina`,
                name: 'Pago Nomina',
                NavIcon: FoodBank
            },
            {
                to: `${ADMIN_BASE_PATH}/voucher-pdf`,
                name: 'Reporte de Recibo de Empleados',
                NavIcon: FoodBank
            }
        ]
    }
];
