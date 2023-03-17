import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import LoginMahasiswa from './Pages/Auth/LoginMahasiswa/LoginMahasiswa';
import LoginDosen from './Pages/Auth/LoginDosen/LoginDosen';
import LoginAdmin from './Pages/Auth/LoginAdmin/LoginAdmin';
import AboutUs from './Pages/AboutUs/AboutUs';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home/login-mahasiswa' element={<LoginMahasiswa />} />
      <Route path='/home/login-Dosen' element={<LoginDosen />} />
      <Route path='/home/login-Admin' element={<LoginAdmin />} />
      <Route path='/home/About-Us' element={<AboutUs />} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
