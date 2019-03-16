import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default ({
    field,
    form: { values, handleChange },
    ...props
}) => {
    return (
        <FormControl required className={props.classes.formControl} margin="normal">
            <InputLabel
                shrink
                htmlFor={field.name}
                variant="outlined"
            >
                {props.label}
        </InputLabel>
            <Select
                onChange={handleChange}
                value={values[field.name]}
                input={
                    <OutlinedInput
                        labelWidth={0}
                        name={field.name}
                        id={field.name}
                    />
                }
                style={{ width: 250 }}
                displayEmpty
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.selection.map(selector => (
                    <MenuItem value={selector} key={selector}>
                        {selector}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};