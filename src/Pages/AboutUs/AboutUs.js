import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NavBarHome from '../../NavBarHome/NavBarHome'
import logo3 from '../../Img/LogoSI.png'
import './AboutUs.css';

function AboutUs() {
  return (
    <div>
      <NavBarHome/>
        
      <Row className='justify-content-center align-items-center h200 background1'>
      <Col className='d-flex justify-content-center align-item-center'>
      <img className='' src={logo3}  width='450px' height='auto'/></Col>
        <Col xs={12} sm={12} md={7} lg={7}><h1><div className='fw-bold'>E-Learning</div></h1>
          <h5><div className='fw-bold'>Study & Monitoring System</div></h5>
          <div className='h6'> Lemon E-Learning Adalah Website yang dibuat PT.OSHA Technology untuk memudahkan sekolah dalam memonitoring dan management pembelajaran online. e-learning dilakukan melalui media perantara internet berbasis web. Jadi, semua materi, kuis, dan bahan ajar bisa kamu akses melalui sebuah situs web.</div>
        </Col>
        
      </Row>
    </div>

  )
}

export default AboutUs