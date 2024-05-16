import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    EmployeeBonusAssociated,
    EmployeeBonusInterface,
    EmployeeBonusNoAssociated,
    EmployeeInterface,
    Paging
} from "../../../interfaces";
import {Utilities} from "../../../util";

const initialState: EmployeeBonusInterface = {
    empCodigo: 0,
    bonCodigo: 0,
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
    bonusNoAssociated: [{
        bonCodigo: 0,
        bonNombre: 'Seleccione una bonificación',
        bonDescripcion: '',
        bonMonto: 0,
        bonPorcentaje: 0,
        bonEstado: 0
    }],
    bonusAssociated: [],
    params: {
        search: '',
        page: 0
    }
}

export const employeeBonusSlice = createSlice({
    name: 'employeeBonus',
    initialState,
    reducers: {
        setEmployeeBonusPage: (state, {payload}: PayloadAction<Paging<EmployeeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'empCodigo',
                itemPrimaryTextKey: 'empPrimerNombre',
                itemSecondaryTextKey: 'empCodigo'
            });
        },
        cleanEmployeeBonusData: (state) => {
            state.empCodigo = 0;
            state.bonCodigo = 0;
            state.empPrimerNombre = '';
            state.empSegundoNombre = '';
            state.bonusNoAssociated = [{
                bonCodigo: 0,
                bonNombre: 'Seleccione una bonificación',
                bonDescripcion: '',
                bonMonto: 0,
                bonPorcentaje: 0,
                bonEstado: 0
            }];
            state.bonusAssociated = [];
        },
        setEmployeeBonusData: (state, {payload}: PayloadAction<EmployeeBonusInterface>) => {
            state.empCodigo = payload.empCodigo;
            state.bonCodigo = payload.bonCodigo;
            state.empPrimerNombre = payload.empPrimerNombre;
            state.empSegundoNombre = payload.empSegundoNombre;
        },
        setEmployeeBonusDataParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        },
        setBonusNoAssociated: (state, {payload}: PayloadAction<EmployeeBonusNoAssociated[]>) => {
            state.bonusNoAssociated = payload;
        },
        setBonusAssociated: (state, {payload}: PayloadAction<EmployeeBonusAssociated[]>) => {
            state.bonusAssociated = payload;
        }
    }
});


export const {
    setEmployeeBonusPage,
    cleanEmployeeBonusData,
    setEmployeeBonusData,
    setEmployeeBonusDataParams,
    setBonusNoAssociated,
    setBonusAssociated
} = employeeBonusSlice.actions;
