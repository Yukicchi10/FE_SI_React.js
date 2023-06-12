import React from "react";
import NavBarHome from "../../../Component/NavBarHome/NavBarHome";
import Card from "react-bootstrap/Card";
import { Button, CardImg, Col, Row } from "react-bootstrap";
import "./ProfilDosen.css";
import { Container, Nav, Form, Table } from "react-bootstrap";
import Yopi from "../../../Img/Dosen/yopi2-600x529.jpg";
import Sukrina from "../../../Img/Dosen/Sukrina Herman.jpeg";
import Dinar from "../../../Img/Dosen/Dinar Rahayu, M.Kom.jpg";
import Irdham from "../../../Img/Dosen/irdham denni.jpeg";
import Elin from "../../../Img/Dosen/Elin Rosliani.jpg";
import Tedi from "../../../Img/Dosen/Tedi Budiman, M.Kom.jpg";
import whatsapp from "../../../Img/whatsapp (2).png";
import fb from "../../../Img/facebook.png";
import ig from "../../../Img/instagram.png";
import CardGroup from "react-bootstrap/CardGroup";
import { NavLink } from "react-router-dom";

function ListDosen() {
  return (
    <div>
      <NavBarHome />
      <div>
        <label className="d-flex justify-content-center mt-4 h3 fw-bold">
          Dosen Program Studi Sistem Informasi
        </label>
        <label className="d-flex justify-content-center mt-1 h5 fw-bold">
          Institut Pendidikan Indonesia Garut
        </label>
        <CardGroup className="d-flex justify-content-center mt-8">
          <Row>
            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={Yopi} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Yopi Nugraha, M.Kom
                  </Card.Title>
                  <Card.Text className="nidn">NIDN : 0412029202</Card.Text>
                  <Card.Text className="nidn2">
                    Kepala Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row className="justify-content-md-center" xs="auto">
                    <Col>
                      <NavLink to="https://wa.me/6285352288810" target="_blank">
                        <img className="d-flex whatsapp" src={whatsapp} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to="https://www.facebook.com/profile.php?id=100077447298996"
                        target="_blank"
                      >
                        <img className="whatsapp" src={fb} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to="https://www.instagram.com/yopi_nugraha/"
                        target="_blank"
                      >
                        <img className="whatsapp" src={ig} />
                      </NavLink>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={Sukrina} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Sukrina Herman, M.Kom
                  </Card.Title>
                  <Card.Text className="nidn">NIDN : 0402069501</Card.Text>
                  <Card.Text className="nidn2">
                    Dosen Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row className="justify-content-md-center" xs="auto">
                    <Col>
                      <NavLink to="https://wa.me/6285352288810" target="_blank">
                        <img className="d-flex whatsapp" src={whatsapp} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to="https://www.facebook.com/profile.php?id=100077447298996"
                        target="_blank"
                      >
                        <img className="whatsapp" src={fb} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to="https://www.instagram.com/yopi_nugraha/"
                        target="_blank"
                      >
                        <img className="whatsapp" src={ig} />
                      </NavLink>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={Dinar} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Dinar Rahayu, M.Kom
                  </Card.Title>
                  <Card.Text className="nidn">NIDN : 0412109007</Card.Text>
                  <Card.Text className="nidn2">
                    Dosen Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row className="justify-content-md-center" xs="auto">
                    <Col>
                      <NavLink to="https://wa.me/6285352288810" target="_blank">
                        <img className="d-flex whatsapp" src={whatsapp} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to="https://www.facebook.com/profile.php?id=100077447298996"
                        target="_blank"
                      >
                        <img className="whatsapp" src={fb} />
                      </NavLink>
                    </Col>

                    <Col>
                      <NavLink
                        to=" https://www.instagram.com/yopi_nugraha/"
                        target="_blank"
                      >
                        <img className="whatsapp" src={ig} />
                      </NavLink>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </CardGroup>

        <CardGroup className="d-flex justify-content-center mt-8">
          <Row>
            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img src={Elin} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Dr. Elin Rosliani, M.Kom
                  </Card.Title>
                  <Card.Text className="nidn">NIDN : 0428037803</Card.Text>
                  <Card.Text className="nidn2">
                    Dosen Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={Irdham} />
                <Card.Body>
                  <Card.Title className="fw-bold">Irdam Denni. M.T</Card.Title>
                  <Card.Text className="nidn">NIDN : 0430037602</Card.Text>
                  <Card.Text className="nidn2">
                    Dosen Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={Tedi} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Tedi Budiman, M.Kom
                  </Card.Title>
                  <Card.Text className="nidn">NIDN : 0410067601</Card.Text>
                  <Card.Text className="nidn2"></Card.Text>
                  <Card.Text>
                    Dosen Program Studi Sistem Informasi Institut Pendidikan
                    Indonesia
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>
      </div>
    </div>
  );
}

export default ListDosen;
