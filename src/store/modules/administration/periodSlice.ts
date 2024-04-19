import {Paging, PeriodInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";
import moment from "moment";

const initialState: PeriodInterface = {
    perCodigo: 0,
    perNombre: '',
    perFechaInicio: moment(),
    perFechaFinal: moment(),
    perFechaPago: moment(),
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


export const periodSlice = createSlice({
   name: 'period',
   initialState,
   reducers: {
       setPeriodPageResult: (state, {payload}: PayloadAction<Paging<PeriodInterface>>) => {
           state.page = payload;
           state.items = Utilities.generateItems(payload.content, {
              itemCodeKey: 'perCodigo',
              itemPrimaryTextKey: 'perNombre',
              itemSecondaryTextKey: 'perCodigo'
           });
       },
       cleanPeriodData: (state) => {
           state.perCodigo = 0;
           state.perNombre = '';
           state.perFechaInicio = moment();
           state.perFechaFinal = moment();
           state.perFechaPago = moment();
       },
       setPeriod: (state, {payload}: PayloadAction<PeriodInterface>) => {
         state.perCodigo = payload.perCodigo;
         state.perNombre = payload.perNombre;
         state.perFechaInicio = moment( payload.perFechaInicio,"DD-MM-YYYY");
         state.perFechaFinal = moment( payload.perFechaFinal,"DD-MM-YYYY");
         state.perFechaPago = moment( payload.perFechaPago,"DD-MM-YYYY");
       },
       setPeriodParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
           state.params.search = payload.search;
           state.params.page = payload.page;
       }
   }
});

export const {
    setPeriodPageResult,
    cleanPeriodData,
    setPeriod,
    setPeriodParams
} = periodSlice.actions;