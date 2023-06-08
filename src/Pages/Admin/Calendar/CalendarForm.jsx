import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { DateForm, TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import apiManageClass from "../../../lib/api/admin/manageClass";
import apiManageCalendar from "../../../lib/api/admin/calendar";

const INITIAL = {
  title:"",
  start: new Date(),
  end: new Date(),
};

export function CalendarForm({
  open,
  onClose,
  method,
  initialValue,
  onSuccess,
}) {
  const [initialBody, setInitialBody] = useState(INITIAL);
  const { control, handleSubmit, reset, watch } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(batchSchema),
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });
  const startDate = watch("start");
  useEffect(() => {
    const getData = () => {
      if (initialValue) {
        setInitialBody(initialValue);
        reset(initialValue);
      }
    };
    getData();
  }, [initialValue]);

  const onSubmit = async (data) => {
    if (method === "add") {
      await apiManageCalendar.store(data).then(() => {
        onSuccess();
      });
    } else {
      await apiManageClass.update(data.id, data).then(() => {
        onSuccess();
      });
    }
    setInitialBody(INITIAL);
    reset(INITIAL);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalForm open={open} onClose={onClose} handleSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="title"
              label="Agenda"
              placeholder="Masukkan Nama Agenda"
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DateForm
              label="Tanggal Mulai Agenda"
              control={control}
              name="start"
              placeholder="Masukkan Tanggal Mulai"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DateForm
              label="Tanggal Berakhir Agenda"
              control={control}
              name="end"
              placeholder="Masukkan Tanggal Berakhir"
              maxDate={startDate}
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}
