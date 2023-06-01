import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaRegBell,
  FaUserCircle,
} from 'react-icons/fa';
import axios from 'axios';

function TopNavigation () {

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
      navigate('/home/login-mahasiswa');
    }

    fetchData();
  },[]);

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`
    await axios.post('http://127.0.0.1:8000/api/auth/logout')
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role")

      navigate('/');
    })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className='top-navigation'>
      <Title />
      <Search />
      <BellIcon />
      <UserCircle icon={<FaUserCircle size="25" />} text="Profil" url='/mahasiswa/profil' />
      <UserCircle/>

      <Navbar.Text>
            <a className='fw-bold' href="/mahasiswa/profil" style={{ color: 'gray' }}> Halo, {user.nama}</a> 
            <Button className='ms-4 me-5' variant="danger" size='sm' onClick={handleShow}>Logout</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
              </Modal.Header>
              <Modal.Body>Apakah anda ingin logout?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Tidak
                </Button>
                <Button variant="danger" onClick={logoutHandler}>
                  Logout
                </Button>
              </Modal.Footer>
            </Modal>
          </Navbar.Text>
    </div>
    
  );
};

const Search = () => (
  <div className='d-flex search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);
const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;

const Title = () => <h5 className='title-text'></h5>;

const UserCircle = ({ icon, url = '#' }) => (
  <a href={url} className="top-navigation-icon group">
  {/* // <div className="sidebar-icon group"> */}
    {icon}
  </a>
);

export default TopNavigation;
