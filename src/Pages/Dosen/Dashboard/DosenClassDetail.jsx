import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import {
  Tab,
  Tabs,
  Box,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  TableRow,
  TableContainer,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { ModalDelete } from "../../../Component/Modal";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import { MateriForm } from "./MateriForm";
import apiDosenClass from "../../../lib/api/dosen/class";
import { TugasForm } from "./TugasForm";
import { MeetingForm } from "./MeetingForm";
import { AttendanceForm } from "./AttendanceForm";

export function DosenClassDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [value, setValue] = useState(3);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteMapel, setOpenDeleteMapel] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormMateri, setOpenFormMateri] = useState(false);
  const [openFormMeeting, setOpenFormMeeting] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditMapel, setOpenEditMapel] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [reloadTable, setReloadTable] = useState(false);
  const [meetingSoon, setMeetingSoon] = useState();
  const [recapAttendance, setRecapAttendance] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await apiDosenClass.subjectDetail(id).then((res) => {
          setData(res.data.data);
          setMeetingSoon(res.data.data.pertemuan.length + 1);
        });
        await apiDosenClass.recapAttendance(id).then((res) => {
          setRecapAttendance(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [reloadTable]);

  const handleDelete = async () => {
    await apiDosenClass.materiDelete(selectedData.id);
    setReloadTable(!reloadTable);
    setOpenDelete(false);
  };

  const handleDeleteMapel = async () => {
    await apiManageSubject.deleted(selectedData.id);
    setReloadTable(!reloadTable);
    setOpenDeleteMapel(false);
  };

  return (
    <Layout>
      <div className="bg-gray-900 mt-4 rounded">
        <div className="overflow-hidden">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex py-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-xl tracking-tight font-extrabold text-white sm:text-5xl md:text-4xl">
                  <span className="text-yellow-400">{data?.nama_mapel}</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl md:mt-5 md:text-xl">
                  {data?.deskripsi_mapel}
                </p>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 md:mt-5">
                  {data?.day} | {data?.start_time} - {data?.end_time}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Materi" />
        <Tab label="Tugas" />
        <Tab label="Absen" />
        <Tab label="Rekap Absen" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          <button
            className="bg-yellow-400 mt-4 text-white flex p-2 rounded"
            onClick={() => setOpenFormMateri(true)}
          >
            Tambah Materi
          </button>
          {data?.materi.map((row) => (
            <div className="w-full mt-4 border-l-yellow-500 border-l-8 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl">{row.judul}</div>
                <div>{row.deskripsi}</div>
              </div>
              <div className="flex gap-2 px-6 pb-4">
                <Link
                  to={row.file}
                  target="_blank"
                  className="inline-block no-underline  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  Lihat
                </Link>
                <span
                  onClick={() => {
                    setSelectedData(row);
                    setOpenDelete(true);
                  }}
                  className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white cursor-pointer"
                >
                  Hapus
                </span>
              </div>
            </div>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          <button
            className="bg-yellow-400 mt-4 text-white flex p-2 rounded"
            onClick={() => setOpenForm(true)}
          >
            Tambah Tugas
          </button>
          {data?.tugas.map((row) => (
            <div className="w-full mt-4 border-l-yellow-500 border-l-8 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl">{row.title}</div>
                <div>{row.description}</div>
              </div>
              <div className="flex gap-2 px-6 pb-4">
                <span
                  onClick={() => {
                    setSelectedData(row);
                    setOpenEdit(true);
                  }}
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  Edit
                </span>
                <span
                  onClick={() => {
                    setSelectedData(row);
                    setOpenDelete(true);
                  }}
                  className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white cursor-pointer"
                >
                  Hapus
                </span>
              </div>
            </div>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {" "}
        <button
          className="bg-yellow-400 mt-4 text-white flex p-2 rounded"
          onClick={() => setOpenFormMeeting(true)}
        >
          Tambah Pertemuan
        </button>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          {data?.pertemuan?.map((row) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
              <div className="flex justify-between border-t-8 border-t-yellow-700 items-center  mt-4 p-4 rounded-md overflow-hidden shadow-lg">
                <div className="flex gap-2 items-center">
                  <GiTeacher className="text-yellow-500" size={36} />
                  <div className="font-bold text-xl text-gray-500">
                    Pertemuan {row.pertemuan}
                  </div>
                </div>
                <MdPendingActions
                  className="text-yellow-900 cursor-pointer"
                  size={24}
                  onClick={() => {
                    setSelectedData(row);
                    setOpenAttendance(true);
                  }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
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
                    <TableCell className="text-center" >{value.status}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TugasForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenForm(false);
        }}
      />
      <MeetingForm
        meetingSoon={meetingSoon}
        open={openFormMeeting}
        onClose={() => setOpenFormMeeting(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenFormMeeting(false);
        }}
      />
      <AttendanceForm
        meetingSoon={meetingSoon}
        open={openAttendance}
        selectedData={selectedData}
        onClose={() => {
          setReloadTable(!reloadTable);
          setOpenAttendance(false);
        }}
      />
      <TugasForm
        method="edit"
        open={openEdit}
        initialValue={selectedData}
        onClose={() => setOpenEdit(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenEdit(false);
        }}
      />
      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
      <MateriForm
        method="add"
        open={openFormMateri}
        onClose={() => setOpenFormMateri(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenFormMateri(false);
        }}
      />
      <MateriForm
        method="edit"
        open={openEditMapel}
        initialValue={selectedData}
        onClose={() => setOpenEditMapel(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenEditMapel(false);
        }}
      />
      <ModalDelete
        open={openDeleteMapel}
        onClose={() => setOpenDeleteMapel(false)}
        handleDelete={handleDeleteMapel}
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
