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
import { useParams } from "react-router-dom";
import { ModalDelete } from "../../../Component/Modal";
import { StudentForm } from "./StudentForm";
import apiManageClass from "../../../lib/api/admin/manageClass";
import apiManageStudent from "../../../lib/api/admin/manageStudent";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import { SubjectForm } from "./SubjectForm";

export function AdminClassDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteMapel, setOpenDeleteMapel] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormMapel, setOpenFormMapel] = useState(false);
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
      await apiManageClass.view(id).then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadTable]);

  const handleDelete = async () => {
    await apiManageStudent.deleted(selectedData.id);
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
      <div class="bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800 shadow-lg rounded-lg p-6 z-10">
        <h6 class="text-2xl font-semibold mb-3"> {data?.nama_kelas}</h6>
        <p class="text-lg"> {data?.angkatan}</p>
      </div>
      <div className="flex mt-2 items-center">
        <div>
          <IconButton onClick={handleClick} color="white">
            <FiMenu className="" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenForm(true);
              }}
            >
              Tambah Mahasiswa
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenFormMapel(true);
              }}
            >
              Tambah Mata Kuliah
            </MenuItem>
          </Menu>
        </div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Mahasiswa" />
          <Tab label="Mata Kuliah" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
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
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">Mata Kuliah</TableCell>
                <TableCell className="!font-bold">SKS</TableCell>
                <TableCell className="!font-bold">Dosen</TableCell>
                <TableCell className="!font-bold">Ruang</TableCell>
                <TableCell className="!font-bold">Hari</TableCell>
                <TableCell className="!font-bold">Waktu</TableCell>
                <TableCell className="!font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.mapel.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nama_mapel}</TableCell>
                  <TableCell>{row.sks}</TableCell>
                  <TableCell>{row.teacher_name}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>{row.day}</TableCell>
                  <TableCell>
                    {row.start_time.toString()} - {row.end_time.toString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <FaPencilAlt
                        onClick={() => {
                          setSelectedData(row);
                          setOpenEditMapel(true);
                        }}
                        className="text-green-500 cursor-pointer"
                      />{" "}
                      <FaTrashAlt
                        onClick={() => {
                          setSelectedData(row);
                          setOpenDeleteMapel(true);
                        }}
                        className="text-red-500 cursor-pointer"
                      />{" "}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
      <SubjectForm
        method="add"
        open={openFormMapel}
        onClose={() => setOpenFormMapel(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenFormMapel(false);
        }}
      />
      <SubjectForm
        method="edit"
        open={openEditMapel}
        initialValue={selectedData}
        onClose={() => {
          setReloadTable(!reloadTable);
          setOpenEditMapel(false);
        }}
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
