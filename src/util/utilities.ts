import {Item} from "../interfaces";



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

}