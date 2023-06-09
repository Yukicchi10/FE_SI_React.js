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
  Grid,
} from "@mui/material";
import { FiExternalLink } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { GiWhiteBook } from "react-icons/gi";
import "./banner.css";

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
