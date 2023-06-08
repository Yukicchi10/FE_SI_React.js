import React from "react";
import NavBarHome from "../../../Component/NavBarHome/NavBarHome";
import { Col, Container, Row } from "react-bootstrap";
import Exam from "../../../Img/exam.png";
import LogoSI from "../../../Img/LogoSI.png";
import "./Home.css";
import apiDosenProfil from "../../../lib/api/dosen/profil";
import apiMahasiswaProfil from "../../../lib/api/mahasiswa/profil";
import apiManageClass from "../../../lib/api/admin/manageClass";

function Home() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "admin": {
      const getData = async () => {
        try {
          await apiManageClass.dashboard().then(() => {
            window.location.href = "/admin/dashboard";
          });
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.reload();
        }
      };
      getData();
      return;
    }

    case "dosen": {
      const getData = async () => {
        try {
          await apiDosenProfil.info().then(() => {
            window.location.href = "/dosen/dashboard";
          });
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.reload();
        }
      };
      getData();
      return;
    }

    case "mahasiswa": {
      const getData = async () => {
        try {
          await apiMahasiswaProfil.info().then(() => {
            window.location.href = "/dashboard";
          });
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.reload();
        }
      };
      getData();
      return;
    }

    default:
      break;
  }

  return (
    <div>
      <NavBarHome />
      <Container>
        <Row className="h101">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <img fluid src={LogoSI} width="450px" height="auto" alt="logo" />
            </div>
          </Col>
          <Col className="d-flex align-items-center">
            <img fluid src={Exam} width="620px" height="auto" alt="logo" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
