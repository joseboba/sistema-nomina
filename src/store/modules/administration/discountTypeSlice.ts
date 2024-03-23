import {DiscountTypeInterface, Paging} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";


const initialState: DiscountTypeInterface = {
    tdeCodigo: 0,
    tdeNombre: '',
    tdeDescripcion: '',
    tdeMonto: 0,
    tdeEstado: false,
    tdePorcentaje: 0,
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
        setPageResult: (state, {payload}: PayloadAction<Paging<DiscountTypeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'tdeCodigo',
                itemPrimaryTextKey: 'tdeNombre',
                itemSecondaryTextKey: 'tdeDescripcion'
            });
        },
        cleanData: (state) => {
            state.tdeCodigo = 0;
            state.tdeNombre = ''
            state.tdeDescripcion = '';
            state.tdeEstado = false;
            state.tdeMonto = 0;
            state.tdePorcentaje = 0;
        },
        setDiscountType: (state, {payload}: PayloadAction<DiscountTypeInterface>) => {
            state.tdeCodigo = payload.tdeCodigo;
            state.tdeNombre = payload.tdeNombre;
            state.tdeDescripcion = payload.tdeDescripcion;
            state.tdeEstado = payload.tdeEstado;
            state.tdePorcentaje = payload.tdePorcentaje;
            state.tdeMonto = payload.tdeMonto;
        },
        setParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setPageResult,
    cleanData,
    setDiscountType,
    setParams
} = discountTypeSlice.actions;


