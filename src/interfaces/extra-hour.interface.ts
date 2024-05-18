import { Moment } from "moment";

export interface ExtraHourInterface {
    hexCodigo: number | null;
    hexCantidad: number | null;
    hexFecha: string | null;
    empPrimerNombre : string | null;
    empSegundoNombre: string | null;
    empPrimerApellido: string | null;
    empSegundoApellido : string | null;
}


export interface ExtraHourUploadInterface {
    startDate: Moment,
    endDate: Moment,
    file: File | null;
    empCodigo: number | null;
    extraHours : ExtraHourInterface[]
}

export interface ExtraHourDataTable {
    nombreEmmpleado: string; 
    cantidad: number;
    fecha: string;
}