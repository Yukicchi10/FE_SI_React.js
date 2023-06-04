import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";

export const MataKuliah = () => {
  const [mapel, setMapel] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaClass
        .subjectList()
        .then((res) => setMapel(res.data.data));
    };
    getData();
  }, []);
  return (
    <Layout>
      <TableContainer component={Paper} className="mt-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="!font-bold">Nama</TableCell>
              <TableCell className="!font-bold">SKS</TableCell>
              <TableCell className="!font-bold">Dosen</TableCell>
              <TableCell className="!font-bold">Ruang</TableCell>
              <TableCell className="!font-bold">Hari</TableCell>
              <TableCell className="!font-bold">Waktu</TableCell>
              <TableCell className="!font-bold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapel.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama_mapel}</TableCell>
                <TableCell>{row.sks} SKS</TableCell>
                <TableCell>{row.teacher_name}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>
                  {row.start_time} - {row.end_time}
                </TableCell>
                <TableCell>
                  <FaEye
                    onClick={() => {
                      window.location.href = `/class/${row.id}`;
                    }}
                    className="text-blue-500 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
