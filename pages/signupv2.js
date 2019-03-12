import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import {Elements, StripeProvider} from 'react-stripe-elements-universal';
import * as Yup from 'yup';
import Button from '../components/Button';
import Styled from 'styled-components';
import Nav from '../components/Nav';
import Input from '../components/Input';
import BundleOption from "../components/BundleOption";
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";
import CheckoutForm from "../components/CheckoutForm";
import Footer from '../components/Footer';
import FormInfo from "../components/FormInfo";
import FormStyle from "../components/FormStyle";
import FormSubHeader from "../components/FormSubHeader";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Selection from '../components/Selection';
import Link from 'next/link';
import Router from 'next/router'
import ShowSelections from "../components/ShowSelections";
import SubmitButton from "../components/SubmitButton";

const CompanySchema = Yup.object().shape({
    company_name: Yup.string()
        .min(1, "Too Short!")
        .max(100, "Too Long!")
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
        .min(2, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
    zip: Yup.string()
        .min(5, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

const Label = Styled.label`
    display: flex;
    flex-direction: column;
    margin: 0.5em 0;
    position: relative;
	font: 13px Arial, Helvetica, sans-serif;
	color: #888;
	margin-bottom: 15px;
`;

const Text = Styled.p`
    font-family: 'Raleway', sans-serif;
    color: ${props => props.color || '#4d4d4d'}
`;

class SignUp extends Component {
    state = {
        company_name: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        plan: "",
        verifyStep: 0,
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <SignUpDiv verifyStep={this.state.verifyStep}>
                    <Formik
                        initialValues={{
                            company_name: "",
                            address: "",
                            address2: "",
                            email: "",
                            city: "",
                            state: "",
                            zip: "",
                        }}
                        validationSchema={CompanySchema}
                        onSubmit={values => {
                            this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }))
                            this.setState(values);
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
                                <Form>
                                    <FormSubHeader number="1" text="Company Info" />
                                    <FormSubInnerWrap>
                                        <Label>
                                            Company Name *
                                {errors.company_name && touched.company_name && <Text color="red">{errors.company_name}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.company_name}
                                                border={errors.company_name && "1px solid red"}
                                                type="text"
                                                name="company_name"
                                                placeholder=""
                                            />
                                        </Label>
                                        <Label>
                                            Email Address *
                                {errors.email && touched.email && <Text color="red">{errors.email}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                border={errors.email && "1px solid red"}
                                                type="text"
                                                name="email"
                                                placeholder=""
                                            />
                                        </Label>
                                        <Label>
                                            Address *
                                {errors.address && touched.address && <Text color="red">{errors.address}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address}
                                                border={errors.address && "1px solid red"}
                                                type="text"
                                                name="address"
                                                placeholder="Address 1"
                                            />
                                        </Label>
                                        <Label>
                                            Address 2 *
                                {errors.address2 && touched.address2 && <Text color="red">{errors.address2}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address2}
                                                border={errors.address2 && "1px solid red"}
                                                type="text"
                                                name="address2"
                                                placeholder="Address 2"
                                            />
                                        </Label>
                                        <Label>
                                            City *
                        {errors.city && touched.city && <Text color="red">{errors.city}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                                border={errors.city && "1px solid red"}
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                            />
                                        </Label>
                                        <Label>
                                            State *
                        {errors.state && touched.state && <Text color="red">{errors.state}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.state}
                                                border={errors.state && "1px solid red"}
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                            />
                                        </Label>
                                        <Label>
                                            Postal Code *
                        {errors.city && touched.zip && <Text color="red">{errors.city}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.zip}
                                                border={errors.zip && "1px solid red"}
                                                type="text"
                                                name="zip"
                                                placeholder="Postal Code"
                                            />
                                        </Label>
                                    </FormSubInnerWrap>
                                    <SubmitButton text="Select Package" />
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </SignUpDiv>
                <BundleDiv verifyStep={this.state.verifyStep}>
                    <Formik
                        initialValues={{
                            plan: "",
                        }}
                        onSubmit={(values) => {
                            this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }))
                            this.setState(values);
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
                                <Form>
                                    <FormSubHeader number="2" text="Available Bundles" />
                                    <BundleSubInnerWrap>
                                        <BundleOption colorChoice="#CD7F32" list={["Employees: 1-100", "Support: 8x5"]} price="$250" onClick={() => setFieldValue("plan", "bronze")} />
                                        <BundleOption colorChoice="#C0C0C0" list={["Employees: 101-500", "Support: 24x5"]} price="$500" onClick={() => setFieldValue("plan", "silver")} />
                                        <BundleOption colorChoice="#FFD700" list={["Employees: 501-1000", "Support: 24x7"]} price="$1,000" onClick={() => setFieldValue("plan", "gold")} />
                                    </BundleSubInnerWrap>
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </BundleDiv>
                <PaymentDiv verifyStep={this.state.verifyStep}>
                    <Formik
                        initialValues={{
                            editSubmit: "",
                        }}
                        onSubmit={async (values) => {
                            if (values.editSubmit === "edit") {
                                this.setState((prevState) => ({ verifyStep: prevState.verifyStep - 2 }))
                            }
                        }}
                        render={({ setFieldValue }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
                                <Form>
                                    <FormSubHeader number="3" text="Validate Info" />
                                    <ShowSelections {... this.state} />
                                    <SubmitButton text="Edit Details" onClick={() => setFieldValue("editSubmit", "edit")} />
                                    <br /><br />
                                    <FormSubHeader number="4" text="Enter Payment" />
                                    <StripeProvider apiKey="pk_test_kDKkByslO1VnLL3wTpOxMil9">
                                        <Elements>
                                            <React.Fragment>
                                                <CheckoutForm {... this.state} />
                                            </React.Fragment>
                                        </Elements>
                                    </StripeProvider>
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </PaymentDiv>
                <Footer />
            </React.Fragment>
        )
    }
}

export default SignUp;

const SignUpDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
    width:80%;
    padding:30px;
    margin:40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	display:${({ verifyStep }) => (verifyStep === 0) ? "grid" : "none"}
`

const BundleDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
    width:80%;
    padding:30px;
    margin:40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	display:${({ verifyStep }) => (verifyStep === 1) ? "grid" : "none"}
`

const PaymentDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
    width:80%;
    padding:30px;
    margin:40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	display:${({ verifyStep }) => (verifyStep === 2) ? "grid" : "none"}
`