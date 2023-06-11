import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { TimeForm, SelectForm, TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { DAY_OPTIONS } from "../../../lib/constant";
import { useParams } from "react-router-dom";
import apiManageLecturer from "../../../lib/api/admin/manageLecture";
import apiManageSubject from "../../../lib/api/admin/manageSubject";

const INITIAL = {
  nama_mapel: "",
  deskripsi_mapel: "",
  day: "",
  room: "",
  sks: "",
  start_time: new Date(),
  end_time: new Date(),
};

export function SubjectForm({
  open,
  onClose,
  method,
  initialValue,
  onSuccess,
}) {
  const { id } = useParams();
  const [initialBody, setInitialBody] = useState(INITIAL);
  const [lecturerOptions, setLecturerOptions] = useState([]);
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(batchSchema),
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });

  useEffect(() => {
    const getData = async () => {
      await apiManageLecturer.index().then((res) => {
        const data = res.data.data.map((v) => {
          return {
            value: v.id,
            label: v.nama,
          };
        });
        setLecturerOptions(data);
      });
    };
    getData();
  }, [open]);

  useEffect(() => {
    const getData = () => {
      if (initialValue) {
        const body = initialValue;
        body.start_time = new Date();
        body.end_time = new Date();
        setInitialBody(body);
        reset(body);
      }
    };
    getData();
  }, [initialValue]);

  const onSubmit = async (data) => {
    const body = data;
    body.id_class = id;
    body.start_time = new Date(data.start_time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    body.end_time = new Date(data.end_time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (method === "add") {
      await apiManageSubject.store(body).then(() => {
        onSuccess();
      });
    } else {
      await apiManageSubject.update(data.id, body).then(() => {
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
              name="nama_mapel"
              label="Nama Mata Kuliah"
              placeholder="Masukkan Nama Mata Kuliah"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="deskripsi_mapel"
              label="Deskripsi Mapel"
              placeholder="Masukkan Deskripsi mata Kuliah"
              required
              disabled={method === "view"}
              multiline={3}
              minRows={3}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="room"
              label="Nama Ruang"
              placeholder="Masukkan Nama Ruang"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="sks"
              label="Jumlah SKS"
              placeholder="Masukkan Jumlah SKS"
              type="number"
              required
              disabled={method === "view"}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <SelectForm
              control={control}
              name="day"
              label="Hari"
              placeholder="Pilih Hari"
              options={DAY_OPTIONS}
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectForm
              control={control}
              name="id_dosen"
              label="Dosen"
              placeholder="Pilih Dosen"
              options={lecturerOptions}
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TimeForm
              label="Mulai"
              control={control}
              name="start_time"
              placeholder="Masukkan Jam Mulai"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TimeForm
              label="Selesai"
              control={control}
              name="end_time"
              placeholder="Masukkan Jam Selesai"
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}
