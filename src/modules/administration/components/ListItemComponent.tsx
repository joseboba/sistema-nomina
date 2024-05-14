import {Avatar, IconButton, ListItem, ListItemText} from "@mui/material";
import {Delete} from "@mui/icons-material";

interface Props {
    itemCode: string | number;
    itemPrimaryText: string;
    itemSecondaryText: string;
    useDelete: boolean;
    onSelect: (code: number | string) => void;
    onDelete: (code: number | string) => void;
}

export const ListItemComponent = ({itemCode, itemPrimaryText, itemSecondaryText, onSelect, onDelete, useDelete = true}: Props) => {
    return (
        <ListItem
            sx={{
                pt: 0.5,
                pr: 0,
                pb: 1,
                pl: 0.3
            }}
            key={itemCode}
            secondaryAction={
                useDelete && (
                    <IconButton onClick={() => onDelete(itemCode)} className={'list-button'}>
                        <Avatar size={'small'}>
                            <Delete/>
                        </Avatar>
                    </IconButton>
                )
            }
        >
            <ListItemText
                primary={itemPrimaryText}
                secondary={itemSecondaryText}
                onClick={() => onSelect(itemCode)}
            />
        </ListItem>
    )
}
