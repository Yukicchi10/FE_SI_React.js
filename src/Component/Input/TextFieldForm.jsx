import { FormControl, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export function TextFieldForm({
  name,
  control,
  placeholder: placeHolder,
  label,
  isShrink = false,
  type = "text",
  inputProps,
  multiline,
  minRows,
  helperText,
  disabled,
  required = false,
}) {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;
  return (
    <FormControl fullWidth>
      <TextField
        {...(minRows && { minRows: minRows })}
        {...(multiline && { multiline: multiline })}
        type={type}
        label={label}
        required={required}
        {...(placeHolder && { placeholder: placeHolder })}
        error={Boolean(error)}
        {...(isShrink && { InputLabelProps: { shrink: true } })}
        {...field}
        {...(inputProps && { InputProps: inputProps })}
        disabled={disabled}
      />
      {error ? (
        <FormHelperText sx={{ color: "error.main", mx: 0 }}>
          {error?.message ?? helperText}
        </FormHelperText>
      ) : (
        helperText && (
          <FormHelperText sx={{ color: "rgba(58, 53, 65, 0.68)", mx: 0 }}>
            {helperText}
          </FormHelperText>
        )
      )}
    </FormControl>
  );
}
