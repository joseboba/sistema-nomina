import {SvgIconComponent} from "@mui/icons-material";
import {LazyExoticComponent, ReactElement} from "react";
import { Moment } from "moment";

export type SideNavType = SideNavGroupInterface[]

export interface SideNavGroupInterface {
    moduleName: string;
    items: SidNavItemInterface[]
}

export interface SidNavItemInterface {
    to: string;
    name: string;
    NavIcon: SvgIconComponent;
}

export interface ModuleRoute {
    path: string;
    Component: () => ReactElement | Element;
}

export interface Module {
    to: string;
    path: string;
    Module: LazyExoticComponent<() => ReactElement>
}

export interface Paging<T> {
    hasNext: boolean;
    hasPrevious: boolean;
    totalPageCount: number;
    totalItemCount: number;
    content: T[];
    currentPage: number;
    pageSize: number;
}

export interface DepartmentInterface {
    depCodigo: number | null;
    depNombre: string;
    depDescripcion: string;
    page: Paging<DepartmentInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface EmployeeInterface {
    empCodigo: number | null;
    empCUI: string;
    empNIT: string;
    empPrimerNombre: string;
    empSegundoNombre: string;
    empTercerNombre: string | null;
    empPrimerApellido: string;
    empSegundoApellido: string;
    empApellidoCasada: string | null;
    empFechaNacimiento: Moment | string;
    empProfesion: string;
    empTelefono: string;
    empCorreo: string;
    empCodigoIGSS: string;
    empEncargado: number | null;
    empFechaInicio: Moment | string;
    empNumeroCuenta: string;
    banCodigo: number | null;
    tcuCodigo: number | null;
    epuCodigo: number | null;
    pueCodigo: number | null;
    tmoCodigo: number | null;
    epuFechaInicio: Moment | string;
    epuFechaFinal: Moment | string;
    epuSalario: number;
    epuEstado: number;
    page: Paging<EmployeeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface PositionInterface {
    pueCodigo: number | null;
    depCodigo: number | null;
    pueNombre: string;
    pueDescripcion: string;
    pueEstado: number;
    page: Paging<PositionInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface PeriodInterface {
    perCodigo: number | null;
    perNombre: string;
    perFechaInicio: Moment | string;
    perFechaFinal: Moment | string;
    perFechaPago: Moment | string;
    page: Paging<PeriodInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface AbsenceTypeInterface {
    tauCodigo: number | null;
    tauNombre: string;
    tauDescripcion: string;
    tauGoceSalario: number;
    page: Paging<AbsenceTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface EmployeeBonusNoAssociated {
    bonCodigo:      number;
    bonNombre:      string;
    bonDescripcion: string;
    bonMonto:       number;
    bonPorcentaje:  number;
    bonEstado:      number;
}

export interface EmployeeBonusAssociated {
    empCodigo:             number;
    epuCodigo:             number;
    empBonificacionCodigo: number;
    eboEstado:             number;
    bonCodigo:             number;
    bonNombre:             string;
    bonDescripcion:        string;
    bonMonto:              number;
    bonPorcentaje:         number;
    bonEstado:             number;
}

export interface EmployeeBonusInterface {
    empCodigo: number;
    bonCodigo: number | null;
    empPrimerNombre: string;
    empSegundoNombre: string;
    page: Paging<EmployeeInterface> | null;
    items: Item[];
    bonusNoAssociated: EmployeeBonusNoAssociated[];
    bonusAssociated: EmployeeBonusAssociated[];
    params: {
        search: string;
        page: number;
    }
}

export interface EmployeeDiscountNoAssociated {
    tdeCodigo:      number;
    tdeNombre:      string;
    tdeDescripcion: string;
    tdeMonto:       number;
    tdePorcentaje:  number;
    tdeEstado:      number;
}

export interface EmployeeDiscountAssociated {
    empCodigo:      number;
    epuCodigo:      number;
    demCodigo:      number;
    demEstado:      number;
    tdeCodigo:      number;
    tdeNombre:      string;
    tdeDescripcion: string;
    tdeMonto:       number;
    tdePorcentaje:  number;
    tdeEstado:      number;
}


export interface EmployeeDiscountInterface {
    empCodigo: number;
    tdeCodigo: number | null;
    empPrimerNombre: string;
    empSegundoNombre: string;
    page: Paging<EmployeeInterface> | null;
    items: Item[];
    discountAssociated: EmployeeDiscountAssociated[];
    discountNoAssociated: EmployeeDiscountNoAssociated[];
    params: {
        search: string;
        page: number;
    }
}

export interface DiscountTypeInterface {
    tdsCodigo: number | null;
    tdsNombre: string;
    tdsDescripcion: string;
    tdsMonto: number;
    tdsPorcentaje: number;
    tdsEstado: number;
    page: Paging<DiscountTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface CurrencyTypeInterface {
    tmoCodigo: number | null;
    tmoNombre: string;
    tmoSimbolo: string;
    tmoTasaCambio: number;
    tmoEstado: number;
    page: Paging<CurrencyTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}

export interface BankInterface {
    banCodigo: number | null;
    banNombre: string;
}

export interface AccountTypeInterface {
    tcuCodigo: number | null;
    tcuNombre: string;
}

export interface Item {
    itemCode: string | number;
    itemPrimaryText: string;
    itemSecondaryText: string;
    deleteAction?: () => void;
}

export interface ListComponentProps {
    searchLabel?: string;
    searchPlaceholder?: string;
    totalPageCount: number | undefined;
    hasNext: boolean;
    hasPrevious: boolean;
    useDelete: boolean;
    onSelectItem: (code: string | number) => void;
    onDeleteItem: (code: string | number) => void;
    onChangeSearch: (search: string) => void;
    onChangePage: (page: number, search: string) => void;
    items: Item[]
}
