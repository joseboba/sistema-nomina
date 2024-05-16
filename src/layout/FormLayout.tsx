import {Box, Button, Grid, Tooltip} from "@mui/material";
import {Add, PowerSettingsNew} from "@mui/icons-material";
import {TitleComponent} from "../modules/administration";
import {Form, Formik, FormikValues} from "formik";
import {ReactElement} from "react";
import {FormikHelpers} from "formik/dist/types";

interface Props {
    update?: boolean;
    useStatus?: boolean;
    statusActive?: boolean;
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema?: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    onClean: () => void;
    onChangeStatus?: () => void;
}


export const FormLayout = ({
                               update = true,
                               useStatus = false,
                               statusActive = false,
                               children,
                               initialValues,
                               validationSchema,
                               onSubmit,
                               onClean,
                               onChangeStatus,
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
                <Box className={'form-header'}>
                    <TitleComponent title={update ? 'Editar' : 'Agregar'}/>
                    {

                        useStatus &&
                        (
                            <Tooltip title={`${statusActive ? 'Habilitado' : 'Deshabilitado'}`}>
                                <Button
                                    className={`form-status-button ${statusActive ? 'active' : 'inactive'}`}
                                    too={'Test'}
                                    onClick={onChangeStatus}
                                >
                                    <PowerSettingsNew/>
                                </Button>
                            </Tooltip>
                        )
                    }

                </Box>
                <Box sx={{width: '100%'}}>
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
                                    <Button variant="contained" type="submit"> Guardar </Button>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
                {
                    !!update &&
                    <Button className={'button-add'} onClick={onClean}>
                        <Add/>
                    </Button>
                }
            </Grid>
        </>
    )
}
