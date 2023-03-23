import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/HomePage/Home/Home';
import LoginMahasiswa from './Pages/Auth/LoginMahasiswa/LoginMahasiswa';
import LoginDosen from './Pages/Auth/LoginDosen/LoginDosen';
import LoginAdmin from './Pages/Auth/LoginAdmin/LoginAdmin';
import AboutUs from './Pages/HomePage/AboutUs/AboutUs';
import AbsenMahasiswa from './Pages/Session/Mahasiswa/Absen Mahasiswa/AbsenMahasiswa';
import DashboardMahasiswa from './Pages/Session/Mahasiswa/Dashboard/DashboardMahasiswa';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home/login-mahasiswa' element={<LoginMahasiswa />} />
      <Route path='/home/login-Dosen' element={<LoginDosen />} />
      <Route path='/home/login-Admin' element={<LoginAdmin />} />
      <Route path='/home/About-Us' element={<AboutUs />} />

      <Route path='/mahasiswa/dashboard' element={<DashboardMahasiswa/> } />
      <Route path='/mahasiswa/absen' element={<AbsenMahasiswa/> } />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
