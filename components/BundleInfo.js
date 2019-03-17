import React from 'react';
import { Formik, Form } from "formik";
import CustomCard from "../components/CustomCard";
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";

function BundleInfo({ ...props }) {
    return (
        <Formik
            initialValues={{ plan: "" }}
            onSubmit={values => {
                console.log("hey");
                console.log(values);
                props.handler(values);
            }}
            render={({ errors, touched, values, handleChange, handleBlur, setValues }) => (
                <React.Fragment>
                    <BundleSubInnerWrap>
                        <Form>
                            <Grid container spacing={24} justify="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="runners-small.jpeg" name="plan" label="Bronze Package" size="Small Company" classType={props.classes.avatarBronze} list={["Supports: 1-100", "Support: 8x5"]} statement="$250" className={props.classes.button} onSubmit={setValues} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="runners-medium.jpeg" name="plan" label="Silver Package" size="Medium Company" classType={props.classes.avatarSilver} list={["Supports: 101-500", "Support: 24x5", "Personal Email Address"]} statement="$500" className={props.classes.button} onSubmit={setValues} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomCard src="runners-large.jpeg" name="plan" label="Gold Package" size="Large Company" classType={props.classes.avatarGold} list={["Supports: 501-1000", "Support: 24x7", "Personal Email Address", "Personal Phone Number", "First Born"]} statement="$1,000" className={props.classes.button} onSubmit={setValues} />
                                </Grid>
                            </Grid>
                        </Form>
                    </BundleSubInnerWrap>
                </ React.Fragment>
            )}
        />
    )
};

export default BundleInfo;