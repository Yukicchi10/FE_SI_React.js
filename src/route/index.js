import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginAdmin, LoginDosen, LoginMahasiswa } from "./../Pages/Auth";
import {
  AdminClass,
  AdminClassDetail,
  CalendarAcademic,
  DashboardAdminPage,
  LecturerTable,
} from "./../Pages/Admin";
import {
  AbsenMahasiswa,
  DashboardStudent,
  DetailTugas,
  MateriMahasiswa,
  ProfilMahasiswa,
  StudentClassDetail,
  TugasMahasiswa,
} from "./../Pages/Mahasiswa";
import Home from "./../Pages/HomePage/Home/Home";
import AboutUs from "./../Pages/HomePage/AboutUs/AboutUs";
import {
  DashboardDosenPage,
  DosenClassDetail,
  DosenTugas,
  TugasDetail,
  MateriDosenPage,
  ProfilDosen,
  CalendarAcademicDosen,
} from "./../Pages/Dosen";
import { CalendarAcademicStudent } from "../Pages/Mahasiswa/Calendar/CalendarAcademic";
import DiscussionPage from "../Pages/Mahasiswa/Dashboard/DiscussionPage";
import DosenDiscussionPage from "../Pages/Dosen/Dashboard/DosenDiscussionPage";
import Login from "../Pages/Auth/Login";

export function RoutePage() {
  return (
    <Routes>
      {/* Home Session */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/lecturer" element={<LoginDosen />} />
      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/home/profil-dosen" element={<ProfilDosen />} />

      {/* Admin Session */}
      <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
      <Route path="/admin/class" element={<AdminClass />} />
      <Route path="/admin/class/:id" element={<AdminClassDetail />} />
      <Route path="/admin/manage-lecturer" element={<LecturerTable />} />
      <Route path="/admin/kalender-akademik" element={<CalendarAcademic />} />

      {/* Dosen Session */}
      <Route path="/dosen/dashboard" element={<DashboardDosenPage />} />
      <Route path="/dosen/class/:id" element={<DosenClassDetail />} />
      <Route path="/dosen/materi" element={<MateriDosenPage />} />
      <Route path="/dosen/tugas" element={<DosenTugas />} />
      <Route path="/dosen/tugas/:id" element={<TugasDetail />} />
      <Route path="/dosen/profil" element={<ProfilDosen />} />
      <Route path="/dosen/kalender-akademik" element={<CalendarAcademicDosen />} />
      <Route path="/dosen/kelas/diskusi/:id" element={<DosenDiscussionPage />} />

      {/* Mahasiswa Session */}
      <Route path="/dashboard" element={<DashboardStudent />} />
      <Route path="/kelas/:id" element={<StudentClassDetail />} />
      <Route path="/kelas/diskusi/:id" element={<DiscussionPage />} />
      <Route path="/materi" element={<MateriMahasiswa />} />
      <Route path="/tugas" element={<TugasMahasiswa />} />
      <Route path="/tugas/:id" element={<DetailTugas />} />
      <Route path="/mahasiswa/absen" element={<AbsenMahasiswa />} />
      <Route path="/profil" element={<ProfilMahasiswa />} />
      <Route
        path="/kalender-akademik"
        element={<CalendarAcademicStudent />}
      />
    </Routes>
  );
}
