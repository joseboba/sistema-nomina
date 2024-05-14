import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EmployeeBonusInterface, EmployeeDiscountInterface, EmployeeInterface, Paging} from "../../../interfaces";
import {Utilities} from "../../../util";

const initialState: EmployeeDiscountInterface = {
    empCodigo: 0,
    tdsCodigo: 0,
    empPrimerNombre: '',
    empSegundoNombre: '',
    page: {
        hasNext: false,
        hasPrevious: false,
        totalPageCount: 0,
        totalItemCount: 0,
        content: [],
        currentPage: 0,
        pageSize: 0
    },
    items: [],
    params: {
        search: '',
        page: 0
    }
}

export const employeeDiscountSlice = createSlice({
    name: 'employeeDiscount',
    initialState,
    reducers: {
        setEmployeeDiscountPage: (state, {payload}: PayloadAction<Paging<EmployeeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'empCodigo',
                itemPrimaryTextKey: 'empPrimerNombre',
                itemSecondaryTextKey: 'empCodigo'
            });
        },
        cleanEmployeeDiscount: (state) => {
            state.empCodigo = 0;
            state.tdsCodigo = 0;
            state.empPrimerNombre = '';
            state.empSegundoNombre = '';
        },
        setEmployeeDiscount: (state, {payload}: PayloadAction<EmployeeBonusInterface>) => {
            state.empCodigo = payload.empCodigo;
            state.tdsCodigo = payload.bonCodigo;
            state.empPrimerNombre = payload.empPrimerNombre;
            state.empSegundoNombre = payload.empSegundoNombre;
        },
        setEmployeeDiscountParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setEmployeeDiscountPage,
    cleanEmployeeDiscount,
    setEmployeeDiscount,
    setEmployeeDiscountParams
} = employeeDiscountSlice.actions;
