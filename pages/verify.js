import React, { Component } from 'react';
import Router from 'next/router'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Styled from 'styled-components';
import FullNav from '../components/FullNav';
import Input from '../components/Input';
import Footer from '../components/Footer';
import FormInfo from "../components/FormInfo";
import FormSubHeader from "../components/FormSubHeader";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Provider from "../components/Provider";
import SubmitButton from "../components/SubmitButton";
import Progress from "../components/Progress";
import { CUSTOMERS_API, EMPLOYEES_API } from "../static/api-config";

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/[A-Z0-9{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
    lastName: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/[A-Z0-9{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
    date: Yup.string()
        .required("Required"),
    phone: Yup.string()
        .matches(/(^([\d]{3}\-){2})[\d]{4}$/, "Phone must be in the format 555-555-5555")
        .required("Required"),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must include a special character")
        .required("Required"),
});

const VerifySchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    code: Yup.string()
        .length(8, "Code must be 8 characters!")
        .matches(/[A-Z0-9{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
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

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
    text-decoration: none;
    cursor: pointer;
`;

class SignUp extends Component {
    state = {
        code: "",
        firstName: "",
        lastName: "",
        date: "",
        phone: "",
        password: "",
        email: "",
        id: "",
        company: "",
        role: "",
        secret: "",
        verifyStep: 0,
    }

    componentDidMount = async () => {
        const values = Router.query;

        if (Object.entries(values).length !== 0 && values.constructor === Object) {
            const verifyResponse = await this.verifyEmployee(values.e, values.t);
            if (verifyResponse.success) {
                sessionStorage.setItem("jwt", verifyResponse.token)
                const employeeData = jwt_decode(verifyResponse.token);
                const companyName = await this.findCompanyNameById(employeeData.company);
                this.setState({
                    company: companyName,
                    role: employeeData.role,
                    id: employeeData.id
                })
                this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }));
            }
        }
    }

    verifyEmployee = async (email, code) => {
        const response = await fetch(`${EMPLOYEES_API}api/employee/verify`, {
            method: "POST",
            body: JSON.stringify({
                "token": code,
                "email": email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    }

    findCompanyNameById = async (id) => {
        const jwt = await sessionStorage.getItem("jwt");
        const companyResponse = await fetch(`${CUSTOMERS_API}api/customers/${id}`, {
            headers: {
                "Authorization": jwt
            }
        });
        const companyData = await companyResponse.json();
        return companyData[0].name;
    }

    updateEmployeeInformation = async (employee) => {
        const first = employee.firstName;
        const last = employee.lastName;
        const dob = employee.dob;
        const phone = employee.phone;
        const password = employee.password;
        const employeeResponse = await fetch(`${EMPLOYEES_API}api/employee/${employee.id}`, {
            method: "PUT",
            body: JSON.stringify({
                "first_name": first,
                "last_name": last,
                "dob": dob,
                "phone": phone,
                "password": password
            }),
            headers: {
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
        })

        const employeeData = employeeResponse.json();
        return employeeData;
    }

    render() {
        return (
            <React.Fragment>
                <FullNav>
                    <Link href="/"><NavLink>Home</NavLink></Link>
                    <Link href="/"><NavLink></NavLink></Link>
                </FullNav>
                <VerifyDiv verifyStep={this.state.verifyStep}>
                <Progress />
                    <Formik
                        initialValues={{
                            code: "",
                            email: "",
                        }}
                        validationSchema={VerifySchema}
                        onSubmit={async (values) => {
                            const verifyResponse = await this.verifyEmployee(values.email, values.code);

                            if (verifyResponse.success) {
                                sessionStorage.setItem("jwt", verifyResponse.token)
                                const employeeData = await jwt_decode(verifyResponse.token);
                                const companyName = await this.findCompanyNameById(employeeData.company);
                                this.setState({
                                    company: companyName,
                                    role: employeeData.role,
                                    id: employeeData.id
                                })
                                this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }));
                            } else {
                                console.log(`Verification Failed`);
                            }
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Join your team today!" />
                                <Form>
                                    <FormSubHeader number="1" text="Verify Info" />
                                    <FormSubInnerWrap>
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
                                            Verify Code *
                                {errors.code && touched.code && <Text color="red">{errors.code}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.code}
                                                border={errors.code && "1px solid red"}
                                                type="text"
                                                name="code"
                                                placeholder=""
                                            />
                                        </Label>
                                    </FormSubInnerWrap>
                                    <SubmitButton text="Verify Info" />
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </VerifyDiv>
                <InfoDiv verifyStep={this.state.verifyStep}>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            date: "",
                            phone: "",
                            password: "",
                        }}
                        validationSchema={EmployeeSchema}
                        onSubmit={async (values) => {
                            const employee = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                dob: values.date,
                                phone: values.phone,
                                id: this.state.id,
                                password: values.password,
                            }
                            await this.updateEmployeeInformation(employee)
                            this.setState((prevState) => ({ verifyStep: prevState.verifyStep + 1 }));
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
                                <Form>
                                    <FormSubHeader number="2" text="Personal Info" />
                                    <FormSubInnerWrap>
                                        <p>Company: {this.state.company}</p>
                                        <p>Role: {this.state.role}</p>
                                        <Label>
                                            First Name *
                        {errors.firstName && touched.firstName && <Text color="red">{errors.firstName}</Text>}
                                            <Input
                                                type="text"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="firstName"
                                                border={errors.firstName && "1px solid red"}
                                            />
                                        </Label>
                                        <Label>
                                            Last Name *
                        {errors.lastName && touched.lastName && <Text color="red">{errors.lastName}</Text>}
                                            <Input
                                                type="text"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="lastName"
                                                border={errors.lastName && "1px solid red"}
                                            />
                                        </Label>
                                        <Label>
                                            Phone *
                        {errors.phone && touched.phone && <Text color="red">{errors.phone}</Text>}
                                            <Input
                                                type="text"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="phone"
                                                border={errors.phone && "1px solid red"}
                                            />
                                        </Label>
                                        <Label>
                                            Password *
                        {errors.password && touched.password && <Text color="red">{errors.password}</Text>}
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="password"
                                                border={errors.password && "1px solid red"}
                                            />
                                        </Label>
                                        <Label>
                                            Date *
                                        <Input
                                                type="date"
                                                value={values.date}
                                                onChange={handleChange}
                                                name="date" />
                                        </Label>
                                        <SubmitButton text="Create Profile" />
                                    </FormSubInnerWrap>
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </InfoDiv>
                <DeviceDiv verifyStep={this.state.verifyStep}>
                    <Formik
                        initialValues={{
                            authProvider: true,
                        }}
                        onSubmit={async (values) => {
                            if (values.authProvider) {
                                window.location.href = `${EMPLOYEES_API}auth/fitbit?employeeId=${this.state.id}`
                            } else {
                                Router.push("/dashboard/employee");
                            }
                        }}
                        render={({ setFieldValue, submitForm }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Join your team today!" />
                                <Form>
                                    <FormSubHeader number="3" text="Device Info" />
                                    <FormSubInnerWrap>
                                        <h3>Approve Access by Provider</h3>
                                        <Provider image="/static/images/fitbit-transparent-logo.png" alttext="Fitbit" available onClick={() => submitForm() } />
                                        <Provider image="/static/images/garmin-transparent-logo.png" alttext="Garmin" onClick={() => setFieldValue("authProvider", false)} />
                                        <Provider image="/static/images/apple-transparent-logo.png" alttext="Apple" onClick={() => setFieldValue("authProvider", false)} />
                                        <br /><br />
                                        <SubmitButton text="Do not authorize at this time" onClick={() => setFieldValue("authProvider", false)} />
                                    </FormSubInnerWrap>
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </DeviceDiv>
                <Footer />
            </React.Fragment>
        )
    }
}

export default SignUp;

const VerifyDiv = Styled.div`
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

const InfoDiv = Styled.div`
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
const DeviceDiv = Styled.div`
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

