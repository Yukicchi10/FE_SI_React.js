import React from "react";
import NavBarHome from "../../Component/NavBarHome/NavBarHome";
import { MDBContainer, MDBCardImage, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../lib/api/auth";
import axios from "axios";

export const LoginAdmin = () => {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("123456");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem("role") === "admin"){
      navigate('/admin/dashboard');
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios.post('api/auth/login', formData)
    .then((response) => {

      localStorage.setItem('token',response.data.access_token);
      localStorage.setItem('role',response.data.role);

      navigate('/admin/dashboard');

    }).catch((error) => {
      console.log(error.response.data);
      setValidation(error.response.data);
    })
  };

  return (
    <div>
      <NavBarHome />
      <MDBContainer className="form2">
        <MDBRow className="h101">
          <MDBCol>
            <p className="text-center h1 fw-bold">LOGIN ADMIN</p>
            <p className="text-center">
              Selamat datang di E-learning Lemon para pengajar
            </p>
            {validation.error && (
              <div className="alert alert-danger" role="alert">
                {validation.error}
              </div>
            )}
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Alamat Email
                </label>
                <input
                  label="Alamat Email"
                  type="text"
                  className="form-control"
                  id="emailsiswa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
                {validation.email && (
                  <small className="text-danger">{validation.email[0]}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordsiswa"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                />
                {validation.password && (
                  <small className="text-danger">
                    {validation.password[0]}
                  </small>
                )}
              </div>
            </form>
            <Button
              onClick={loginHandler}
              type="submit"
              className="btn btn-success mt-3 w-100"
              style={{ color: "white" }}
              size="lg"
            >
              Login
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};