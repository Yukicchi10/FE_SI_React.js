import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { SelectForm, TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { YEAR_OPTIONS } from "../../../lib/constant";
import apiManageClass from "../../../lib/api/admin/manageClass";

const INITIAL = {
  nama: "",
  angkatan:""
};

export function AdminClassForm({ open, onClose, method, initialValue, onSuccess }) {
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
        setInitialBody(initialValue);
        reset(initialValue);
      }
    };
    getData();
  }, [initialValue]);

  const onSubmit = async (data) => {
    if (method === "add") {
      await apiManageClass.store(data).then(() => {
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
          <Grid item md={6} xs={12}>
            <TextFieldForm
              control={control}
              name="nama_kelas"
              label="Nama Kelas"
              placeholder="Masukkan Nama Kelas"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectForm
              control={control}
              name="angkatan"
              label="Angkatan"
              placeholder="Pilih Angkatan(Tahun Masuk)"
              options={YEAR_OPTIONS}
              disabled={method === "view"}
            />
          </Grid>
          
        </Grid>
      </ModalForm>
    </form>
  );
}