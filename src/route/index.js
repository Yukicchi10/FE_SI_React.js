import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginAdmin, LoginDosen, LoginMahasiswa } from "./../Pages/Auth";
import { AdminClass, AdminClassDetail, DashboardAdminPage, LecturerTable } from "./../Pages/Admin";
import {
  AbsenMahasiswa,
  DashboardStudent,
  KalenderAkademik,
  MataKuliah,
  MateriMahasiswa,
  ProfilMahasiswa,
  StudentClassDetail,
  TugasMahasiswa
} from "./../Pages/Mahasiswa";
import Home from "./../Pages/HomePage/Home/Home";
import AboutUs from "./../Pages/HomePage/AboutUs/AboutUs";
import { DashboardDosenPage, DosenClassDetail, DosenTugas, MataKuliahDosen, MateriDosenPage, ProfilDosen } from "./../Pages/Dosen";

export function RoutePage() {    
  return (
    <Routes>
      {/* Home Session */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginMahasiswa />} />
      <Route path="/login/lecturer" element={<LoginDosen />} />
      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="/home/About-Us" element={<AboutUs />} />
      <Route path="/home/profil-dosen" element={<ProfilDosen />} />

      {/* Admin Session */}
      <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
      <Route path="/admin/class" element={<AdminClass />} />
      <Route path="/admin/class/:id" element={<AdminClassDetail />} />
      <Route path="/admin/manage-lecturer" element={<LecturerTable />} />

      {/* Dosen Session */}
      <Route path="/dosen/dashboard" element={<DashboardDosenPage />} />
      <Route path="/dosen/materi" element={<MateriDosenPage />} />
      <Route path="/dosen/tugas" element={<DosenTugas />} />
      <Route path="/dosen/class/:id" element={<DosenClassDetail />} />
      <Route path="/dosen/profil" element={<ProfilDosen />} /> 

      {/* Mahasiswa Session */}
      <Route path="/dashboard" element={<DashboardStudent />} />
      <Route path="/materi" element={<MateriMahasiswa />} />
      <Route path="/tugas" element={<TugasMahasiswa />} />
      <Route path="/kelas/:id" element={<StudentClassDetail />} />
      <Route path="/mahasiswa/absen" element={<AbsenMahasiswa />} />
      <Route path="/profil" element={<ProfilMahasiswa />} />
      <Route
        path="/mahasiswa/kalender-akademik"
        element={<KalenderAkademik />}
      />
    </Routes>
  );
}