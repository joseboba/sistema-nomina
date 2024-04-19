import {Paging, Item, SuspensionTypeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";


const initialState: SuspensionTypeInterface  = {
    tsuCodigo: 0,
    tsuNombre: '',
    tsuDescripcion: '',
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

export const suspensionTypesSlice = createSlice({
    name: 'suspensionTypes',
    initialState,
    reducers: {
        setPageResultSuspensionTypes: (state, {payload}: PayloadAction<Paging<SuspensionTypeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'tsuCodigo',
                itemPrimaryTextKey: 'tsuNombre',
                itemSecondaryTextKey: 'tsuCodigo'
            });
        },
        clearSuspensionTypeData: (state) => {
            state.tsuCodigo = 0;
            state.tsuNombre = "";
            state.tsuDescripcion = "";
        },
        setSuspensionType: (state, {payload}: PayloadAction<SuspensionTypeInterface>) => {
            state.tsuCodigo = payload.tsuCodigo;
            state.tsuNombre = payload.tsuNombre;
            state.tsuDescripcion = payload.tsuDescripcion;
        },
        setSuspensionTypesParameters: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setPageResultSuspensionTypes,
    clearSuspensionTypeData,
    setSuspensionType,
    setSuspensionTypesParameters
} = suspensionTypesSlice.actions;


