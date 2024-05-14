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
    CreditCardOff, Schedule
} from "@mui/icons-material";
import {ExtraHoursPage} from "../modules/administration/pages/ExtraHoursPage.tsx";

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
                to: `${ADMIN_BASE_PATH}/discountType`,
                name: "Tipos de descuentos",
                NavIcon: Discount
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
                name: 'Empleado Descuento',
                NavIcon: CreditCardOff
            },
            {
                to: `${ADMIN_BASE_PATH}/extra-hours`,
                name: 'Carga de horas extra',
                NavIcon: Schedule
            }
        ]
    }
];
