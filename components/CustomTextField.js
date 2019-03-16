import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default ({
    field,
    form: { values, touched, errors, handleBlur, handleChange },
    ...props
}) => {
    return (
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
            helperText={touched[field.name] && Boolean(errors[field.name]) ? errors[field.name] : ""}
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
};