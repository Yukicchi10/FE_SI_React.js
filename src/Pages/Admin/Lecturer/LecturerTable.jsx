import { useEffect, useMemo, useState } from "react";
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
  Typography,
} from "@mui/material";
import apiManageLecturer from "../../../lib/api/admin/manageLecture";
import { ModalDelete } from "../../../Component/Modal";
import { useForm } from "react-hook-form";
import LecturerForm from "./LecturerForm";

export function LecturerTable() {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await apiManageLecturer.index().then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadTable]);

  const handleDelete = async () => {
    await apiManageLecturer.deleted(selectedData.id);
    setReloadTable(!reloadTable);
    setOpenDelete(false);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <Typography variant="h4"> Dosen Pengajar</Typography>
        <button
          onClick={() => setOpenForm(true)}
          className="!bg-blue-500 p-2 rounded text-white"
        >
          Tambah
        </button>
      </div>
      <TableContainer component={Paper} className="mt-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="!font-bold">NIDN</TableCell>
              <TableCell className="!font-bold">Nama</TableCell>
              <TableCell className="!font-bold">Alamat</TableCell>
              <TableCell className="!font-bold">Telepon</TableCell>
              <TableCell className="!font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nidn}</TableCell>
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
      <LecturerForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenForm(false);
        }}
      />
      <LecturerForm
        method="view"
        open={openView}
        initialValue={selectedData}
        onClose={() => setOpenView(false)}
      />
      <LecturerForm
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
    </Layout>
  );
}
