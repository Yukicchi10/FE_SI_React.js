import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavBarHome from '../../Component/NavBarHome/NavBarHome'
import {MDBContainer, MDBCardImage, MDBRow, MDBCol, } from 'mdb-react-ui-kit';

export function LoginMahasiswa(){

  const [email, setEmail] = useState("budi@mail.com");
  const [password, setPassword] = useState("123456");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem("role") === "mahasiswa"){
      navigate('/dashboard');
    }
  },[]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email',email);
    formData.append('password',password);

    await axios.post('/api/auth/login', formData)
    .then((response) => {

      console.log(response.data.access_token);
      localStorage.setItem('token',response.data.access_token);
      localStorage.setItem('role',response.data.role);

      navigate('/dashboard');

    }).catch((error) => {
      console.log(error.response.data);
      setValidation(error.response.data);
    })
  }

  return (
    <div>
        <NavBarHome/>
        <MDBContainer>
        <MDBRow className="d-flex align-items-center h101">
          <MDBCol>
            <p className="text-center h1 fw-bold">LOGIN MAHASISWA</p>
            <p className="text-center">Selamat datang di LMS Sistem informasi</p>
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
                <input label="Alamat Email" type="text" className="form-control" id="emailsiswa" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="NPM/NIM"/>
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
                <input defaultValue="123456" type="password" className="form-control" id="passwordsiswa" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"/>
                {
                  validation.password && (
                    <small className="text-danger">
                      { validation.password[0] }
                    </small>
                  )
                }
              </div>
            </form>
           
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
            </label>
            </div>
            </div>
            <button onClick={loginHandler} type="submit" className='!bg-[#03318c] p-2 rounded btn text-white mt-3 w-100' size='lg'>Login</button>
        
        </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}