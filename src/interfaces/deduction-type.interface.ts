
import { Paging, Item } from "./interfaces";


export interface DeductionTypeInterface {
    tdeCodigo: number | null;
    tdeNombre: string;
    tdeDescripcion: string;
    tdeMonto: number;
    tdePorcentaje: number;
    tdeEstado: number;
    page: Paging<DeductionTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}