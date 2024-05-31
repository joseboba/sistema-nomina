import {Paging, Item, SuspensionInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";
import moment from "moment";


const initialState: SuspensionInterface  = {
    ausCodigo: 0,
    tauCodigo: 0,
    epuCodigo: 0,
    ausFechaSalida: moment(),
    ausFechaRegreso: moment(),
    empCodigo: 0,
    nombreEmpleado: "",
    nombreTipoAusencia: "",
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

export const suspensionSlice = createSlice({
    name: 'suspension',
    initialState,
    reducers: {
        setPageResultSuspension: (state, {payload}: PayloadAction<Paging<SuspensionInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'ausCodigo',
                itemPrimaryTextKey: 'empCodigo',
                itemSecondaryTextKey: 'nombreEmpleado',
            });
        },
        clearDataSuspension: (state) => {
            state.ausCodigo = 0;
            state.epuCodigo = 0;
            state.tauCodigo = 0;
            state.ausFechaSalida = moment();
            state.ausFechaRegreso = moment();
        },
        setSuspension: (state, {payload}: PayloadAction<SuspensionInterface>) => {
            console.log(payload);
            state.ausCodigo = payload.ausCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.tauCodigo = payload.tauCodigo;
            state.ausFechaSalida = moment(payload.ausFechaSalida, "DD-MM-YYYY");
            state.ausFechaRegreso = moment(payload.ausFechaRegreso, "DD-MM-YYYY");
        },
        setParamsSuspension: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    clearDataSuspension,
    setSuspension,
    setPageResultSuspension,
    setParamsSuspension
} = suspensionSlice.actions;


