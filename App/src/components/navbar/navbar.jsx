import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './navbar.css';
import Bird from '../../assets/cortelazer.png';

function AppNavbar() {
  return (
    <>
      <Navbar id="navbar-container" expand="md">
        <Container>
          <Navbar.Brand href="/"><img src={Bird} alt="Bird Logo" id='logo' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id='topics-container' className="mx-auto">
              <Nav.Link className='links-navbvar' href="/">Inicio</Nav.Link>
              <Nav.Link className='links-navbvar' href="/Sobre-Nosotros">Sobre nosotros</Nav.Link>
              <Nav.Link className='links-navbvar' href="/Servicios">Servicios</Nav.Link>
              <Nav.Link className='links-navbvar' href="/Preguntas-frecuentes">Preguntas frecuentes</Nav.Link>
            </Nav>
            {/* <div id='login-container'>
              <Nav.Link href="/Iniciar-sesion" className="text-center">
              <button className="login" >
                Iniciar Sesión
              </button>
              </Nav.Link>
              <Nav.Link href="/Perfil" className="text-center">
                <button className="profile" >
                  Perfil
                </button>
              </Nav.Link>
            </div> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
