import {Box, Button, InputAdornment, List, Pagination, TextField} from "@mui/material";
import {ListItemComponent} from "./ListItemComponent.tsx";
import {Search} from "@mui/icons-material";
import {ListComponentProps} from "../../../interfaces";
import {useState} from "react";


export const ListComponent = ({
                                  searchLabel,
                                  searchPlaceholder = 'Buscar',
                                  items,
                                  totalPageCount = 0,
                                  hasNext,
                                  hasPrevious,
                                  onChangePage,
                                  onChangeSearch,
                                  onSelectItem,
                                  onDeleteItem,
                                  useDelete = true
                              }: ListComponentProps) => {
    const [search, setSearch] = useState('');
    const handleSearch = ({target}) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onChangeSearch(search);
    }

    return (
        <Box sx={{width: '100%', backgroundColor: 'primary.light'}} className={'list-content'}>
            <Box sx={{height: 'calc(100vh - (56px + 17px + 48px))'}}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={searchLabel}
                        variant="outlined"
                        placeholder={searchPlaceholder}
                        sx={{mt: 1, width: '100%'}}
                        onChange={handleSearch}
                        InputProps={{
                            style: {
                                borderRadius: "100px",
                                backgroundColor: 'white'
                            },
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Button onClick={() => onChangeSearch(search)}>
                                        <Search sx={{color: 'primary.main'}}/>
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>


                <List sx={{width: '100%'}}>
                    {
                        items.map((value) =>
                                <ListItemComponent
                                    useDelete={useDelete}
                                    key={value.itemCode}
                                    {...value}
                                    onSelect={(code) => onSelectItem(code)}
                                    onDelete={(code) => onDeleteItem(code)}
                                />
                        )
                    }
                </List>
            </Box>

            <Box>
                {
                    totalPageCount > 0 &&
                    <Pagination
                        count={totalPageCount}
                        hideNextButton={!hasNext}
                        hidePrevButton={!hasPrevious}
                        onChange={(_, page) => onChangePage(page - 1, search)}
                        color="primary"
                        sx={{
                            mt: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    />
                }
            </Box>
        </Box>
    )
}
