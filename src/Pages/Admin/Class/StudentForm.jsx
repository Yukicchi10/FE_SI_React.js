import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { DateForm, SelectForm, TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { GENDER_OPTIONS, RELIGI_OPTIONS } from "../../../lib/constant";
import { useParams } from "react-router-dom";
import apiManageStudent from "../../../lib/api/admin/manageStudent";

const INITIAL = {
  nama: "",
  nim: "",
  email: "",
  tempat: "",
  // tgl_lahir: new Date(),
  jns_kelamin: "",
  agama: "",
  alamat: "",
  telepon: "",
  kd_pos: "",
  nama_ayah: "",
  nama_ibu: "",
};
const convertDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export function StudentForm({
  open,
  onClose,
  method,
  initialValue,
  onSuccess,
}) {
  const { id } = useParams();
  const [initialBody, setInitialBody] = useState(INITIAL);
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(batchSchema),
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });
  console.log(initialValue);
  useEffect(() => {
    const getData = () => {
      if (initialValue) {
        initialValue.tgl_lahir = new Date(initialValue.tgl_lahir);
        setInitialBody(initialValue);
        reset(initialValue);
      }
    };
    getData();
  }, [initialValue]);

  const onSubmit = async (data) => {
    const body = data;
    // body.tgl_lahir = convertDate(data.tgl_lahir)
    body.id_class = id;
    if (method === "add") {
      await apiManageStudent.store(body).then(() => {
        onSuccess();
      });
    } else {
      await apiManageStudent.update(data.id, body).then(() => {
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
              name="nim"
              label="NIM"
              placeholder="Masukkan NIM"
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
              name="nama_ayah"
              label="Nama Ayah"
              placeholder="Masukkan Nama Ayah"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="nama_ibu"
              label="Nama Ibu"
              placeholder="Masukkan Nama Ibu"
              required
              disabled={method === "view"}
            />
          </Grid>
          <>
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
                name="tgl_lahir"
                placeholder="Masukkan Tanggal Lahir"
                disabled={method === "view"}
              />
            </Grid>
          </>

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
