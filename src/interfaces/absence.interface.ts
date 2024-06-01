import { Moment } from "moment";
import { Paging, Item } from "./interfaces";

export interface AbsenceInterface {
    ausCodigo: number | null;
    tauCodigo: number | null;
    tdsCodigo: number | null;
    epuCodigo: number | null;
    ausFechaSalida: Moment | string;
    ausFechaRegreso: Moment | string;
    empCodigo: number;
    nombreEmpleado: string;
    nombreTipoDescuento: string;
    nombreTipoAusencia: string;
    page: Paging<AbsenceInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}