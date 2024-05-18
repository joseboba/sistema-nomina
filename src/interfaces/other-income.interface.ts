import { Moment } from "moment";
import { Paging, Item } from "./interfaces";

export interface OtherIncomeInterface {
    oinCodigo : number | null;
    epuCodigo : number | null;
    oinMonto : number;
    oinFecha : Moment | string; 
    empCodigo : number;
    nombreEmpleado : string;
    page: Paging<OtherIncomeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}