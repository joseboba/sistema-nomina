import { Paging, Item, DeductionTypeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";


const initialState: DeductionTypeInterface  = {
    tdeCodigo: 0,
    tdeNombre: '',
    tdeDescripcion: '',
    tdeMonto: 0,
    tdePorcentaje: 0,
    tdeEstado: 1,
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

export const deductionTypeSlice = createSlice({
    name: 'deductionType',
    initialState,
    reducers: {
        setPageResultDeductionType: (state, { payload }: PayloadAction<Paging<DeductionTypeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'tdeCodigo',
                itemPrimaryTextKey: 'tdeNombre',
                itemSecondaryTextKey: 'tdeCodigo'
            });
        },
        clearDataDeductionType: (state) => {
            state.tdeCodigo = 0;
            state.tdeNombre = "";
            state.tdeDescripcion = "";
            state.tdeMonto = 0;
            state.tdePorcentaje = 0;
            state.tdeEstado = 1;
        },
        setDeductionType: (state, { payload }: PayloadAction<DeductionTypeInterface>) => {
            state.tdeCodigo = payload.tdeCodigo;
            state.tdeNombre = payload.tdeNombre;
            state.tdeDescripcion = payload.tdeDescripcion;
            state.tdeMonto = payload.tdeMonto;
            state.tdePorcentaje = payload.tdePorcentaje;
            state.tdeEstado = payload.tdeEstado;
        },
        setParamsDeductionType: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setPageResultDeductionType,
    clearDataDeductionType,
    setDeductionType,
    setParamsDeductionType
} = deductionTypeSlice.actions;


