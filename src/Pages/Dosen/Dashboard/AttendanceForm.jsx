import React from "react";
import { useParams } from "react-router-dom";
import apiDosenClass from "../../../lib/api/dosen/class";
import Modal from "../../../Component/Modal/ModalBase";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function AttendanceForm({ open, onClose, selectedData, onSuccess }) {
  const { id } = useParams();

  const onSubmit = async (data, id) => {
    console.log(data);
    const body = {
      id_pertemuan: selectedData.id,
      id_mahasiswa: id,
      status: data,
    };
    try {
      await apiDosenClass.checkAttendance(body);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <div data-cy="modal-information" className="bg-white p-5 rounded">
        <p className="text-gray-800 mb-2 text-center font-bold">
          Absensi Pertemuan ke {selectedData?.pertemuan}
        </p>
        <TableContainer component={Paper} className="mt-2 max-h-96">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">NIM</TableCell>
                <TableCell className="!font-bold">Nama</TableCell>
                <TableCell className="!font-bold">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedData?.absen?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nim}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={row.status}
                      onChange={(e) => onSubmit(e.target.value, row.id_mahasiswa)}
                    >
                      <MenuItem disabled value="-">
                        Status
                      </MenuItem>
                      <MenuItem value="Hadir">Hadir</MenuItem>
                      <MenuItem value="Sakit">Sakit</MenuItem>
                      <MenuItem value="Izin">Izin</MenuItem>
                      <MenuItem value="Tanpa Keterangan">
                        Tanpa Keterangan
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
}