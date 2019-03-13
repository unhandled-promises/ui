import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import Styled from 'styled-components';
import * as Yup from 'yup';
import { EMPLOYEES_API } from "../static/api-config";
import Router from 'next/router';
import Nav from '../components/Nav';
import Input from '../components/Input';
import Footer from '../components/Footer';
import FormInfo from "../components/FormInfo";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import SubmitButton from "../components/SubmitButton";

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
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

class Login extends Component {
    state = {
        authError: false,
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <LoginDiv>
                    <Formik
                        initialValues={{
                            password: "",
                            email: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values) => {
                            try {
                                const loginResponse = await fetch(`${EMPLOYEES_API}api/employee/login`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        "email": values.email,
                                        "password": values.password
                                    })
                                });

                                const loginData = await loginResponse.json();

                                if (loginData.success) {
                                    this.setState({authError: false})
                                    const { token } = loginData;
                                    sessionStorage.setItem("jwt", token);
                                    const decodeToken = jwt_decode(token);
                                    if (decodeToken.role === "manager" || decodeToken.role === "owner") {
                                        Router.push("/dashboard/customer");
                                    } else if (decodeToken.role === "employee") {
                                        Router.push("/dashboard/employee");
                                    }
                                } else {
                                    this.setState({authError: true});
                                }
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur }) => (
                            <React.Fragment>
                                <FormInfo primary="Login" secondary="How are you trending today?" />
                                <Form>
                                    <FormSubInnerWrap>
                                        {this.state.authError && <Text color="red">Invalid Login Information</Text>}
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
                                            Password *
                                {errors.password && touched.password && <Text color="red">{errors.password}</Text>}
                                            <Input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                border={errors.password && "1px solid red"}
                                                type="password"
                                                name="password"
                                                placeholder=""
                                            />
                                        </Label>
                                    </FormSubInnerWrap>
                                    <SubmitButton text="Login" />
                                </Form>
                            </React.Fragment>
                        )}
                    />
                </LoginDiv>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Login;

const LoginDiv = Styled.div`
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
    display: grid;
`