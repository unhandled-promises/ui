import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Button from "@material-ui/core/Button"
import CustomCheckbox from "../components/CustomCheckbox";
import CustomTextField from "../components/CustomTextField";
import * as Yup from "yup";
import { EMPLOYEES_API } from "../static/api-config";

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/[\w{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
    lastName: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/[\w{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
    date: Yup.string()
        .required("Required"),
    phone: Yup.string()
        .matches(/[0-9{10}]/, "Phone must be in the format 5555555555")
        .required("Required"),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must include a special character")
        .required("Required"),
    password2: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must include a special character")
        .oneOf([Yup.ref('password'), "Both Passwords must match"])
        .required("Required"),
    privacy: Yup.boolean()
        .oneOf([true], "Must Accept Privacy Policy")
        .required("Must Accept Privacy Policy"),
    terms: Yup.boolean()
        .oneOf([true], "Must Accept Terms & Conditions")
        .required("Must Accept Terms & Conditions"),
});

function EmployeeInfo({ ...props }) {
    const [employee, setEmployee] = useState({ firstName: "", lastName: "", date: "", phone: "", password: "" });

    useEffect(() => {
        if (props.scope === "update") {
            const fetchData = async () => {
                try {
                    const employeeResponse = await fetch(`${EMPLOYEES_API}api/employee/${props.employeeId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": props.jwt
                        }
                    });
                    const empMap = await employeeResponse.json();
                    empMap[0].firstName = empMap[0].first_name;
                    empMap[0].lastName = empMap[0].last_name;
                    empMap[0].date = empMap[0].dob;

                    setEmployee(empMap[0]);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, []);

    return (
        <Formik
            initialValues={employee}
            enableReinitialize={true}
            validationSchema={EmployeeSchema}
            onSubmit={values => {
                props.handler(values);
            }}
            render={({ errors, touched, values, handleChange, handleBlur }) => (
                <React.Fragment>
                    <Form>
                        <FormSubInnerWrap>
                            <Field name="firstName" component={CustomTextField} label="First Name" icon="far fa-signature" classes={props.classes} required={true} fullWidth={true} />
                            <Field name="lastName" component={CustomTextField} label="Last Name" icon="far fa-signature" classes={props.classes} required={true} fullWidth={true} />

                            <div className={props.classes.tieredWrap}>
                                <div className={props.classes.tiered}>
                                    <Field type="tel" name="phone" component={CustomTextField} label="Phone" icon="far fa-phone" classes={props.classes} required={true} fullWidth={true} />
                                </div>
                                <div className={props.classes.tiered}>
                                    <Field type="date" name="date" component={CustomTextField} label="Date of Birth" icon="far fa-calendar-week" classes={props.classes} required={false} fullWidth={true} />
                                </div>
                            </div>

                            <div className={props.classes.tieredWrap}>
                                <div className={props.classes.tiered}>
                                    <Field type="password" name="password" component={CustomTextField} label="Password" icon="far fa-unlock-alt" classes={props.classes} required={true} fullWidth={true} />
                                </div>
                                <div className={props.classes.tiered}>
                                    <Field type="password" name="password2" component={CustomTextField} label="Validate Password" icon="far fa-unlock-alt" classes={props.classes} required={true} fullWidth={true} />
                                </div>
                            </div>
                            <Field name="terms" component={CustomCheckbox} label="I agree to the Terms & Conditions" required={true} fullWidth={true} route="terms" />
                            <Field name="privacy" component={CustomCheckbox} label="I agree to the Privacy Policy" required={true} fullWidth={true} route="privacy" />
                        </FormSubInnerWrap>
                        <Button variant="contained" color="primary" type="submit" className={props.classes.button}>
                            {props.scope === "new" ? "Select Provider" : "Update Employee Info"}
                        </Button>
                    </Form>
                </ React.Fragment>
            )}
        />
    )
};

export default EmployeeInfo;