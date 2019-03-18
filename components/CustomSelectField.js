import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from '@material-ui/core/FormHelperText'
import NativeSelect from '@material-ui/core/NativeSelect';

export default ({
    field,
    form: { values, touched, errors, handleChange },
    ...props
}) => {
    return (
        <FormControl
            required
            className={props.classes.formControl}
            margin="normal"
            error={touched[field.name] && Boolean(errors[field.name])}
        >
            <InputLabel
                shrink
                htmlFor={field.name}
                variant="outlined"
            >
                {props.label}
            </InputLabel>
            <NativeSelect
                onChange={handleChange}
                value={values[field.name]}
                input={
                    <OutlinedInput
                        labelWidth={0}
                        name={field.name}
                        id={field.name}
                    />
                }
                style={{ width: 225 }}
            >
                <option value="" />
                {props.selection.map(selector => (
                    <option value={selector} key={selector}>
                        {selector}
                    </option>
                ))}
            </NativeSelect>
            {touched[field.name] && Boolean(errors[field.name]) ? <FormHelperText>{errors[field.name]}</FormHelperText> : ""}
        </FormControl>
    )
};