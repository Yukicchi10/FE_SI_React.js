import React from 'react'
import NavBarHome from '../../Component/NavBarHome/NavBarHome'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const LoginDosen = () => {

  const [email, setEmail] = useState("novi@mail.com");
  const [password, setPassword] = useState("123456");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem("role") === "dosen"){
      navigate('/dosen/dashboard');
    }
  },[]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email',email);
    formData.append('password',password);

    await axios.post('api/auth/login', formData)
    .then((response) => {

      localStorage.setItem('token',response.data.access_token);
      localStorage.setItem('role',response.data.role);
      window.location.href = "/dosen/dashboard"

    }).catch((error) => {
      console.log(error.response.data);
      setValidation(error.response.data);
    })
  }

  return (
    <div>
      <NavBarHome/>
      <MDBContainer>
        <MDBRow className="h101">
          <MDBCol>
            <p className="text-center h1 fw-bold">LOGIN DOSEN</p>
            <p className="text-center">Selamat datang di LMS Sistem Informasi</p>
              {
                validation.error && (
                  <div className="alert alert-danger" role="alert">
                    { validation.error }
                    </div>
                )
              }
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Alamat Email</label>
                <input label="Alamat Email" type="text" className="form-control" id="emailsiswa" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com"/>
                {
                  validation.email && (
                  <small className="text-danger">
                    { validation.email[0] }
                  </small>
                  )
                }
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Kata Sandi</label>
                <input type="password" className="form-control" id="passwordsiswa" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"/>
                {
                  validation.password && (
                    <small className="text-danger">
                      { validation.password[0] }
                    </small>
                  )
                }
              </div>
            </form>
            <button onClick={loginHandler} type="submit" className='!bg-[#F7C04A] p-2 rounded btn text-white mt-3 w-100' size='lg'>Login</button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}