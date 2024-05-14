import {Box, Button, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";

interface Props {

}


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
                </Box>
                <Button className={'button-add'}>
                    <Add/>
                </Button>
            </Grid>
        </>
    )
}
