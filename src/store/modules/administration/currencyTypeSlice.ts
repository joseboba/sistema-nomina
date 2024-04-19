import {Paging, CurrencyTypeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";

const initialState: CurrencyTypeInterface = {
    tmoCodigo: 0,
    tmoNombre: '',
    tmoSimbolo: '',
    tmoTasaCambio: 0,
    tmoEstado: 0,
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


export const currencyTypeSlice = createSlice({
   name: 'currencyType',
   initialState,
   reducers: {
       setCurrencyTypePageResult: (state, {payload}: PayloadAction<Paging<CurrencyTypeInterface>>) => {
           state.page = payload;
           state.items = Utilities.generateItems(payload.content, {
              itemCodeKey: 'tmoCodigo',
              itemPrimaryTextKey: 'tmoNombre',
              itemSecondaryTextKey: 'tmoSimbolo'
           });
       },
       cleanCurrencyTypeData: (state) => {
           state.tmoCodigo = 0;
           state.tmoNombre = '';
           state.tmoSimbolo = '';
           state.tmoTasaCambio = 0;
           state.tmoEstado = 0;
       },
       setCurrencyType: (state, {payload}: PayloadAction<CurrencyTypeInterface>) => {
         state.tmoCodigo = payload.tmoCodigo;
         state.tmoNombre = payload.tmoNombre;
         state.tmoSimbolo = payload.tmoSimbolo;
         state.tmoTasaCambio = payload.tmoTasaCambio;
         state.tmoEstado = payload.tmoEstado;
       },
       setCurrencyTypeParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
           state.params.search = payload.search;
           state.params.page = payload.page;
       }
   }
});

export const {
    setCurrencyTypePageResult,
    cleanCurrencyTypeData,
    setCurrencyType,
    setCurrencyTypeParams
} = currencyTypeSlice.actions;