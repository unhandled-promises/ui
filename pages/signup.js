import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Elements, StripeProvider } from "react-stripe-elements-universal";
import * as Yup from "yup";
import Link from "next/link";
import Styled from "styled-components";
import FullNav from "../components/FullNav";
import Input from "../components/Input";
import BundleOption from "../components/BundleOption";
import BundleSubInnerWrap from "../components/BundleSubInnerWrap";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";
import FormInfo from "../components/FormInfo";
import FormSubHeader from "../components/FormSubHeader";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import ShowSelections from "../components/ShowSelections";
import SubmitButton from "../components/SubmitButton";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button"
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import NativeSelect from '@material-ui/core/NativeSelect';

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
        .email("Invalid email")
        .required("Required"),
});

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
    },
    tieredWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
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

const NavLink = Styled.a`
	margin:.5rem;
	color: white;
    text-decoration: none;
    cursor: pointer;
`;

const renderTextField = ({
    field,
    form: { values, touched, errors, handleBlur, handleChange },
    ...props
}) => (
        <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.name]}
            id={field.name}
            error={touched[field.name] && Boolean(errors[field.name])}
            label={props.label}
            type="text"
            name={field.name}
            margin="normal"
            variant="outlined"
            required={props.required}
            fullWidth={props.fullWidth}
            className={props.classes.white}
            InputLabelProps={{
                classes: {
                    root: props.classes.cssLabel,
                    focused: props.classes.cssFocused,
                },
            }}
            InputProps={{
                classes: {
                    root: props.classes.cssOutlinedInput,
                    focused: props.classes.cssFocused,
                    notchedOutline: props.classes.notchedOutline,
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <i className={props.icon}></i>
                    </InputAdornment>
                ),
            }}
        />
    )

function getSteps() {
    return ["Info", "Package", "Purchase"];
}

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
        activeStep: 0,
        verifyStep: 0,
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
                            this.handleNext();
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur }) => (
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
                                    <FormSubInnerWrap>
                                        <Field name="company_name" component={renderTextField} label="Company Name" icon="far fa-building" classes={classes} required={true} fullWidth={true} />
                                        <Field name="email" component={renderTextField} label="Email" icon="far fa-envelope" classes={classes} required={true} fullWidth={true} />
                                        <Field name="address" component={renderTextField} label="Address 1" icon="far fa-address-card" classes={classes} required={true} fullWidth={true} />
                                        <Field name="address2" component={renderTextField} label="Address 2" icon="far fa-address-card" classes={classes} required={false} fullWidth={true} />

                                        <div className={classes.tieredWrap}>
                                            <div className={classes.tiered} textAlign="left">
                                                <Field name="city" component={renderTextField} label="City" icon="far fa-flag" classes={classes} required={true} fullWidth={true} />
                                            </div>
                                            <div className={classes.tiered} textAlign="center">
                                                <FormControl required className={classes.formControl} margin="normal">
                                                    <InputLabel
                                                        ref={ref => {
                                                            this.InputLabelRef = ref;
                                                        }}
                                                        shrink
                                                        htmlFor="state"
                                                        variant="outlined"
                                                    >
                                                        State
                                                    </InputLabel>
                                                    <Select
                                                        onChange={handleChange}
                                                        value={values.state}
                                                        input={
                                                            <OutlinedInput
                                                                labelWidth={0}
                                                                name="state"
                                                                id="state"
                                                            />
                                                        }
                                                        style={{ width: 250 }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {allStates.map(states => (
                                                            <MenuItem value={states} key={states}>
                                                                {states}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className={classes.tiered} textAlign="right">
                                                <Field name="zip" component={renderTextField} label="Postal Code" icon="far fa-flag" classes={classes} required={true} fullWidth={true} align="right" />
                                            </div>
                                        </div>
                                    </FormSubInnerWrap>
                                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                        Select Package
                                    </Button>
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
                            this.handleNext();
                        }}
                        render={({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
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
                                    <BundleSubInnerWrap>
                                        <BundleOption colorChoice="#CD7F32" list={["Employees: 1-100", "Support: 8x5"]} price="$250" onClick={() => setFieldValue("plan", "bronze")} />
                                        <BundleOption colorChoice="#C0C0C0" list={["Employees: 101-500", "Support: 24x5", "Personal Email Address"]} price="$500" onClick={() => setFieldValue("plan", "silver")} />
                                        <BundleOption colorChoice="#FFD700" list={["Employees: 501-1000", "Support: 24x7", "Personal Email Address", "Personal Phone Number", "First Born"]} price="$1,000" onClick={() => setFieldValue("plan", "gold")} />
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