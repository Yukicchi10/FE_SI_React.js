import React from 'react'
import NavBarHome from '../../../NavBarHome/NavBarHome'
import {
  MDBContainer,
  MDBCardImage,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import {useEffect, useState} from "react";
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import logo11 from '../../../Img/LogoSI.png'
import axios from "axios";
import './LoginDosen.css';

const LoginDosen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/guru/dashboard');
    }
  },[]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email',email);
    formData.append('password',password);

    await axios.post('api/auth/gurulogin', formData)
    .then((response) => {

      console.log(response.data.access_token);
      localStorage.setItem('token',response.data.access_token);

      navigate('/guru/dasboard');

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
            <p className="text-center">Selamat datang di E-learning Lemon para pengajar</p>
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
            <Button onClick={loginHandler} type="submit" className='btn btn-success mt-3 w-100' style={{color: 'white'}} size='lg'>Login</Button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default LoginDosen