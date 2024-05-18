import {
    Box,
    Button,
    Grid,
    IconButton, Pagination,
    Paper, styled,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";

interface Props {
    tableHeaders: string[];
    tableBody: any[];
    properties: string[];
    onAdd: () => void;
}

const StyledTableCell = styled(TableCell)((_) => ({
    [`&.${tableCellClasses.root}`]: {
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#fff',
        color: '#001b40',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const QueryContentLayout = ({onAdd, tableHeaders, tableBody, properties}: Props) => {
    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    p: 3,
                    mt: 2
                }}
                className={'grid-main-container'}
            >
                <Box sx={{width: '100%'}} className={'query-content'}>
                    <TableContainer component={Paper} className={'table-content-height table'}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        tableHeaders.map((tableHeader) => (
                                            <StyledTableCell align={'center'} key={tableHeader}>{tableHeader}</StyledTableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableBody.map((body, i) => (
                                        <TableRow key={i}>
                                            {
                                                properties.map((propertie) => (
                                                    <TableCell key={propertie} align={'center'}>{body[propertie]}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Button className={'button-add'} onClick={onAdd}>
                    <Add/>
                </Button>
            </Grid>
        </>
    )
}
