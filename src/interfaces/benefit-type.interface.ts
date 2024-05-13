
import { Paging, Item } from "./interfaces";


export interface BenefitTypeInterface {
    tprCodigo: number | null;
    tprNombre: string;
    page: Paging<BenefitTypeInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}