import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Button from "@material-ui/core/Button"
import CustomTextField from "../components/CustomTextField";
import CustomSelectField from "../components/CustomSelectField";
import * as Yup from "yup";
import { CUSTOMERS_API } from "../static/api-config";

async function validateDB(search) {
    const {name, value} = search;
    const response = await fetch(`${CUSTOMERS_API}api/customers/search?${name}=${value}`, 
    {
        method: "GET",
    })

    const exists = await response.json();
    if (!exists) {
        return true;
    } else {
        return false;
    }
}

const CompanySchema = Yup.object().shape({
    company_name: Yup.string()
        .min(1, "Too Short!")
        .max(100, "Too Long!")
        .test(
            "Company Name",
            "Company exists in system",
            value => value && validateDB({name: "name", value: value})
        )
        .required("Required"),
    address: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
    address2: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!"),
    city: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    state: Yup.string()
        .min(4, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
    zip: Yup.string()
        .min(5, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email")
        .test(
            "Email",
            "Email exists in system",
            value => value && validateDB({name: "email", value: value})
        )
        .required("Required"),
});

const allStates = ["Alabama", "Alaska", "Arizona", "Arkansas",
    "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"];

function CompanyInfo ({ ...props }) {
    const [company, setCompany] = useState({address: "", address2: "", city: "", company_name: "", email: "", state: "", zip: ""});

    useEffect(() => {
        if (props.scope === "update") {
            const fetchData = async () => {
                try {
                    const companyResponse = await fetch(`${CUSTOMERS_API}api/customers/${props.customerId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": props.jwt
                        }
                    });
                    const custMap = await companyResponse.json();
                    custMap[0].company_name = custMap[0].name;
                    custMap[0].zip = custMap[0].postal;

                    setCompany(custMap[0]);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, []);

    return (
        <Formik
            initialValues={company}
            enableReinitialize={true}
            validationSchema={CompanySchema}
            onSubmit={values => {
                props.handler(values);
            }}
            render={({ errors, touched, values, handleChange, handleBlur }) => (
                <React.Fragment>
                    <Form>
                        <FormSubInnerWrap>
                            <Field name="company_name" component={CustomTextField} label="Company Name" icon="far fa-building" classes={props.classes} required={true} fullWidth={true} />
                            <Field name="email" component={CustomTextField} label="Email" icon="far fa-envelope" classes={props.classes} required={true} fullWidth={true} />
                            <Field name="address" component={CustomTextField} label="Address 1" icon="far fa-address-card" classes={props.classes} required={true} fullWidth={true} />
                            <Field name="address2" component={CustomTextField} label="Address 2" icon="far fa-address-card" classes={props.classes} required={false} fullWidth={true} />

                            <div className={props.classes.tieredWrap}>
                                <div className={props.classes.tiered}>
                                    <Field name="city" component={CustomTextField} label="City" icon="far fa-city" classes={props.classes} required={true} fullWidth={true} />
                                </div>
                                <div className={props.classes.tiered}>
                                    {/* <Field name="state" component={CustomSelectField} label="State" classes={props.classes} required={true} selection={allStates} /> */}
                                    <Field name="state" component={CustomSelectField} label="State" icon="far fa-city" classes={props.classes} required={true} select={true} fullWidth={true} selection={allStates} />
                                </div>
                                <div className={props.classes.tiered}>
                                    <Field name="zip" component={CustomTextField} label="Postal Code" icon="far fa-mailbox" classes={props.classes} required={true} fullWidth={true} align="right" />
                                </div>
                            </div>
                        </FormSubInnerWrap>
                        <Button variant="contained" color="primary" type="submit" className={props.classes.button}>
                            {props.scope === "new" ? "Select Package" : "Update Company Info"}
                        </Button>
                    </Form>
                </React.Fragment>
            )}
        />
    )
};

export default CompanyInfo;