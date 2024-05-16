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

export const QueryContentLayout = ({}: Props) => {
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
                                    <StyledTableCell align={'center'}>Header 1</StyledTableCell>
                                    <StyledTableCell align={'center'}>Header 2</StyledTableCell>
                                    <StyledTableCell align={'center'}>Header 3</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align={'center'}>Body 1</TableCell>
                                    <TableCell align={'center'}>Body 2</TableCell>
                                    <TableCell align={'center'}>Body 3</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Button className={'button-add'}>
                    <Add/>
                </Button>

                <Pagination
                    className={'pagination'}
                    count={10}
                    hideNextButton={false}
                    hidePrevButton={false}
                    onChange={(_, page) => console.log(page)}
                    color="primary"
                    sx={{
                        mr: 'auto',
                        width: '50%'
                    }}
                />
            </Grid>
        </>
    )
}
