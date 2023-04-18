import React from 'react'
import SideBar from '../../../../Component/SideBar'
import TopNavigation from '../../../../Component/TopNavigation'
import { Button, Container, Card, Form, Table, Col } from 'react-bootstrap';


const MataKuliah = () => {
  return (
    <div>
        <TopNavigation/>
        <SideBar/>
        <div>
        <Container className='mt-5'>
        
        <Card.Header>
            <Card.Title><h5 className='labelabsensiswa fw-bold'>Mata Kuliah</h5></Card.Title>
          </Card.Header>
    <Card>
      <Card.Header as="h5">Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


    <Form.Label className='fw-bold mt-4'>Tahun Studi</Form.Label>
    <Form.Select as={Col} aria-label="Default select example" className='mb-2'>
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Button variant="primary" type="submit">
        Submit
      </Button>


        <Table striped bordered hover size='lg' className='text-center mt-4'>
        <thead>
          <tr>
            <th>No</th>
            <th>Tingkat</th>
            <th>Kelas</th>
            <th>Kode</th>
            <th>Mata Kuliah</th>
            <th>SKS</th>
            <th>Dosen</th>
            <th>Hari/Jam</th>
            <th>Ruangan</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td colSpan={9}>Data tidak ditemukan</td>
              </tr>
        </tbody>
        </Table>
        </Container>
</div>
</div>
  )
}

export default MataKuliah