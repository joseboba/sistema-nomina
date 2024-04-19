import {Paging, AbsenceTypeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";

const initialState: AbsenceTypeInterface = {
    tauCodigo: 0,
    tauNombre: '',
    tauDescripcion: '',
    tauGoceSalario: 0,
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


export const absenceTypeSlice = createSlice({
   name: 'absenceType',
   initialState,
   reducers: {
       setAbsenceTypePageResult: (state, {payload}: PayloadAction<Paging<AbsenceTypeInterface>>) => {
           state.page = payload;
           state.items = Utilities.generateItems(payload.content, {
              itemCodeKey: 'tauCodigo',
              itemPrimaryTextKey: 'tauNombre',
              itemSecondaryTextKey: 'tauDescripcion'
           });
       },
       cleanAbsenceTypeData: (state) => {
           state.tauCodigo = 0;
           state.tauNombre = '';
           state.tauDescripcion = '';
           state.tauGoceSalario = 0;
       },
       setAbsenceType: (state, {payload}: PayloadAction<AbsenceTypeInterface>) => {
         state.tauCodigo = payload.tauCodigo;
         state.tauNombre = payload.tauNombre;
         state.tauDescripcion = payload.tauDescripcion;
         state.tauGoceSalario = payload.tauGoceSalario;
       },
       setAbsenceTypeParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
           state.params.search = payload.search;
           state.params.page = payload.page;
       }
   }
});

export const {
    setAbsenceTypePageResult,
    cleanAbsenceTypeData,
    setAbsenceType,
    setAbsenceTypeParams
} = absenceTypeSlice.actions;