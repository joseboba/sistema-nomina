import {Paging, EmployeeInterface} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";
import moment from "moment";

const initialState: EmployeeInterface = {
    empCodigo: 0,
    empCUI: '',
    empNIT: '',
    empPrimerNombre: '',
    empSegundoNombre: '',
    empTercerNombre: '',
    empPrimerApellido: '',
    empSegundoApellido: '',
    empApellidoCasada: '',
    empFechaNacimiento: moment(),
    empProfesion: '',
    empTelefono: '',
    empCorreo: '',
    empCodigoIGSS: '',
    empEncargado: 0,
    empFechaInicio: moment(),
    empNumeroCuenta: '',
    banCodigo: 0,
    tcuCodigo: 0,
    epuCodigo: 0,
    pueCodigo: 0,
    tmoCodigo: 0,
    epuFechaInicio: moment(),
    epuFechaFinal: moment(),
    epuSalario: 0,
    epuEstado: 0,
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

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeePageResult:(state, {payload}: PayloadAction<Paging<EmployeeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'empCodigo',
                itemPrimaryTextKey: 'empPrimerNombre',
                itemSecondaryTextKey: 'empCodigo'
            });
        },
        cleanEmployeeData: (state) => {
            state.empCodigo = 0;
            state.empCUI = '';
            state.empNIT = '';
            state.empPrimerNombre = '';
            state.empSegundoNombre = '';
            state.empTercerNombre = '';
            state.empPrimerApellido = '';
            state.empSegundoApellido = '';
            state.empApellidoCasada = '';
            state.empFechaNacimiento = moment();
            state.empProfesion = '';
            state.empTelefono = '';
            state.empCorreo = '';
            state.empCodigoIGSS = '';
            state.empEncargado = 0;
            state.empFechaInicio = moment();
            state.empNumeroCuenta = '';
            state.banCodigo = 0;
            state.tcuCodigo = 0;
            state.epuCodigo = 0;
            state.pueCodigo = 0;
            state.tmoCodigo = 0;
            state.epuFechaInicio = moment();
            state.epuFechaFinal = moment();
            state.epuSalario = 0;
            state.epuEstado = 0;
        },
        setEmployee: (state, {payload}: PayloadAction<EmployeeInterface>) => {
            state.empCodigo = payload.empCodigo;
            state.empCUI = payload.empCUI;
            state.empNIT = payload.empNIT;
            state.empPrimerNombre = payload.empPrimerNombre;
            state.empSegundoNombre = payload.empSegundoNombre;
            state.empTercerNombre = payload.empTercerNombre;
            state.empPrimerApellido = payload.empPrimerApellido;
            state.empSegundoApellido = payload.empSegundoApellido;
            state.empApellidoCasada = payload.empApellidoCasada;
            state.empFechaNacimiento = moment( payload.empFechaNacimiento,"DD-MM-YYYY");
            state.empProfesion = payload.empProfesion;
            state.empTelefono = payload.empTelefono;
            state.empCorreo = payload.empCorreo;
            state.empCodigoIGSS = payload.empCodigoIGSS;
            state.empEncargado = payload.empEncargado;
            state.empFechaInicio = moment( payload.empFechaInicio,"DD-MM-YYYY");
            state.empNumeroCuenta = payload.empNumeroCuenta;
            state.banCodigo = payload.banCodigo;
            state.tcuCodigo = payload.tcuCodigo;
            state.epuCodigo = payload.epuCodigo;
            state.pueCodigo = payload.pueCodigo;
            state.tmoCodigo = payload.tmoCodigo;
            state.epuFechaInicio = moment( payload.epuFechaInicio,"DD-MM-YYYY");
            state.epuFechaFinal = moment( payload.epuFechaFinal,"DD-MM-YYYY");
            state.epuSalario = payload.epuSalario;
            state.epuEstado = payload.epuEstado;
        },
        setEmployeeParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});

export const {
    setEmployeePageResult,
    cleanEmployeeData,
    setEmployee,
    setEmployeeParams
} = employeeSlice.actions;