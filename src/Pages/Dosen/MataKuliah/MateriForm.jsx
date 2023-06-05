import { Box, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ModalForm } from "../../../Component/Modal";
import {
  TimeForm,
  SelectForm,
  TextFieldForm,
  PDFFileUploader,
} from "../../../Component/Input";
import { Controller, useForm } from "react-hook-form";
import { DAY_OPTIONS } from "../../../lib/constant";
import { useParams } from "react-router-dom";
import apiManageLecturer from "../../../lib/api/admin/manageLecture";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import apiDosenClass from "../../../lib/api/dosen/class";

const INITIAL = {
  nama_mapel: "",
  deskripsi_mapel: "",
  day: "",
  room: "",
  sks: "",
  start_time: new Date(),
  end_time: new Date(),
};

export function MateriForm({ open, onClose, method, initialValue, onSuccess }) {
  const { id } = useParams();
  const [initialBody, setInitialBody] = useState(INITIAL);
  const [lecturerOptions, setLecturerOptions] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const body = data;
    const fd = new FormData();
    fd.append("id_mapel", id);
    fd.append("judul", data.judul);
    fd.append("deskripsi", data.deskripsi);
    fd.append("file", attachment);

    if (method === "add") {
      await apiDosenClass.uploadMateri(fd).then(() => {
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

  const handleUpload = (f) => {
    if (!f) {
      return;
    }
    setAttachment(f);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalForm open={open} onClose={onClose} handleSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="judul"
              label="Judul Materi"
              placeholder="Masukkan Judul Materi"
              required
              disabled={method === "view"}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextFieldForm
              control={control}
              name="deskripsi"
              label="Deskripsi Materi"
              placeholder="Masukkan Deskripsi Materi"
              required
              disabled={method === "view"}
              multiline={3}
              minRows={3}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <Box>
                  <PDFFileUploader
                    onUpload={(f) => {
                      handleUpload(f);
                      field.onChange(f.name);
                    }}
                    onRemove={() => setAttachment(null)}
                  />
                </Box>
              )}
            />
          </Grid>
        </Grid>
      </ModalForm>
    </form>
  );
}
