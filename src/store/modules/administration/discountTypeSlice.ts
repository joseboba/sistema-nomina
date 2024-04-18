import {DiscountTypeInterface, Paging, Item} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";


const initialState: DiscountTypeInterface = {
    tdsCodigo: 0,
    tdsNombre: '',
    tdsDescripcion: '',
    tdsMonto: 0,
    tdsPorcentaje: 0,
    tdsEstado: 0,
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

export const discountTypeSlice = createSlice({
    name: 'discountType',
    initialState,
    reducers: {
        setDiscountTypePageResult: (state, {payload}: PayloadAction<Paging<DiscountTypeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'tdsCodigo',
                itemPrimaryTextKey: 'tdsNombre',
                itemSecondaryTextKey: 'tdsDescripcion'
            });
        },
        cleanDiscountTypeData: (state) => {
            state.tdsCodigo = 0;
            state.tdsNombre = '';
            state.tdsDescripcion = '';
            state.tdsMonto = 0;
            state.tdsPorcentaje = 0;
            state.tdsEstado = 0;
        },
        setDiscountType: (state, {payload}: PayloadAction<DiscountTypeInterface>) => {
            state.tdsCodigo = payload.tdsCodigo;
            state.tdsNombre = payload.tdsNombre;
            state.tdsDescripcion = payload.tdsDescripcion;
            state.tdsMonto = payload.tdsMonto;
            state.tdsPorcentaje = payload.tdsPorcentaje;
            state.tdsEstado = payload.tdsEstado;
        },
        setDiscountTypeParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setDiscountTypePageResult,
    cleanDiscountTypeData,
    setDiscountType,
    setDiscountTypeParams
} = discountTypeSlice.actions;


