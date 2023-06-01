import { FormControl, Grid, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { DateForm, SelectForm, TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { GENDER_OPTIONS, RELIGI_OPTIONS } from "../../../lib/constant";
import apiManageLecturer from "../../../lib/api/admin/manageLecture";

const INITIAL = {
  nama: "",
  nidn: "",
  email: "",
  tempat: "",
  tgl_lahir: new Date(),
  jns_kelamin: "",
  agama: "",
  alamat: "",
  telepon: "",
  kd_pos: "",
};

function LecturerForm({ open, onClose, method, initialValue, onSuccess }) {
  const [initialBody, setInitialBody] = useState(INITIAL);
  const { control, handleSubmit, watch, reset } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(batchSchema),
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });

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
      await apiManageLecturer.store(data).then(() => {
        onSuccess();
      });
    } else {
      await apiManageLecturer.update(data.id, data).then(() => {
        onSuccess();
      });
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalForm open={open} onClose={onClose} handleSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="nama"
              label="Nama"
              placeholder="Masukkan Nama"
              required
              disabled={method === "view"}
            />
          </Grid>
          {method === "add" && (
            <>
              <Grid item md={6} xs={12}>
                <TextFieldForm
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Masukkan Email"
                  type="email"
                  required
                  disabled={method === "view"}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextFieldForm
                  control={control}
                  name="password"
                  label="Password"
                  placeholder="Masukkan Password"
                  required
                  disabled={method === "view"}
                />
              </Grid>
            </>
          )}

          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="nidn"
              label="NIDN"
              placeholder="Masukkan NIDN"
              required
              disabled={method === "view"}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="telepon"
              label="Telepon"
              placeholder="Masukkan No HP"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectForm
              control={control}
              name="jns_kelamin"
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              options={GENDER_OPTIONS}
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectForm
              control={control}
              name="agama"
              label="Agama"
              placeholder="Pilih Agama"
              options={RELIGI_OPTIONS}
              disabled={method === "view"}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="tempat"
              label="Tempat Lahir"
              placeholder="Masukkan Tempat Lahir"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DateForm
              label="Tanggal Lahir"
              control={control}
              name="tanggal"
              placeholder="Masukkan Tanggal Lahir"
              disabled={method === "view"}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="alamat"
              label="Alamat"
              placeholder="Masukkan Alamat"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="kd_pos"
              label="Kode Pos"
              placeholder="Masukkan Kode Pos"
              required
              disabled={method === "view"}
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}

export default LecturerForm;
