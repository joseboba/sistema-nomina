
import { Paging, Item } from "./interfaces";


export interface BonificationInterface {
    bonCodigo: number | null;
    bonNombre: string;
    bonDescripcion: string;
    bonMonto: number;
    bonPorcentaje: number;
    bonEstado: string;
    page: Paging<BonificationInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}