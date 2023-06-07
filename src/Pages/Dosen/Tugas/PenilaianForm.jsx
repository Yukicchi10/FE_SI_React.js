import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import { TextFieldForm } from "../../../Component/Input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import apiDosenClass from "../../../lib/api/dosen/class";

const INITIAL = {
  nilai: "",
};

export function PenilaianForm({
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
    await apiDosenClass.nilaiTugas(data.id, data).then(() => {
      onSuccess();
    });
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
              name="nilai"
              label="Beri Nilai"
              placeholder="Masukkan Nilai"
              required
              type="number"         
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}
