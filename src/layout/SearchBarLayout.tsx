import {Box, Grid} from "@mui/material";
import {Form, Formik, FormikValues} from "formik";
import {ReactElement} from "react";
import {FormikHelpers} from "formik/dist/types";

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
                className={'grid-main-container'}
            >
                <Box sx={{width: '100%'}} className={'query-search-bar'}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {
                            _ => (
                                <Form>
                                    <Box>
                                        <Grid container spacing={2}>
                                            {children}
                                        </Grid>
                                    </Box>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Grid>
        </>
    )
}
