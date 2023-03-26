import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/HomePage/Home/Home';
import LoginMahasiswa from './Pages/Auth/LoginMahasiswa/LoginMahasiswa';
import LoginDosen from './Pages/Auth/LoginDosen/LoginDosen';
import LoginAdmin from './Pages/Auth/LoginAdmin/LoginAdmin';
import AboutUs from './Pages/HomePage/AboutUs/AboutUs';
import AbsenMahasiswa from './Pages/Session/Mahasiswa/Absen Mahasiswa/AbsenMahasiswa';
import DashboardMahasiswa from './Pages/Session/Mahasiswa/Dashboard/DashboardMahasiswa';
import ProfilMahasiswa from './Pages/Session/Mahasiswa/Profil/ProfilMahasiswa';
import KalenderAkademik from './Pages/Session/Mahasiswa/KalenderAkademik/KalenderAkademik';
import DashboardDosen from './Pages/Session/Dosen/DashboardDosen/DashboardDosen';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Home Session */}
      <Route path='/' element={<Home />} />
      <Route path='/home/login-mahasiswa' element={<LoginMahasiswa />} />
      <Route path='/home/login-Dosen' element={<LoginDosen />} />
      <Route path='/home/login-Admin' element={<LoginAdmin />} />
      <Route path='/home/About-Us' element={<AboutUs />} />


    {/* Mahasiswa Session */}
      <Route path='/mahasiswa/dashboard' element={<DashboardMahasiswa/> } />
      <Route path='/mahasiswa/absen' element={<AbsenMahasiswa/> } />
      <Route path='/mahasiswa/profil' element={<ProfilMahasiswa/> } />
      <Route path='/mahasiswa/kalender-akademik' element={<KalenderAkademik/> } />


     {/* Dosen Session */} 
      <Route path='/dosen/dashboard' element={<DashboardDosen/> } />

      
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
