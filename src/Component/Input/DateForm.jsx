import { FormHelperText, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import React from 'react'
import { useController } from 'react-hook-form'
import id from "date-fns/locale/id"

export function DateForm({ name, control, label, minDate,disabled }) {
    const { field, fieldState } = useController({ name, control })
    const { error } = fieldState

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={id}>
      <DatePicker
        label={label}        
        inputFormat="dd/MM/yyyy"
        InputProps={{ sx: { width: "100%" } }}
        disabled={disabled}
        {...field}
        renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
      />
      {Boolean(error) && (
        <FormHelperText sx={{ color: "error.main", mx: 0 }}>{error?.message}</FormHelperText>
      )}
    </LocalizationProvider>
  )
}
