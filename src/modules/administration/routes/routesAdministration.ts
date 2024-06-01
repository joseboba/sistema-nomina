import {ModuleRoute} from "../../../interfaces";
import {
    AbsenceTypePage,
    BenefitTypePage,
    BonificacionPage,
    CurrencyTypePage,
    DeductionTypePage,
    DepartmentPage,
    DiscountTypePage,
    EmployeeBonusPage,
    EmployeeDiscountPage,
    EmployeePage, LoanUploadPage,
    OtherIncomePage,
    PeriodPage,
    PositionPage,
    SuspensionTypesPage,
    HoursPage,
    ExtraHourUploadPage,
    ProductionUploadPage,
    SaleUploadPage,
    AbsencePage,
    SuspensionPage,
    BankCsvPage,
    NominaPdfPage,
    PagoNominaPage
} from "../pages";
import {ExtraHourPdfPage} from "../pages/ExtraHourPdfPage.tsx";
import {VoucherPdfPage} from "../pages/VoucherPdfPage.tsx";


export const routesAdministration: ModuleRoute[] = [
    {
        path: 'department',
        Component: DepartmentPage
    },
    {
        path: 'position',
        Component: PositionPage
    },
    {
        path: 'bonification',
        Component: BonificacionPage,
    },
    {
        path: 'suspension-type',
        Component: SuspensionTypesPage
    },
    {
        path: 'other-income',
        Component: OtherIncomePage
    },
    {
        path: 'period',
        Component: PeriodPage
    },
    {
        path: 'absenceType',
        Component: AbsenceTypePage
    },
    {
        path: 'deductionType',
        Component: DeductionTypePage
    },
    {
        path: 'absenceType',
        Component: AbsenceTypePage
    },
    {
        path: 'benefitType',
        Component: BenefitTypePage
    },
    {
        path: 'currencyType',
        Component: CurrencyTypePage
    },
    {
        path: 'employee',
        Component: EmployeePage
    },
    {
        path: 'employee-bonification',
        Component: EmployeeBonusPage
    },
    {
        path: 'discountType',
        Component: DiscountTypePage
    },
    {
        path: 'employee-discount',
        Component: EmployeeDiscountPage
    },
    {
        path: 'extra-hours',
        Component: ExtraHourUploadPage
    },
    {
        path: 'loan',
        Component: LoanUploadPage
    },
    {
        path: 'hours',
        Component: HoursPage
    },
    {
        path: 'production',
        Component: ProductionUploadPage
    },
    {
        path: 'sale',
        Component: SaleUploadPage
    },
    {
        path: 'absence',
        Component: AbsencePage
    },
    {
        path: 'suspension',
        Component: SuspensionPage
    },
    {
        path: 'bank-csv',
        Component: BankCsvPage
    },
    {
        path: 'extra-hour-pdf',
        Component: ExtraHourPdfPage
    },
    {
        path: 'nomina-pdf',
        Component: NominaPdfPage
    },
    {
        path: 'pago-nomina',
        Component: PagoNominaPage
    },
    {
        path: 'voucher-pdf',
        Component: VoucherPdfPage
    }
];
