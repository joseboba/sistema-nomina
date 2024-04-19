import {Item} from "../interfaces";
import Swal from "sweetalert2";

interface GenerateItemsProperties {
    itemCodeKey: string;
    itemPrimaryTextKey: string;
    itemSecondaryTextKey: string;
}

export class Utilities {

    static generateItems = (content: any[], keys: GenerateItemsProperties): Item[] => {
        const items: Item[] = [];
        content.forEach((itemContent) => {
            const item: Item = {
                itemCode: itemContent[keys.itemCodeKey],
                itemPrimaryText: itemContent[keys.itemPrimaryTextKey],
                itemSecondaryText: itemContent[keys.itemSecondaryTextKey]
            }
            items.push(item);
        });
        return items;
    }

    static successAlarm = async (text: string) => {
        await Swal.fire({
            title: 'Éxito',
            text,
            icon: 'success'
        })
    }

    static errorAlarm = async (text: string) => {
        await Swal.fire({
            title: 'Error',
            text,
            icon: 'error'
        })
    }

    static warningAlarm = async (title: string): Promise<boolean> => {
        const result = await Swal.fire({
            title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#689f38',
            confirmButtonText: 'Confirmar',
            cancelButtonColor: "#FF0000FF",
            cancelButtonText: 'Cancelar',
        });
        return result.isDismissed;
    }

    static capitalizeFirstLetter = (text : string ): string => text.substring(0,1).toUpperCase() + text.substring(1,text.length).toLowerCase();
}
