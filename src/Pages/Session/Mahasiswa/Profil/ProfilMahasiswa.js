import React, { useEffect, useState } from 'react';
import SideBar from '../../../../Component/SideBar';
import { Container, Card, Nav, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavigation from '../../../../Component/TopNavigation';

const ProfilMahasiswa = () => {

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://127.0.0.1:8000/api/auth/me')
    .then((response) => {
      setUser(response.data);
    })
  }

  useEffect(() => {
    if(!token){
      navigate('/login');
    }

    fetchData();
  },[]);


  return (
    <div className='flex flex-column'> 
    <div>
      <SideBar/>
      </div>
      <TopNavigation/>
     
      <Container className='mt-4'>

        <Table>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Item className='h5 fw-bold'>Profil Mahasiswa</Nav.Item>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control name='nama' value={user.nama} disabled />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>NIM</Form.Label>
                <Form.Control type="email" value={user.nim} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Alamat Rumah</Form.Label>
                <Form.Control type="email" value={user.alamat} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Kode Pos</Form.Label>
                <Form.Control type="email" value={user.kd_pos} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nama Ayah</Form.Label>
                <Form.Control type="email" value={user.nama_ayah} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nama Ibu</Form.Label>
                <Form.Control type="email" value={user.nama_ibu} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tempat Lahir</Form.Label>
                <Form.Control type="email" value={user.tempat} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control type="email" value={user.tgl_lahir} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Control type="email" value={user.jns_kelamin} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Agama</Form.Label>
                <Form.Control type="email" value={user.agama} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="email" value={user.telepon} disabled/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <small id="password" class="form-text text-muted">Jika data diatas masih belum sesuai, silahkan hubungi Wali Kelas</small>
          </Card.Footer>
        </Table>
      </Container>
    </div>
  )
}

export default ProfilMahasiswa