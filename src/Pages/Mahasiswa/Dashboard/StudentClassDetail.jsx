import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { Layout } from "../Layout/Layout";
import {
  Tab,
  Tabs,
  Box,
  Grid,
  Button,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
} from "@mui/material";
import { FiExternalLink } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { GiWhiteBook } from "react-icons/gi";
import "./banner.css";
import Avatar from "../../../Component/Avatar";
import { ModalDelete } from "../../../Component/Modal";

export function StudentClassDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [threads, setThreads] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [thread, setThread] = useState("");
  const [selectedData, setSelectedData] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [recapAttendance, setRecapAttendance] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaClass
        .subjectDetail(id)
        .then((res) => setData(res.data.data));
      await apiMahasiswaClass
        .listThread(id)
        .then((res) => setThreads(res.data.data));
      await apiMahasiswaClass.recapAttendance(id).then((res) => {
        setRecapAttendance(res.data.data);
      });
    };
    getData();
  }, [reloadData]);

  const handleLike = async (idThread) => {
    const body = {
      id_thread: idThread,
      id_mapel: id,
    };
    await apiMahasiswaClass
      .likeThread(body)
      .then(() => setReloadData(!reloadData));
  };

  const handleSendThread = async () => {
    const body = {
      id_mapel: id,
      content: thread,
    };

    try {
      await apiMahasiswaClass.createThread(body).then(() => {
        setThread("");
        setReloadData(!reloadData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiMahasiswaClass.deleteThread(selectedData.id).then(() => {
        setReloadData(!reloadData);
        setOpenDelete(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAbsen = async (value, id) => {
    const body = {
      id_pertemuan: data.pertemuan[data.pertemuan.length - 1].id,
      status: value,
    };
    console.log(body);
    try {
      await apiMahasiswaClass.checkAttendance(body).then(() => {
        setReloadData(!reloadData);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="hero-banner">
        <div className="hero-content p-4">
          <h1 className="hero-title">{data?.nama_mapel}</h1>
          <p className="hero-description">{data?.deskripsi_mapel}</p>
          <p>
            {" "}
            {data?.day} | {data?.start_time} - {data?.end_time}{" "}
          </p>
        </div>
      </div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Materi" />
        <Tab label="Tugas" />
        <Tab label="Absen" />
        <Tab label="Ruang Diskusi" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          {data?.materi?.map((row) => (
            <div className="w-full px-2" key={row.id}>
              <div className="flex justify-between items-center mt-4 px-4 border-t-cyan-500 border-t-8 rounded overflow-hidden shadow-lg">
                <div className="flex gap-4 items-center py-4">
                  <GiWhiteBook className="text-cyan-600 text-8xl" />
                  <div>
                    <div className="font-bold text-xl">{row.judul}</div>
                    <div className="text-gray-500">{row.deskripsi}</div>
                  </div>
                </div>
                <Link
                  to={row.file}
                  target="_blank"
                  className="inline-block no-underline  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  <FiExternalLink className="text-xl" />
                </Link>
              </div>
            </div>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {data?.tugas?.map((row) => (
          <div className="w-full mt-4 border-l-8 border-cyan-500 rounded overflow-hidden shadow-lg">
            <div className="flex justify-between items-center px-6">
              <div className="py-4">
                <div className="font-bold text-xl">{row.title}</div>
                <div className="text-gray-500">{row.description}</div>
              </div>

              <Link
                to={`/tugas/${row.id}`}
                className="inline-block no-underline  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
              >
                <FiExternalLink className="text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div class="flex justify-between border-t-8 border-blue-500 mt-4 items-center bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800 shadow-lg rounded-lg p-3">
          <div>
            <h6 class="text-2xl font-semibold">Absensi Mandiri</h6>
            <p class="">Konfirmasi kehadiran untuk pertemuan ke {data?.pertemuan?.length} </p>
          </div>
          <Select
            defaultValue="-"
            onChange={(e) => handleAbsen(e.target.value)}
            className="text-white"
          >
            <MenuItem disabled value="-">
              Status
            </MenuItem>
            <MenuItem value="Hadir">Hadir</MenuItem>
            <MenuItem value="Sakit">Sakit</MenuItem>
            <MenuItem value="Izin">Izin</MenuItem>
            <MenuItem value="Tanpa Keterangan">Tanpa Keterangan</MenuItem>
          </Select>
        </div>
        <TableContainer component={Paper} className="mt-2">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} className="!font-bold">
                  Nama
                </TableCell>
                <TableCell
                  colSpan={data?.pertemuan?.length}
                  className="!font-bold text-center"
                >
                  Pertemuan ke
                </TableCell>
              </TableRow>
              <TableRow>
                {data?.pertemuan?.map((value) => (
                  <TableCell className="!font-bold text-center">
                    {value.pertemuan}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recapAttendance?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nama}</TableCell>
                  {row?.absen?.map((value) => (
                    <TableCell className="text-center">
                      {value.status}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="mt-2 bg-white">
          <TextField
            label="Buat Diskusi"
            value={thread}
            onChange={(e) => setThread(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            className="bg-white"
          />
          <div className="flex justify-end">
            <Button
              variant="contained"
              className="mt-2"
              disabled={!thread}
              onClick={handleSendThread}
            >
              Kirim
            </Button>
          </div>
        </div>

        {threads.map((row) => {
          const date = new Date(row.created_at);

          const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };

          const formattedTime = date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const formattedDate = date.toLocaleDateString("id-ID", options);
          const formattedDateTime = `${formattedDate} ${formattedTime}`;
          return (
            <div className="w-full p-4 mt-4 rounded overflow-hidden shadow-lg">
              <div className="flex gap-2 items-center">
                <Avatar name={row.name} />
                <div className="flex flex-col">
                  <div className="font-bold">{row.name}</div>
                  <div className="text-gray-500 text-sm">
                    {formattedDateTime}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-800">{row.content}</p>
              <div className="flex justify-between gap-1 items-center">
                <div className="flex items-center gap-2">
                  {row.isLike ? (
                    <AiFillLike
                      onClick={() => handleLike(row.id)}
                      className="cursor-pointer text-lg text-blue-500"
                    />
                  ) : (
                    <AiOutlineLike
                      onClick={() => handleLike(row.id)}
                      className="cursor-pointer text-lg"
                    />
                  )}
                  {row.likes}
                  <Link
                    to={`/kelas/diskusi/${row.id}`}
                    className="cursor-pointer no-underline text-center text-gray-500"
                  >
                    <AiOutlineComment />
                  </Link>
                  {row.replies}
                </div>

                {row.isMe && (
                  <FaTrashAlt
                    onClick={() => {
                      setSelectedData(row);
                      setOpenDelete(true);
                    }}
                    className="text-gray-700 cursor-pointer"
                  />
                )}
              </div>
            </div>
          );
        })}
      </TabPanel>
      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

const TabPanel = ({ children, value, index }) => {
  return (
    <div className={`${value !== index ? "hidden" : ""}`}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};