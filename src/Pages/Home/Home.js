import React from 'react'
import NavBarHome from '../../NavBarHome/NavBarHome'
import { Col, Container, Row } from 'react-bootstrap'
import Exam from '../../Img/exam.png'
import LogoSI from '../../Img/LogoSI.png'
import './Home.css';


function Home () {
  return (
    <div><NavBarHome/>
    <Container>
        <Row className='h101'>
          <Col>
            <div className='d-flex align-items-center mb-3'>
              <img fluid
              src={LogoSI}
              width='450px'
              height='auto'
              ></img>
            </div>

          </Col>
          <Col className='d-flex align-items-center'>
            <img fluid 
            src={Exam}
            width='620px'
            height='auto'/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home