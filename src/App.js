import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';


import Home from './Pages/HomePage/Home/Home';
import LoginMahasiswa from './Pages/Auth/LoginMahasiswa/LoginMahasiswa';
import LoginDosen from './Pages/Auth/LoginDosen/LoginDosen';
import LoginAdmin from './Pages/Auth/LoginAdmin/LoginAdmin';
import AboutUs from './Pages/HomePage/AboutUs/AboutUs';
import AbsenMahasiswa from './Pages/Session/Mahasiswa/AbsenMahasiswa/AbsenMahasiswa';
import DashboardMahasiswa from './Pages/Session/Mahasiswa/Dashboard/DashboardMahasiswa';
import ProfilMahasiswa from './Pages/Session/Mahasiswa/Profil/ProfilMahasiswa';
import KalenderAkademik from './Pages/Session/Mahasiswa/KalenderAkademik/KalenderAkademik';
import DashboardDosen from './Pages/Session/Dosen/DashboardDosen/DashboardDosen';
import MataKuliah from './Pages/Session/Mahasiswa/MataKuliah/MataKuliah';
import MateriMahasiswa from './Pages/Session/Mahasiswa/Materi/MateriMahasiswa';
import TugasMahasiswa from './Pages/Session/Mahasiswa/TugasMahasiswa/TugasMahasiswa';
import ProfilDosen from './Pages/HomePage/ProfilDosen/ProfilDosen';


function App() {
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Accept'] = 'application/json';
    // axios.defaults.withCredentials = true;
  
  return (
    <BrowserRouter>
    <Routes>
      {/* Home Session */}
      <Route path='/' element={<Home />} />
      <Route path='/home/login-mahasiswa' element={<LoginMahasiswa />} />
      <Route path='/home/login-Dosen' element={<LoginDosen />} />
      <Route path='/home/login-Admin' element={<LoginAdmin />} />
      <Route path='/home/About-Us' element={<AboutUs />} />
      <Route path='/home/profil-dosen' element={<ProfilDosen />} />


    {/* Mahasiswa Session */}
      <Route path='/mahasiswa/dashboard' element={<DashboardMahasiswa/> } />
      <Route path='/mahasiswa/absen' element={<AbsenMahasiswa/> } />
      <Route path='/mahasiswa/profil' element={<ProfilMahasiswa/> } />
      <Route path='/mahasiswa/kalender-akademik' element={<KalenderAkademik/> } />
      <Route path='/mahasiswa/mata-kuliah' element={<MataKuliah/> } />
      <Route path='/mahasiswa/materi-mahasiswa' element={<MateriMahasiswa/> } />
      <Route path='/mahasiswa/tugas-mahasiswa' element={<TugasMahasiswa/> } />


     {/* Dosen Session */} 
      <Route path='/dosen/dashboard' element={<DashboardDosen/> } />

      
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
