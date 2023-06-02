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
} from "./../Pages/Mahasiswa";
import Home from "./../Pages/HomePage/Home/Home";
import AboutUs from "./../Pages/HomePage/AboutUs/AboutUs";
import ProfilDosen from "./../Pages/HomePage/ProfilDosen/ProfilDosen";
import { DashboardDosenPage } from "./../Pages/Dosen";
import TugasMahasiswa from "./../Pages/Mahasiswa/TugasMahasiswa";

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
      <Route path="/lecturer/dashboard" element={<DashboardDosenPage />} /> 

      {/* Mahasiswa Session */}
      <Route path="/dashboard" element={<DashboardStudent />} />
      <Route path="/mahasiswa/absen" element={<AbsenMahasiswa />} />
      <Route path="/mahasiswa/profil" element={<ProfilMahasiswa />} />
      <Route
        path="/mahasiswa/kalender-akademik"
        element={<KalenderAkademik />}
      />
      <Route path="/mahasiswa/mata-kuliah" element={<MataKuliah />} />
      <Route path="/mahasiswa/materi-mahasiswa" element={<MateriMahasiswa />} />
      <Route path="/mahasiswa/tugas-mahasiswa" element={<TugasMahasiswa />} />
    </Routes>
  );
}