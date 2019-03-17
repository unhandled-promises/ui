import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Styled from 'styled-components';
import FullNav from '../components/FullNav';
import * as Yup from 'yup';
import { EMPLOYEES_API } from "../static/api-config";
import Router from 'next/router';
import Footer from '../components/Footer';
import FormInfo from "../components/FormInfo";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Button from "@material-ui/core/Button"
import CustomTextField from "../components/CustomTextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import SideBar from "../components/SideBar";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    cssLabel: {
        color: "black",
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `${theme.palette.primary.main} !important`,
        },
        boxSizing: "border-box",
    },

    cssFocused: {},

    notchedOutline: {
        // borderWidth: "1px",
        // borderColor: "black !important"
    },

    button: {
        margin: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    formControl: {
        backgroundColor: "white",
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    white: {
        backgroundColor: "white",
    },
    tiered: {
        // flex: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        [theme.breakpoints.up("md")]: {
            width: "45%",
        },
    },
    tieredWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatarFitbit: {
        backgroundColor: "#1F6276",
    },
    avatarGarmin: {
        backgroundColor: "#000000",
    },
    avatarApple: {
        backgroundColor: "#313131",
    },
});

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

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
    text-decoration: none;
    cursor: pointer;
`;

class Login extends Component {
    state = {
        authError: false,
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <SideBar>
                    {/* <FullNav>
                    <Link href="/"><NavLink>Home</NavLink></Link>
                    <Link href="/"><NavLink></NavLink></Link>
                </FullNav> */}
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
                                        this.setState({ authError: false })
                                        const { token } = loginData;
                                        sessionStorage.setItem("jwt", token);
                                        const decodeToken = jwt_decode(token);
                                        if (decodeToken.role === "manager" || decodeToken.role === "owner") {
                                            Router.push("/dashboard/customer");
                                        } else if (decodeToken.role === "employee") {
                                            Router.push("/dashboard/employee");
                                        }
                                    } else {
                                        this.setState({ authError: true });
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
                                            {this.state.authError ?
                                                <Typography variant="h6" gutterBottom color="error">
                                                    Invalid Login Credentials
                                        </Typography> : ""
                                            }
                                            <Field name="email" component={CustomTextField} label="Email" icon="far fa-envelope-square" classes={classes} required={true} fullWidth={true} />
                                            <Field name="password" type="password" component={CustomTextField} label="Password" icon="far fa-unlock-alt" classes={classes} required={true} fullWidth={true} />
                                        </FormSubInnerWrap>
                                        <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                            Login
                                    </Button>
                                    </Form>
                                </React.Fragment>
                            )}
                        />
                    </LoginDiv>
                </SideBar>
                <Footer />
            </React.Fragment>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

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