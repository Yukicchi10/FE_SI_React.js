import { useEffect, useState } from "react";
import { FaTrashAlt, FaPencilAlt, FaEye } from "react-icons/fa";
import { Layout } from "../Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { ModalDelete } from "../../../Component/Modal";
import { StudentForm } from "./StudentForm";
import apiManageClass from "../../../lib/api/admin/manageClass";
import apiManageStudent from "../../../lib/api/admin/manageStudent";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import { MateriForm, SubjectForm } from "./MateriForm";
import apiDosenClass from "../../../lib/api/dosen/class";

export function DosenClassDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteMapel, setOpenDeleteMapel] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormMateri, setOpenFormMateri] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditMapel, setOpenEditMapel] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [reloadTable, setReloadTable] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getData = async () => {
      await apiDosenClass
        .subjectDetail(id)
        .then((res) => setData(res.data.data));
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
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Materi" />
        <Tab label="Mahasiswa" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          <button className="bg-yellow-400 mt-4 text-white flex p-2 rounded" onClick={() => setOpenFormMateri(true)}>
            Tambah Materi
          </button>
          {data?.materi.map((row) => (
            <div className="w-full mt-4 border-l-yellow-500 border-l-8 rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl">{row.judul}</div>
                <div>{row.deskripsi}</div>
                {/* <div>{row.sks} SKS</div> 
                  <div className="text-sm font-bold">Dosen:</div>
                  <div>{row.teacher_name}</div>
                  <div className="bg-gray-50 p-2 rounded">
                    {" "}
                    <div className="text-gray-700 text-base">
                      {row.day} | {row.start_time.toString()} -{" "}
                      {row.end_time.toString()}
                    </div>
                    <div className="text-gray-700 text-base">{row.room}</div>
                  </div> */}
              </div>
              <div className="flex gap-2 px-6 pb-4">
                <Link
                  to={row.file}
                  target="_blank"
                  className="inline-block no-underline  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  Lihat
                </Link>
                {/* <span
                  onClick={() => {
                    setSelectedData(row);
                    setOpenEditMapel(true);
                  }}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  Edit
                </span> */}
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
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">NIM</TableCell>
                <TableCell className="!font-bold">Nama</TableCell>
                <TableCell className="!font-bold">Alamat</TableCell>
                <TableCell className="!font-bold">Telepon</TableCell>
                <TableCell className="!font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {data?.mahasiswa.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nim}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.alamat}</TableCell>
                  <TableCell>{row.telepon}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <FaEye
                        onClick={() => {
                          setSelectedData(row);
                          setOpenView(true);
                        }}
                        className="text-blue-500 cursor-pointer"
                      />
                      <FaPencilAlt
                        onClick={() => {
                          setSelectedData(row);
                          setOpenEdit(true);
                        }}
                        className="text-green-500 cursor-pointer"
                      />{" "}
                      <FaTrashAlt
                        onClick={() => {
                          setSelectedData(row);
                          setOpenDelete(true);
                        }}
                        className="text-red-500 cursor-pointer"
                      />{" "}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </TabPanel>
      <StudentForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenForm(false);
        }}
      />
      <StudentForm
        method="view"
        open={openView}
        initialValue={selectedData}
        onClose={() => setOpenView(false)}
      />
      <StudentForm
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
