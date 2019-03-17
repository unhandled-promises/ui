import React, { Component } from "react";
import { Formik, Form } from "formik";
import { Elements, StripeProvider } from "react-stripe-elements-universal";
import Link from "next/link";
import Styled from "styled-components";
import FullNav from "../components/FullNav";
import BundleOption from "../components/BundleOption";
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";
import FormInfo from "../components/FormInfo";
import FormSubHeader from "../components/FormSubHeader";
import ShowSelections from "../components/ShowSelections";
import SubmitButton from "../components/SubmitButton";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CompanyInfo from "../components/CompanyInfo";
import BundleInfo from "../components/BundleInfo";

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

        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        [theme.breakpoints.up("md")]: {
            width: "30%",
        },
    },
    tieredWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },

    avatarBronze: {
        backgroundColor: "#CD7F32",
    },
    avatarSilver: {
        backgroundColor: "#C0C0C0",
    },
    avatarGold: {
        backgroundColor: "#FFD700",
    },
});

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
    text-decoration: none;
    cursor: pointer;
`;

function getSteps() {
    return ["Info", "Package", "Purchase"];
}

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this)
    }

    state = {
        company_name: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        plan: "",
        activeStep: 0,
        skipped: new Set(),
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
        this.setState(value)
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
                <SignUpDiv activeStep={this.state.activeStep}>
                    <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
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
                    <CompanyInfo classes={classes} handler={this.handler} scope="new" />
                    {/* <CompanyInfo classes={classes} handler={this.handler} scope="update" customerId="5c89a4dcf609b0001e6e31e1" jwt="lkjlaksdjflkajdsf" /> */}
                </SignUpDiv>
                <BundleDiv activeStep={this.state.activeStep}>
                    <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
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
                    <BundleInfo classes={classes} handler={this.handler} />
                </BundleDiv>
                <PaymentDiv activeStep={this.state.activeStep}>
                    <Formik
                        initialValues={{
                            editSubmit: "",
                        }}
                        onSubmit={async (values) => {
                            if (values.editSubmit === "edit") {
                                this.setState((prevState) => ({ activeStep: prevState.activeStep - 2 }))
                                values.editSubmit = "";
                                this.handleReset();
                            }
                        }}
                        render={({ setFieldValue }) => (
                            <React.Fragment>
                                <FormInfo primary="Registration" secondary="Empower your company to live and work healthy!" />
                                <Form>
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
                                    <ShowSelections {... this.state} />
                                    <SubmitButton text="Edit Details" onClick={() => setFieldValue("editSubmit", "edit")} />
                                    <br /><br />
                                    <FormSubHeader number="4" text="Enter Payment" />
                                    <StripeProvider apiKey="pk_test_kDKkByslO1VnLL3wTpOxMil9">
                                        <Elements>
                                            <CheckoutForm {... this.state} />
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);

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
	display:${({ activeStep }) => (activeStep === 0) ? "grid" : "none"}
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
	display:${({ activeStep }) => (activeStep === 1) ? "grid" : "none"}
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
	display:${({ activeStep }) => (activeStep === 2) ? "grid" : "none"}
`