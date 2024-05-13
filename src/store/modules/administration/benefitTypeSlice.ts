import {BenefitTypeInterface, Paging, Item} from "../../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Utilities} from "../../../util";


const initialState: BenefitTypeInterface = {
    tprCodigo: 0,
    tprNombre: '',
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

export const benefitTypeSlice = createSlice({
    name: 'benefitType',
    initialState,
    reducers: {
        setBenefitTypePageResult: (state, { payload }: PayloadAction<Paging<BenefitTypeInterface>>) => {
            state.page = payload;
            state.items = Utilities.generateItems(payload.content, {
                itemCodeKey: 'tprCodigo',
                itemPrimaryTextKey: 'tprNombre',
                itemSecondaryTextKey: 'tprCodigo'
            });
        },
        cleanBenefitTypeData: (state) => {
            state.tprCodigo = 0;
            state.tprNombre = '';
        },
        setBenefitType: (state, { payload }: PayloadAction<BenefitTypeInterface>) => {
            state.tprCodigo = payload.tprCodigo;
            state.tprNombre = payload.tprNombre;
        },
        setBenefitTypeParams: (state, {payload}: PayloadAction<{search: string, page: number}>) => {
            state.params.search = payload.search;
            state.params.page = payload.page;
        }
    }
});


export const {
    setBenefitTypePageResult,
    cleanBenefitTypeData,
    setBenefitType,
    setBenefitTypeParams
} = benefitTypeSlice.actions;


