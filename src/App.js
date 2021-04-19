import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,
        faHome,
        faUserGraduate,
         faInfo,
        faIdCardAlt } from '@fortawesome/free-solid-svg-icons'; 
import {
          BrowserRouter as Router,
          Switch,
          Route,
          Link
        } from "react-router-dom";
import { useState } from 'react';
import Student from './Components/Student';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home';



function App() {
  const [open,setOpen]=useState(false);
  const openSideBar = () =>{
    setOpen(!open);
  };
  return (
    <Router>
    <Container fluid>
      <Row className="body">
        {open ?<Col md={2} className="sidebar">
          <Row className="logo"><h1>Demo</h1></Row>
          <Row className="menu">
          <Nav className="flex-column">
              <Link to="/" active>&nbsp;<FontAwesomeIcon icon ={faHome} /> Home</Link>
              <Link to="/student" >&nbsp; <FontAwesomeIcon icon={faUserGraduate} /> Student</Link>
              <Link to="/about"> &nbsp;&nbsp;<FontAwesomeIcon icon={faInfo} /> About</Link>
              <Link to="/contact">&nbsp; <FontAwesomeIcon icon={faIdCardAlt} /> Contact </Link>
            </Nav>
          </Row>
        </Col>: null }
       <Col md={open ? 10 : 12} className="content">
         <Row className="button-menu">
         <Button className="bt float-left" onClick={openSideBar} style={{cursor : 'pointer'}}><FontAwesomeIcon icon={faList} /> Menu</Button>
         </Row>
        
       <Switch>
       <Route exact path="/">
            <Home />
          </Route>
          <Route path="/student">
            <Student />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
        
       </Col>
      </Row>
      <Row className="footer">
       <Col></Col>
      </Row>
    </Container>
 
    </Router>
  );
}

export default App;
