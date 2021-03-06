import React, { Component } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Styled from 'styled-components';
import FullNav from '../components/FullNav';
import Footer from '../components/Footer';
import FormInfo from "../components/FormInfo";
import { CUSTOMERS_API, EMPLOYEES_API } from "../static/api-config";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import EmployeeInfo from "../components/EmployeeInfo";
import VerifyInfo from "../components/VerifyInfo";
import ProviderInfo from "../components/ProviderInfo";
import Typography from '@material-ui/core/Typography';

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

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
    text-decoration: none;
    cursor: pointer;
`;

function getSteps() {
    return ["Verify", "Info", "Provider"];
}

class Verify extends Component {
    constructor(props) {
        super(props)

        this.handlerVerify = this.handlerVerify.bind(this);
        this.handlerInfo = this.handlerInfo.bind(this);
    }

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
        activeStep: 0,
        skipped: new Set(),
        authError: false,
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
                this.handleNext();
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

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handler(value) {
        this.handleNext();
        this.setState(value);
    }

    async handlerVerify(value) {
        const verifyResponse = await this.verifyEmployee(value.email, value.code);

        if (verifyResponse.success) {
            this.setState({ authError: false })
            sessionStorage.setItem("jwt", verifyResponse.token)
            const employeeData = await jwt_decode(verifyResponse.token);
            const companyName = await this.findCompanyNameById(employeeData.company);
            this.setState({
                company: companyName,
                role: employeeData.role,
                id: employeeData.id
            })
            this.handleNext();
        } else {
            this.setState({ authError: true });
        }
    }

    async handlerInfo(value) {
        const employee = {
            firstName: value.firstName,
            lastName: value.lastName,
            dob: value.date,
            phone: value.phone,
            id: this.state.id,
            password: value.password,
        }

        await this.updateEmployeeInformation(employee)
        this.handleNext();
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <FullNav>
                    <Link href="/"><NavLink>Home</NavLink></Link>
                    <Link href="/"><NavLink></NavLink></Link>
                </FullNav>
                <VerifyDiv activeStep={this.state.activeStep}>
                    <FormInfo primary="Registration" secondary="Join your team today!" />
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {this.state.authError ?
                        <Typography variant="h6" gutterBottom color="error">
                            Invalid Credentials
                        </Typography> : ""
                    }
                    <VerifyInfo classes={classes} handler={this.handlerVerify} />
                </VerifyDiv>
                <InfoDiv activeStep={this.state.activeStep}>
                    <FormInfo primary="Registration" secondary="Join your team today!" />
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <EmployeeInfo classes={classes} handler={this.handlerInfo} scope="new" />
                    {/* <EmployeeInfo classes={classes} handler={this.handlerInfo} scope="update" employeeId="5c89a4dcf609b0001e6e31e1" jwt="lkjlaksdjflkajdsf" /> */}
                </InfoDiv>
                <DeviceDiv activeStep={this.state.activeStep}>
                    <FormInfo primary="Registration" secondary="Join your team today!" />
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <ProviderInfo classes={classes} id={this.state.id} />
                </DeviceDiv>
                <Footer />
            </React.Fragment>
        )
    }
}

Verify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Verify);

const VerifyDiv = Styled.div`
    grid-template-columns: 2fr;
    max-width: 800px;
    width:80%;
    padding:30px;
    margin:10px auto 40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	display:${({ activeStep }) => (activeStep === 0) ? "grid" : "none"}
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
	display:${({ activeStep }) => (activeStep === 1) ? "grid" : "none"}
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
	display:${({ activeStep }) => (activeStep === 2) ? "grid" : "none"}
`

