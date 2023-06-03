import React, { useEffect, useState } from "react";
import { Card, Nav, Form, Table } from "react-bootstrap";
import { Layout } from "../Layout/Layout";
import apiDosenProfil from "../../../lib/api/dosen/profil";

const convertDate = (data) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString("en-GB");
  return formattedDate;
};

export const ProfilDosen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      await apiDosenProfil.info().then((res) => setUser(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <Table>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Item className="h5 fw-bold">Profil Dosen</Nav.Item>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control name="nama" value={user.nama} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>NIDN</Form.Label>
              <Form.Control type="email" value={user.nidn} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alamat Rumah</Form.Label>
              <Form.Control type="email" value={user.alamat} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control type="email" value={user.kd_pos} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user.email} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control type="email" value={user.tempat} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control type="email" value={convertDate(user.tgl_lahir)} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control type="email" value={user.jns_kelamin} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Agama</Form.Label>
              <Form.Control type="email" value={user.agama} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control type="email" value={user.telepon} disabled />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <small id="password" class="form-text text-muted">
            Jika data diatas masih belum sesuai, silahkan hubungi admin
          </small>
        </Card.Footer>
      </Table>
    </Layout>
  );
};
