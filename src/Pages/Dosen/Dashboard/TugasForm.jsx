import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { DateForm, TextFieldForm, TimeForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import apiDosenClass from "../../../lib/api/dosen/class";

const INITIAL = {
  title: "",
  description: "",
  deadline: new Date(),
};

export function TugasForm({ open, onClose, method, initialValue, onSuccess }) {
  const { id } = useParams();
  const [initialBody, setInitialBody] = useState(INITIAL);

  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(batchSchema),
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });

  useEffect(() => {
    const getData = () => {
      if (initialValue) {
        const body = initialValue;
        body.deadline = new Date();
        body.deadline_time = new Date();
        setInitialBody(initialValue);
        reset(initialValue);
      }
    };
    getData();
  }, [initialValue]);

  const onSubmit = async (data) => {
    const body = data;
    body.id_mapel = id;
    // body.deadline_time = new Date(data.deadline_time).toLocaleTimeString([], {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    if (method === "add") {
      await apiDosenClass.storeTugas(body).then(() => {
        onSuccess();
      });
    } else {
      await apiDosenClass.editTugas(data.id, data).then(() => {
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
              label="Judul Tugas"
              placeholder="Masukkan Judul Tugas"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="description"
              label="Deskripsi Tugas"
              placeholder="Masukkan Deskripsi Tugas"
              required
              disabled={method === "view"}
              multiline={3}
              minRows={3}
            />
          </Grid>{" "}
          <Grid item md={6} xs={12}>
            <DateForm
              label="Deadline tanggal"
              control={control}
              name="deadline"
              placeholder="Masukkan Deadline"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TimeForm
              label="Deadline waktu"
              control={control}
              name="deadline_time"
              placeholder="Masukkan Batas akhir pengumpulan"
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}