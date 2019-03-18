import React from 'react';
import { Formik, Form } from "formik";
import CustomCard from "../components/CustomCard";
import Grid from '@material-ui/core/Grid';
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";
import { EMPLOYEES_API } from "../static/api-config";
import Router from "next/router";
import Button from "@material-ui/core/Button";

function ProviderInfo({ ...props }) {

    return (
        <Formik
            initialValues={{
                authProvider: true,
            }}
            onSubmit={async (values) => {
                if (values.authProvider) {
                    window.location.href = `${EMPLOYEES_API}auth/fitbit?employeeId=${props.id}`
                } else {
                    Router.push("/dashboard/customer");
                }
            }}
            render={({ submitForm, setFieldValue }) => (
                <React.Fragment>
                    <BundleSubInnerWrap>
                        <Form>
                            <Grid container spacing={24} justify="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="fitbit.png" name="provider" label="Fitbit" size="" classType={props.classes.avatarFitbit} list={["30 minute sync", "Instant Analysis"]} statement="Join Today" className={props.classes.button} onSubmit={() => submitForm()} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="garmin.jpeg" name="provider" label="Garmin" size="" classType={props.classes.avatarGarmin} list={["30 minute sync", "Instant Analysis"]} statement="Coming Soon" className={props.classes.button} onSubmit="" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="apple-watch.jpg" name="provider" label="Apple" size="" classType={props.classes.avatarApple} list={["5 minute sync", "Instant Analysis"]} statement="Coming Soon" className={props.classes.button} onSubmit="" />
                                </Grid>
                            </Grid>
                            <br /><br />
                            <Button variant="contained" color="primary" type="submit" onClick={() => setFieldValue("authProvider", false)}>
                                Do Not Authorize
                            </Button>
                        </Form>
                    </BundleSubInnerWrap>
                </ React.Fragment>
            )}
        />
    )
};

export default ProviderInfo;