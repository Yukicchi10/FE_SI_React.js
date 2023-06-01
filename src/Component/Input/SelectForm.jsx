import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export const SelectForm = ({
  name,
  control,
  options,
  label,
  placeholder: placeHolder,
  helperText,
  disabled,
}) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel
        id={`select-label-${name}`}
        {...(Boolean(placeHolder) && { shrink: true })}
      >
        {label}
      </InputLabel>
      {/* @ts-ignore */}
      <Select
        {...field}
        disabled={disabled}
        fullWidth
        labelId={`select-label-${name}`}
        id={`select-${name}`}
        label={label}
        {...(Boolean(placeHolder) && {
          displayEmpty: true,
          notched: true,
          renderValue:
            field.value !== ""
              ? undefined
              : () => (
                  <Typography sx={{ color: "#C5c3c6" }}>
                    {placeHolder}
                  </Typography>
                ),
        })}
        {...(Boolean(placeHolder) && {
          displayEmpty: true,
          notched: true,
        })}
      >
        {options.map((opt, i) => (
          <MenuItem value={opt.value} key={i}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

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
};
