import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    EmployeeBonusInterface,
    EmployeeDiscountAssociated,
    EmployeeDiscountInterface, EmployeeDiscountNoAssociated,
    EmployeeInterface,
    Paging
} from "../../../interfaces";
import {Utilities} from "../../../util";

const initialState: EmployeeDiscountInterface = {
    empCodigo: 0,
    tdeCodigo: 0,
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
    discountNoAssociated: [{
        tdeCodigo:      0,
        tdeNombre:      'Selecciona una deducción',
        tdeDescripcion: '',
        tdeMonto:       0,
        tdePorcentaje:  0,
        tdeEstado:      0,
    }],
    discountAssociated: [],
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
            state.discountNoAssociated = [{
                tdeCodigo:      0,
                tdeNombre:      'Selecciona una deducción',
                tdeDescripcion: '',
                tdeMonto:       0,
                tdePorcentaje:  0,
                tdeEstado:      0,
            }];
            state.discountAssociated = [];
        },
        setEmployeeDiscount: (state, {payload}: PayloadAction<EmployeeDiscountInterface>) => {
            state.empCodigo = payload.empCodigo;
            state.tdeCodigo = payload.tdeCodigo;
            state.empPrimerNombre = payload.empPrimerNombre;
            state.empSegundoNombre = payload.empSegundoNombre;
        },
        setEmployeeDiscountParams: (state, {payload}: PayloadAction<{ search: string, page: number }>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        },
        setDiscountNoAssociated: (state, {payload}: PayloadAction<EmployeeDiscountNoAssociated[]>) => {
          state.discountNoAssociated = payload;
        },
        setDiscountAssociated: (state, {payload}: PayloadAction<EmployeeDiscountAssociated[]>) => {
            state.discountAssociated = payload;
        }
    }
});


export const {
    setEmployeeDiscountPage,
    cleanEmployeeDiscount,
    setEmployeeDiscount,
    setEmployeeDiscountParams,
    setDiscountNoAssociated,
    setDiscountAssociated
} = employeeDiscountSlice.actions;
