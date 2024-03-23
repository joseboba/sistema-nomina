import {Box, Button, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";
import {TitleComponent} from "../modules/administration/components";
import {Form, Formik, FormikConfig, FormikValues} from "formik";
import {ReactElement} from "react";
import {FormikHelpers} from "formik/dist/types";

interface Props {
    update?: boolean;
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    onClean: () => void;
}


export const FormLayout = ({update = true, children, initialValues, validationSchema, onSubmit, onClean}: Props) => {
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
                <Box>
                    <TitleComponent title={update ? 'Editar' : 'Agregar'}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {
                            _ => (
                                <Form>
                                    <Box className={'form-content'}>
                                        <Grid container spacing={2}>
                                            {children}
                                        </Grid>
                                    </Box>
                                    <Button variant="contained" type="submit" > Guardar </Button>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
                {
                    !!update &&
                    <Button className={'button-add'} onClick={onClean}>
                        <Add />
                    </Button>
                }
            </Grid>
        </>
    )
}
