import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineFilePdf } from "react-icons/ai";

export function DetailTugas() {
  const { id } = useParams();
  const [data, setData] = useState();
  const date = new Date(data?.created_at);
  const formattedDate = date.toLocaleDateString("id-ID").replace(/\//g, "/");
  const [reloadTable, setReloadTable] = useState(false);
  const { control } = useForm({
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

  const onSubmit = async () => {
    console.log(id);
    const fd = new FormData();
    fd.append("id_tugas", id);
    fd.append("file", files);
    await apiMahasiswaClass.uploadTugas(fd).then(() => {
      setReloadTable(!reloadTable);
    });
  };

  const handleDelete = async () =>{
    console.log(data)
    await apiMahasiswaClass.deleteTugas(data.pengumpulan[0].id).then(() => setReloadTable(!reloadTable))
  }

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
          <div className="text-gray-500 text-sm"> {formattedDate}</div>
          <div className="text-lg mt-2 bg-gray-100  p-2 rounded text-gray-500 mb-4">
            {data?.description}
          </div>
          {/* ketika belum mengumpulkan tugas */}
          {data?.pengumpulan?.length === 0 && (
            <div className="bg-gray-50 p-4 rounded">
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
              />
              <div className="flex justify-end mt-2">
                <Button
                  variant="contained"
                  disabled={!files}
                  onClick={onSubmit}
                >
                  Kumpulkan
                </Button>
              </div>
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
                <IconButton onClick={handleDelete}>
                  <AiOutlineClose />
                </IconButton>
              </Box>
            </Box>
          )}
        </div>
      </Layout>
    </>
  );
}
