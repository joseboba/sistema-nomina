import {DepartmentInterface, Paging} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";


const initialState: DepartmentInterface = {
    depCodigo: 0,
    depNombre: '',
    depDescripcion: '',
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

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        setDepartmentPageResult: (state, {payload}: PayloadAction<Paging<DepartmentInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'depCodigo',
                itemPrimaryTextKey: 'depNombre',
                itemSecondaryTextKey: 'depCodigo'
            });
        },
        cleanDepartmentData: (state) => {
            state.depCodigo = 0;
            state.depNombre = '';
            state.depDescripcion = '';
        },
        setDepartment: (state, {payload}: PayloadAction<DepartmentInterface>) => {
            state.depCodigo = payload.depCodigo;
            state.depNombre = payload.depNombre;
            state.depDescripcion = payload.depDescripcion;
        },
        setDepartmentParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setDepartmentPageResult,
    cleanDepartmentData,
    setDepartment,
    setDepartmentParams
} = departmentSlice.actions;


