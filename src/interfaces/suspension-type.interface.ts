
import { Paging, Item } from "./interfaces";

export interface SuspensionTypeInterface {
    tsuCodigo : number | null,
    tsuNombre : string,
    tsuDescripcion : string,
    page: Paging<SuspensionTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}