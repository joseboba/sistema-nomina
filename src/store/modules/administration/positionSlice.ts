import {Paging, PositionInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";


const initialState: PositionInterface = {
    pueCodigo: 0,
    depCodigo: 0,
    pueNombre: '',
    pueDescripcion: '',
    pueEstado: 1,
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


export const positionSlice = createSlice({
   name: 'position',
   initialState,
   reducers: {
       setPositionPageResult: (state, {payload}: PayloadAction<Paging<PositionInterface>>) => {
           state.page = payload;
           state.items = Utilities.generateItems(payload.content, {
              itemCodeKey: 'pueCodigo',
              itemPrimaryTextKey: 'pueNombre',
              itemSecondaryTextKey: 'pueCodigo'
           });
       },
       cleanPositionData: (state) => {
           state.pueCodigo = 0;
           state.depCodigo = 0;
           state.pueNombre = '';
           state.pueDescripcion = '';
           state.pueEstado = 1;
       },
       setPosition: (state, {payload}: PayloadAction<PositionInterface>) => {
         state.pueCodigo = payload.pueCodigo;
         state.depCodigo = payload.depCodigo;
         state.pueNombre = payload.pueNombre;
         state.pueDescripcion = payload.pueDescripcion;
         state.pueEstado = payload.pueEstado;
       },
       setPositionParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
           state.params.search = payload.search;
           state.params.page = payload.page;
       }
   }
});

export const {
    setPositionPageResult,
    cleanPositionData,
    setPosition,
    setPositionParams
} = positionSlice.actions;