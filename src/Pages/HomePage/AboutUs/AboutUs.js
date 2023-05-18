import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NavBarHome from '../../../Component/NavBarHome/NavBarHome'
import logo from '../../../Img/LogoSI1.png'
import './AboutUs.css';
import {
  MDBContainer,
  MDBCardImage,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';


function AboutUs() {
  return (
    <div>
      <NavBarHome/>
      <Row className='h101 background10'>
        <Col xs={4} md={1} lg={7}><h1><div className='text-bold about'>Learning Management System</div></h1>
          <label className='h5 mb-4'>Study & Monitoring System</label>
          <div className='text-bold'>Learning Management System Adalah Website yang dibuat untuk memudahkan sekolah 
          dalam memonitoring dan management pembelajaran online. LMS dilakukan melalui media perantara internet 
          berbasis web. Jadi, semua materi, dan bahan ajar bisa kamu akses melalui sebuah situs web.</div>
        </Col>
        
      </Row>
    </div>

  )
}

export default AboutUs