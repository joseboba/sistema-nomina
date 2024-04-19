import {Paging, Item, OtherIncomeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util/utilities.ts";
import moment from "moment";


const initialState: OtherIncomeInterface  = {
    oinCodigo: 0,
    epuCodigo: 0,
    oinMonto: 0,
    oinFecha: moment(),
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

export const otherIncomeSlice = createSlice({
    name: 'otherIncome',
    initialState,
    reducers: {
        setPageResultOtherIncome: (state, {payload}: PayloadAction<Paging<OtherIncomeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'oinCodigo',
                itemPrimaryTextKey: 'oinCodigo',
                itemSecondaryTextKey: 'oinMonto',
            });
        },
        clearDataOtherIncome: (state) => {
            state.oinCodigo = 0;
            state.epuCodigo = 0;
            state.oinMonto = 0;
            state.oinFecha = moment();
        },
        setOtherIncome: (state, {payload}: PayloadAction<OtherIncomeInterface>) => {
            console.log(payload);
            state.oinCodigo = payload.oinCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.oinMonto = payload.oinMonto;
            state.oinFecha = moment( payload.oinFecha,"DD-MM-YYYY");
        },
        setParamsOtherIncome: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setPageResultOtherIncome,
    clearDataOtherIncome,
    setOtherIncome,
    setParamsOtherIncome
} = otherIncomeSlice.actions;


