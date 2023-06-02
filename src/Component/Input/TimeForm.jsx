import { FormControl, FormHelperText, TextField } from "@mui/material";
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import React from "react";
import { useController } from "react-hook-form";
import id from "date-fns/locale/id"

export const TimeForm = ({ name, control, helperText, label }) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={id}>
        <TimePicker
          label={label}
          {...field}
          renderInput={(params) => <TextField {...params} />}
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
      </LocalizationProvider>
    </FormControl>
  );
};
