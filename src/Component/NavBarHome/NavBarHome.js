import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoSI from '../../Img/LogoSI.png'
import LogoIPI from '../../Img/LogoIPI.png'
import PDFskripsi from '../../PDF/PedomanSkripsiSI2022.pdf'
import './NavBarHome.css'

function BasicExample() {
  return (
    <Navbar bg="white" expand="lg">
      <Container fluid='sm'>
      <Navbar.Brand href="https://institutpendidikan.ac.id/" target="_blank">
            <img
              src={LogoIPI}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
      <Navbar.Brand href="https://si.institutpendidikan.ac.id/" target="_blank">
            <img
              src={LogoSI}
              width="250"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav1">
          <Nav className="navbar-text">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Mahasiswa</NavDropdown.Item>
              <NavDropdown.Item href="/login/lecturer">Dosen</NavDropdown.Item>
              <NavDropdown.Item href="/login/admin">Admin</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Panduan" id="basic-nav-dropdown">
              <NavDropdown.Item href={PDFskripsi} target="_blank ">Panduan Skripsi 2022</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="About Us" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about-us">LMS SI</NavDropdown.Item>
            <NavDropdown.Item href="https://institutpendidikan.ac.id/" target="_blank">IPI Garut</NavDropdown.Item>
            <NavDropdown.Item href="https://si.institutpendidikan.ac.id/" target="_blank">Sistem Informasi</NavDropdown.Item>
            <NavDropdown.Item href="/home/profil-dosen" >Dosen Pengajar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;