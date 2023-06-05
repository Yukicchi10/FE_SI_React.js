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
import { FiExternalLink } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { ModalDelete } from "../../../Component/Modal";
import apiManageClass from "../../../lib/api/admin/manageClass";
import apiManageStudent from "../../../lib/api/admin/manageStudent";
import apiManageSubject from "../../../lib/api/admin/manageSubject";
import apiDosenClass from "../../../lib/api/dosen/class";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";

export function StudentClassDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaClass
        .subjectDetail(id)
        .then((res) => setData(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div className="relative bg-gray-900 mt-4 rounded">
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative sm:py-16">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    <span className="block text-indigo-400">
                      {data?.nama_mapel}
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl md:mt-5 md:text-2xl">
                    {data?.deskripsi_mapel}
                  </p>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 md:mt-5">{data?.day} | {data?.start_time} - {data?.end_time} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Materi" />
        <Tab label="Mahasiswa" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          {data?.materi.map((row) => (
            <div className="sm:w-1/2 px-2" key={row.id}>
              <div className="flex justify-between items-center mt-4 border-l-cyan-500 border-l-8 rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl">{row.judul}</div>
                  <div>{row.deskripsi}</div>
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
