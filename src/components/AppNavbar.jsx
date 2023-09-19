import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCart from './ShoppingCart';
import { useState } from 'react';

const AppNavbar = () => {

  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const tokenValue = localStorage.getItem("token")

    if (tokenValue) {
      setShow(true);
    } else {
      navigate("/login")
    }
    
  }
  return (
    <>
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Eccommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex w-100 justify-content-end">
              <Nav.Link 
              as={Link} 
              to="/login" 
              style={{ width : "100px" }}><i className='bx bx-user d-flex justify-content-center align-center bx-sm'></i></Nav.Link>
              <Nav.Link 
              as={Link} 
              to="/purchases" 
              style={{ width : "100px" }}><i className='bx bx-box d-flex justify-content-center align-center bx-sm'></i></Nav.Link>
              <Nav.Link 
              onClick={ () => handleShow()} 
              style={{ width : "100px" }}
              ><i className='bx bx-cart d-flex justify-content-center align-center bx-sm'>{cart.length > 0 ? cart.length : ''}</i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ShoppingCart 
      show={ show }
      handleClose={ handleClose }
      />
    </>
  );
};

export default AppNavbar;