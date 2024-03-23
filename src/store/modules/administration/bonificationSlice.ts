import {Paging, Item, BonificationInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: BonificationInterface  = {
    bonCodigo: 0,
    bonNombre: '',
    bonDescripcion: '',
    bonMonto: 0,
    bonPorcentaje: 0,
    bonEstado: '',
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

export const bonificationSlice = createSlice({
    name: 'bonification',
    initialState,
    reducers: {
        setPageResultBonification: (state, {payload}: PayloadAction<Paging<BonificationInterface>>) => {
            state.page = payload;
            const items: Item[] = [];
            payload.content.forEach((itemContent) => {
               const item: Item = {
                   itemCode: itemContent.bonCodigo!,
                   itemPrimaryText: itemContent.bonCodigo?.toString()!,
                   itemSecondaryText: itemContent.bonNombre
               }
               items.push(item);
            });
            state.items = items;
        },
        cleanDataBonification: (state) => {
            state.bonCodigo = 0;
            state.bonNombre = "";
            state.bonDescripcion = "";
            state.bonMonto = 0;
            state.bonPorcentaje = 0;
            state.bonEstado = "";
        },
        setBonification: (state, {payload}: PayloadAction<BonificationInterface>) => {
            state.bonCodigo = payload.bonCodigo;
            state.bonNombre = payload.bonNombre;
            state.bonDescripcion = payload.bonDescripcion;
            state.bonMonto = payload.bonMonto;
            state.bonPorcentaje = payload.bonPorcentaje;
            state.bonEstado = payload.bonEstado;
        },
        setParamsBonification: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setPageResultBonification,
    cleanDataBonification,
    setBonification,
    setParamsBonification
} = bonificationSlice.actions;


