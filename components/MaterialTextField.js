import React from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default ({ image, alttext, available, onClick }) => {

    return (
        <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.company_name}
            id="company_name"
            label="Company Name"
            className={classes.textField}
            error={errors.company_name}
            type="text"
            name="company_name"
            margin="normal"
            variant="outlined"
            required={true}
            fullWidth={true}
            InputLabelProps={{
                classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                },
            }}
            InputProps={{
                classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <i className="far fa-building"></i>
                    </InputAdornment>
                ),
            }}
        />
    )
}
