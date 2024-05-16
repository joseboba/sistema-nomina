import {Avatar, Box, Grid, IconButton} from "@mui/material";
import {Form, Formik, FormikValues} from "formik";
import {ReactElement} from "react";
import {FormikHelpers} from "formik/dist/types";
import {CancelOutlined, CancelRounded, Delete, SearchOutlined} from "@mui/icons-material";

interface Props {
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    onClean: () => void;
}


export const SearchBarLayout = ({
                                    children,
                                    initialValues,
                                    validationSchema,
                                    onSubmit,
                                    onClean,
                                }: Props) => {
    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    p: 3
                }}
                alignItems={'center'}
                className={'grid-main-container'}
            >
                <Grid item xs={4} >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {
                            _ => (
                                <Form>
                                    <Box  sx={{width: '100%'}}>
                                        <Grid container spacing={2} columns={{ xs: 2, sm: 4 }}>
                                            {children}
                                        </Grid>
                                    </Box>
                                </Form>
                            )
                        }
                    </Formik>

                </Grid>
                <Grid item
                      xs={4}
                      sx={{
                        pl: 1.5
                      }}
                >
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <CancelRounded style={{ color: 'red'  }}/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}
