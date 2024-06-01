import {Paging, Item, SuspensionInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";
import moment from "moment";


const initialState: SuspensionInterface  = {
    susCodigo: 0,
    tsuCodigo: 0,
    tdsCodigo: 0,
    epuCodigo: 0,
    susFechaSalida: moment(),
    susFechaRegreso: moment(),
    susMotivo:"",
    empCodigo: 0,
    nombreEmpleado: "",
    nombreTipoSuspension: "",
    nombreTipoDescuento: "",
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
                itemCodeKey: 'susCodigo',
                itemPrimaryTextKey: 'empCodigo',
                itemSecondaryTextKey: 'nombreEmpleado',
            });
        },
        clearDataSuspension: (state) => {
            state.susCodigo = 0;
            state.epuCodigo = 0;
            state.tsuCodigo = 0;
            state.tdsCodigo = 0;
            state.susFechaSalida = moment();
            state.susFechaRegreso = moment();
            state.susMotivo = ""
        },
        setSuspension: (state, {payload}: PayloadAction<SuspensionInterface>) => {
            console.log(payload);
            state.susCodigo = payload.susCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.tsuCodigo = payload.tsuCodigo;
            state.tdsCodigo = payload.tdsCodigo;
            state.susFechaSalida = moment(payload.susFechaSalida, "DD-MM-YYYY");
            state.susFechaRegreso = moment(payload.susFechaRegreso, "DD-MM-YYYY");
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


