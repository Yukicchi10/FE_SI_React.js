import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, IconButton, Radio, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineFilePdf } from "react-icons/ai";
import Swal from "sweetalert2";
import { TextFieldForm } from "../../../Component/Input";

export function DetailTugas() {
  const { id } = useParams();
  const [data, setData] = useState();
  const date = new Date(data?.deadline);
  const formattedDate = date.toLocaleDateString("id-ID").replace(/\//g, "/");
  const [selectedValue, setSelectedValue] = useState("file");

  const timestamp = new Date(data?.deadline_time);
  const timeString = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [reloadTable, setReloadTable] = useState(false);
  const { control, watch, reset } = useForm({
    mode: "onSubmit",
  });
  const [files, setFiles] = useState();
  const handleUpload = (e) => {
    setFiles(e.target.files[0]);
  };
  const handleRemove = (e) => {
    setFiles(null);
  };

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaClass
        .detailTugas(id)
        .then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadTable]);

  const onSubmit = async (data) => {
    console.log(data);
    const fd = new FormData();
    fd.append("id_tugas", id);
    if (selectedValue === "file") {
      fd.append("file", files);
    } else {
      fd.append("link", watch("link"));
    }

    await apiMahasiswaClass.uploadTugas(fd).then(() => {
      setReloadTable(!reloadTable);
      Swal.fire("Success!", "Berhasil Mengumpulkan Tugas!", "success");
    });
  };

  const handleDelete = async () => {
    console.log(data);
    await apiMahasiswaClass
      .deleteTugas(data.pengumpulan[0].id)
      .then(() => setReloadTable(!reloadTable));
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Layout>
        <div class="border-t-8 border-gray-800 items-center text-gray-800 shadow-lg rounded-lg p-3">
          <div className="flex justify-between">
            <div class="text-2xl font-semibold"> {data?.title}</div>
            {data?.pengumpulan?.map((value) => {
              if (value.nilai === "0") {
                return (
                  <div class="text-lg font-semibold text-blue-800">
                    Belum dinilai
                  </div>
                );
              } else {
                return (
                  <div class="text-lg font-semibold text-blue-800">
                    Nilai : {value.nilai}
                  </div>
                );
              }
            })}
          </div>
          <div className="text-gray-500 text-sm italic">
            Deadline: {formattedDate} {timeString}
          </div>
          <div className="text-lg mt-2 bg-gray-100  p-2 rounded text-gray-500 mb-4">
            {data?.description}
          </div>
          {/* ketika belum mengumpulkan tugas */}
          {data?.pengumpulan?.length === 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center mb-2">
                <Radio
                  value="file"
                  checked={selectedValue === "file"}
                  onChange={(e) => {
                    setSelectedValue(e.target.value);
                    reset();
                  }}
                />
                <label>File</label>
                <Radio
                  value="link"
                  checked={selectedValue === "link"}
                  onChange={handleRadioChange}
                />
                <label>Link</label>
              </div>
              {selectedValue === "file" ? (
                <>
                  <Controller
                    control={control}
                    name="file"
                    render={({ field }) => (
                      <Box>
                        {files ? (
                          <Box
                            sx={{
                              display: "flex",
                              borderStyle: "solid",
                              borderWidth: "1px",
                              borderColor: "#d2d1d3",
                              borderRadius: "6px",
                              p: 2,
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  gap: 4,
                                  alignItems: "center",
                                }}
                              >
                                <AiOutlineFilePdf className="text-xl" />
                                <Typography
                                  sx={{ my: "auto" }}
                                  color="textPrimary"
                                  fontWeight="medium"
                                >
                                  {files?.name}
                                </Typography>
                              </Box>
                              <IconButton onClick={handleRemove}>
                                <AiOutlineClose />
                              </IconButton>
                            </Box>
                          </Box>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              component="label"
                              className="w-full"
                            >
                              Upload File
                              <input
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={(e) => handleUpload(e)}
                                className="w-full"
                              />
                            </Button>
                          </>
                        )}
                      </Box>
                    )}
                  />{" "}
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="contained"
                      disabled={!files}
                      onClick={onSubmit}
                    >
                      Kumpulkan
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <TextFieldForm
                    control={control}
                    name="link"
                    label="Link"
                    placeholder="Masukkan Link"
                    required
                  />{" "}
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="contained"
                      disabled={watch("link") === ""}
                      onClick={onSubmit}
                    >
                      Kumpulkan
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ketika sudah mengumpulkan tugas */}
          {data?.pengumpulan?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#d2d1d3",
                borderRadius: "6px",
                p: 2,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <AiOutlineFilePdf className="text-xl" />
                  <Link
                    to={data?.pengumpulan[0]?.file}
                    target="_blank"
                    sx={{ my: "auto" }}
                    className="text-gray-700 no-underline"
                    fontWeight="medium"
                  >
                    {data?.pengumpulan[0]?.filename}
                  </Link>
                </Box>
                {data?.pengumpulan[0]?.nilai === "0" && (
                  <IconButton onClick={handleDelete}>
                    <AiOutlineClose />
                  </IconButton>
                )}
              </Box>
            </Box>
          )}
        </div>
      </Layout>
    </>
  );
}
