import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#efe5dc' }}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          InspireBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs/getBlogs" exact="true">Blogs</Nav.Link>
            {user.id && !user.isAdmin && (
              <Nav.Link as={NavLink} to="/blogs/getMyBlogs">My Blogs</Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user.id && (
              <NavLink to="/logout">
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Button>
              </NavLink>
            )}
            {!user.id && (
              <>
                <NavLink to="/login">
                  <Button variant="outline-secondary" className="me-2">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="outline-secondary">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                  </Button>
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
