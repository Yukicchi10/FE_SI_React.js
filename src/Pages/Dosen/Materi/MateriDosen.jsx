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
// import { StudentForm } from "./StudentForm";
import apiManageClass from "../../../lib/api/admin/manageClass";
import apiManageStudent from "../../../lib/api/admin/manageStudent";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
// import { MateriForm, SubjectForm } from "./MateriForm";
import apiDosenClass from "../../../lib/api/dosen/class";

export function MateriDosenPage() {
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
      await apiDosenClass.listMateri().then((res) => setData(res.data.data));
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
      <div class="relative border-l-8 border-yellow-800 items-center bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 shadow-lg rounded-lg p-3">
        <h6 class="text-2xl font-semibold"> Materi</h6>
      </div>
      {data?.map((row) => (
        <div className="w-full mt-4  rounded overflow-hidden shadow-lg">
          <div className="p-2 font-bold text-white bg-yellow-500">
            {row.judul}
          </div>
          <div className="flex justify-between items-center px-6">
            <div className="py-4">
              <div className="text-lg">{row.deskripsi}</div>
              <div className="text-gray-500">{row.nama_mapel}</div>
            </div>

            <Link
              to={row.file}
              target="_blank"
              className="no-underline  bg-gray-200 hover:text-yellow-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Lihat Materi
            </Link>
          </div>
        </div>
      ))}
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
      {/* <StudentForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenForm(false);
        }}
      /> */}
      {/* <StudentForm
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
      /> */}
      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
      {/* <MateriForm
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
      /> */}
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
