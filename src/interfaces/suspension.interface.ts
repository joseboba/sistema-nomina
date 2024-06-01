import { Moment } from "moment";
import { Paging, Item } from "./interfaces";

export interface SuspensionInterface {
    susCodigo : number | null;
    tsuCodigo: number | null;
    epuCodigo: number | null;
    susFechaSalida: Moment | string;
    susFechaRegreso: Moment | string;
    susEstado: number;
    empCodigo : number;
    nombreEmpleado: string;
    nombreTipoSuspension: string;
    page: Paging<SuspensionInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}