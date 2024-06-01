import {Paging, Item, AbsenceInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";
import moment from "moment";


const initialState: AbsenceInterface  = {
    ausCodigo: 0,
    tauCodigo: 0,
    tdsCodigo: 0,
    epuCodigo: 0,
    ausFechaSalida: moment(),
    ausFechaRegreso: moment(),
    empCodigo: 0,
    nombreEmpleado: "",
    nombreTipoAusencia: "",
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

export const absenceSlice = createSlice({
    name: 'absence',
    initialState,
    reducers: {
        setPageResultAbsence: (state, {payload}: PayloadAction<Paging<AbsenceInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'ausCodigo',
                itemPrimaryTextKey: 'empCodigo',
                itemSecondaryTextKey: 'nombreEmpleado',
            });
        },
        clearDataAbsence: (state) => {
            state.ausCodigo = 0;
            state.epuCodigo = 0;
            state.tdsCodigo = 0;
            state.tauCodigo = 0;
            state.ausFechaSalida = moment();
            state.ausFechaRegreso = moment();
        },
        setAbsence: (state, {payload}: PayloadAction<AbsenceInterface>) => {
            console.log(payload);
            state.ausCodigo = payload.ausCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.tdsCodigo = payload.tdsCodigo;
            state.tauCodigo = payload.tauCodigo;
            state.ausFechaSalida = moment(payload.ausFechaSalida, "DD-MM-YYYY");
            state.ausFechaRegreso = moment(payload.ausFechaRegreso, "DD-MM-YYYY");
        },
        setParamsAbsence: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    clearDataAbsence,
    setAbsence,
    setPageResultAbsence,
    setParamsAbsence
} = absenceSlice.actions;


