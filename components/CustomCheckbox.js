import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from "next/link";
import Typography from '@material-ui/core/Typography';

export default ({
    field,
    form: { values, touched, errors, handleBlur, handleChange, handleSubmit },
    ...props
}) => {

    return (
        <React.Fragment>
            <div>
                <Checkbox
                    checked={values[field.name] || ""}
                    onChange={handleChange}
                    value={field.name}
                    name={field.name}
                    id={field.name}
                />
                <Typography variant="body2" style={{ display: 'inline-block' }}>
                    <Link href={props.route}>
                        <a target="_blank">
                            <i className="far fa-file-contract"></i>
                        </a>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    {props.label}
                </Typography>
                {Boolean(errors[field.name]) ? <FormHelperText>{errors[field.name]}</FormHelperText> : ""}
            </div>
        </React.Fragment>
    )
};