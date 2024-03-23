import {SvgIconComponent} from "@mui/icons-material";
import {ReactElement} from "react";

export type SideNavType = SideNavGroupInterface[]

export interface SideNavGroupInterface {
    moduleName: string;
    items: SidNavItemInterface[]
}

export interface SidNavItemInterface {
    path: string;
    to: string;
    name?: string;
    Component?: () => ReactElement | Element;
    NavIcon?: SvgIconComponent;
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
    onSelectItem: (code: string | number) => void;
    onDeleteItem: (code: string | number) => void;
    onChangeSearch: (search: string) => void;
    onChangePage: (page: number, search: string) => void;
    items: Item[]
}