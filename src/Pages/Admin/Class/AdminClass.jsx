import { useEffect, useState } from "react";
import { FaTrashAlt, FaPencilAlt,} from "react-icons/fa";
import { Layout } from "../Layout/Layout";
import { Typography, Grid } from "@mui/material";
import { ModalDelete } from "../../../Component/Modal";
import { AdminClassForm } from "./AdminClassForm";
import apiManageClass from "../../../lib/api/admin/manageClass";
import { MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";

export function AdminClass() {
  const [data, setData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await apiManageClass.index().then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadTable]);

  const handleDelete = async () => {
    await apiManageClass.deleted(selectedData.id);
    setReloadTable(!reloadTable);
    setOpenDelete(false);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Typography variant="h4"> Kelas</Typography>
        <button
          onClick={() => setOpenForm(true)}
          className="!bg-blue-500 p-2 rounded text-white"
        >
          Tambah
        </button>
      </div>
      <Grid container rowSpacing={4} columnSpacing={1} className="">
        {data.map((value) => (
          <Grid item md={4} xs={12} key={value.id}>
            <div className="bg-blue-600 p-2 rounded relative">
              <MdSchool className="absolute -top-6 text-4xl" />

              <div className="flex justify-between">
                <h3 className="text-white">{value.nama_kelas}</h3>
                <p className="bg-blue-800 text-white p-1 text-xs absolute top-0 right-0 rounded">
                  {value.angkatan}
                </p>
              </div>
              <div className="flex gap-2 bg-white items-center p-1 rounded mt-4">
                <Link
                  to={`/admin/class/${value.id}`}
                  className="text-blue-500 bg-gray-300 hover:bg-blue-300 p-1 rounded no-underline w-full text-center"
                >
                  <div>Lihat Kelas</div>
                </Link>
                <div className=" border bg-white border-blue-200 p-1 rounded">
                  <FaPencilAlt
                    onClick={() => {
                      setSelectedData(value);
                      setOpenEdit(true);
                    }}
                    className="text-green-500 cursor-pointer"
                  />{" "}
                </div>

                <div className=" border bg-white border-blue-200 p-1 rounded">
                  <FaTrashAlt
                    onClick={() => {
                      setSelectedData(value);
                      setOpenDelete(true);
                    }}
                    className="text-red-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <AdminClassForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpenForm(false);
        }}
      />
      <AdminClassForm
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
