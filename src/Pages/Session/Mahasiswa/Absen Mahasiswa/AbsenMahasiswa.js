import React, { useState } from 'react'
import { Button, Container, Card, Form, Table } from 'react-bootstrap';
import SideBar from '../../../../Component/SideBar';
import TopNavigation from '../../../../Component/TopNavigation';
import './AbsenMahasiswa.css'

const AbsenMahasiswa = () => {
  const [data, setData] = useState({})

  return (
    <div>
        <TopNavigation/>
        <SideBar/>
        <div>
      <Container className='mt-5'>
       
          <Card.Header>
            <Card.Title><h5 className='labelabsensiswa fw-bold'>ABSENSI SISWA</h5></Card.Title>
          </Card.Header>
          <Card.Body>
            <div className='jamabsensiswa fw-bold'>JAM / HARI : </div>
            <div className='jamabsensiswa'></div>

            <Form.Group className="mb-3 mt-3 ketabsensiswa">
              <Form.Label htmlFor="disabledSelect" className='fw-bold'>KETERANGAN :</Form.Label>
              <Form.Select id="keteranganAbsen">
                <option disabled selected>- Silahkan Pilih -</option>
                <option>Hadir</option>
                <option>Izin</option>
                <option>Sakit</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 mt-3 ketabsensiswa">
              <Form.Label className='fw-bold' >CATATAN</Form.Label>
              <Form.Control type="Text" placeholder='Silahkan isi jika berhalangan hadir' />
            </Form.Group>

            <Button variant="warning" className='absensiswa'>Absen</Button>
          </Card.Body>
        
        <Table striped bordered hover size='lg' className='text-center mt-4'>
        <thead>
          <tr>
            <th>No</th>
            <th>Hari/Tanggal</th>
            <th>Jam</th>
            <th>Keterangan</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {data.length>0 
            ? data.map((item, key)=>{
              return (
                <tr>
                  <td>1</td>
                  <td>Senin, 14 November</td>
                  <td>09:00</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )
            }) 
            :(
              <tr>
                <td colSpan={5}>Data tidak ditemukan</td>
              </tr>
            )
          }
        </tbody>
        </Table>
      </Container>
      </div>
    </div>
  )
}

export default AbsenMahasiswa

