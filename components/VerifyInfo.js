import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import FormSubInnerWrap from "../components/FormSubInnerWrap";
import Button from "@material-ui/core/Button"
import CustomTextField from "../components/CustomTextField";
import * as Yup from "yup";

const VerifySchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    code: Yup.string()
        .length(8, "Code must be 8 characters!")
        .matches(/[A-Z0-9{0,8}]/, "Code doesn't match expected format!")
        .required("Required"),
});

function VerifyInfo({ ...props }) {
    const [verify, setVerify] = useState({ code: "", email: "" });

    return (
        <Formik
            initialValues={verify}
            enableReinitialize={true}
            validationSchema={VerifySchema}
            onSubmit={values => {
                props.handler(values);
            }}
            render={({ errors, touched, values, handleChange, handleBlur }) => (
                <React.Fragment>
                    <Form>
                        <FormSubInnerWrap>
                            <Field name="email" component={CustomTextField} label="Email" icon="far fa-envelope-square" classes={props.classes} required={true} fullWidth={true} />
                            <Field name="code" component={CustomTextField} label="Code" icon="far fa-key-skeleton" classes={props.classes} required={true} fullWidth={true} />
                        </FormSubInnerWrap>
                        <Button variant="contained" color="primary" type="submit" className={props.classes.button}>
                            Validate Info
                        </Button>
                    </Form>
                </ React.Fragment>
            )}
        />
    )
};

export default VerifyInfo;