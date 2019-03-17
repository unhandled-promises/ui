import React from 'react';
import { Formik, Form } from "formik";
import CustomCard from "../components/CustomCard";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";

function BundleInfo({ ...props }) {
    return (
        <Formik
            onSubmit={values => {
                props.handler(values);
            }}
            render={({ errors, touched, values, handleChange, handleBlur }) => (
                <React.Fragment>
                    <BundleSubInnerWrap>
                        <Form>
                            <GridList cols={3} spacing={6}>
                                <GridListTile key={0} rows={3}>
                                    <CustomCard src="runners-small.jpeg" name="plan" label="Bronze Package" size="Small Company" colorChoice="#CD7F32" list={["Employees: 1-100", "Support: 8x5"]} price="$250" className={props.classes.button} />
                                </GridListTile>
                                <GridListTile key={1} rows={3}>
                                    <CustomCard src="runners-medium.jpeg" name="plan" label="Silver Package" size="Medium Company" colorChoice="#C0C0C0" list={["Employees: 101-500", "Support: 24x5", "Personal Email Address"]} price="$500" className={props.classes.button} />
                                </GridListTile>
                                <GridListTile key={2} rows={3}>
                                    <CustomCard src="runners-large.jpeg" name="plan" label="Gold Package" size="Large Company" colorChoice="#FFD700" list={["Employees: 501-1000", "Support: 24x7", "Personal Email Address", "Personal Phone Number", "First Born"]} price="$1,000" className={props.classes.button} />
                                </GridListTile>
                            </GridList>
                        </Form>
                    </BundleSubInnerWrap>
                </ React.Fragment>
            )}
        />
    )
};

export default BundleInfo;