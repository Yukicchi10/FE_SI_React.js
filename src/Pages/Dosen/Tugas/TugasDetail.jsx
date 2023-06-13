import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiDosenClass from "../../../lib/api/dosen/class";
import { FaEye } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import { PenilaianForm } from "./PenilaianForm";

export function TugasDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiDosenClass.detailTugas(id).then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadTable]);

  return (
    <>
      <Layout>
        <div class="border-l-8 border-yellow-800 items-center bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 shadow-lg rounded-lg p-3">
          <h6 class="text-2xl font-semibold"> {data?.title}</h6>
          <div className="text-lg mb-2">{data?.description}</div>
        </div>
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">NO</TableCell>
                <TableCell className="!font-bold">NIM</TableCell>
                <TableCell className="!font-bold">Nama</TableCell>
                <TableCell className="!font-bold">Status</TableCell>
                <TableCell className="!font-bold">Nilai</TableCell>
                <TableCell className="!font-bold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.pengumpulan?.map((row, index) => {
                const deadlineDate = new Date(data?.deadline);
                const deadlineTime = new Date(data?.deadline_time);
                const deadlineTimeString = deadlineTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const pengumpulanTime = new Date(row?.created_at);
                const pengumpulanTimeString =
                  pengumpulanTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                const pengumpulanDate = new Date(row?.created_at);
                return (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.nim}</TableCell>
                    <TableCell>{row.nama_mahasiswa}</TableCell>
                    <TableCell>
                      {pengumpulanDate < deadlineDate
                        ? "Tepat Waktuk"
                        : pengumpulanDate === deadlineDate &&
                          pengumpulanTimeString < deadlineTimeString
                        ? "Tepat Waktup"
                        : "Terlambat"}
                    </TableCell>
                    <TableCell>
                      {row.nilai === "0" ? "Belum Dinilai" : row.nilai}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Link
                          to={row.file}
                          target="_blank"
                          className="no-underline mr-2 rounded py-2 text-sm font-semibold cursor-pointer"
                        >
                          {" "}
                          <FaEye className="text-blue-500 cursor-pointer" />
                        </Link>
                        <GrScorecard
                          onClick={() => {
                            setSelectedData(row);
                            setOpen(true);
                          }}
                          className="!ext-green-500 cursor-pointer"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>

      <PenilaianForm
        open={open}
        initialValue={selectedData}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setReloadTable(!reloadTable);
          setOpen(false);
        }}
      />
    </>
  );
}