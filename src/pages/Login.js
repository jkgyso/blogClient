import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import backgroundImage from '../images/login.png';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    fetch('https://blog-application-nxjw.onrender.com/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailOrUsername,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access).then(() => {
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Check out our Blogs!"
          });
        });
      } else {
        Swal.fire({
          title: "Authentication Failed",
          icon: "error",
          text: data.error || "An error occurred. Please try again."
        });
      }
    })
    .catch(error => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred while trying to log in. Please try again."
      });
    });

    setEmailOrUsername('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    return fetch('https://blog-application-nxjw.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data.user._id,
        isAdmin: data.user.isAdmin
      });
    });
  };

  useEffect(() => {
    setIsActive(emailOrUsername !== "" && password !== "");
  }, [emailOrUsername, password]);

  if (user.id) {
    return <Navigate to="/blogs/getBlogs" />;
  }

  return (
    <Container fluid className="p-0">
      <Row className="no-gutters">
        {/* Left Column: Login Section with Background Color */}
        <Col xs={12} md={6} className="p-0">
          <div className="login-section" style={{ backgroundColor: '#efe5dc', height: '100vh' }}>
            <Container className="h-100">
              <Row className="justify-content-center align-items-center h-100">
                <Col xs={12} md={8} lg={6} className="p-4">
                  <Form onSubmit={(e) => authenticate(e)}>
                    <h1 className="text-center p-2">Login</h1>
                    <Form.Group controlId="userEmail">
                      <Form.Label><strong>Email address or Username</strong></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email or username"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label><strong>Password</strong></Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center p-3">
                      {isActive ?
                        <Button variant="primary" type="submit" id="submitBtn" style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
                          Submit
                        </Button>
                        :
                        <Button type="submit" id="submitBtn" disabled style={{ backgroundColor: '#d0b8ac', color: 'black', border: '1px solid black' }}>
                          Login
                        </Button>
                      }
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>

        <Col xs={12} md={6} className="p-0 d-none d-md-block">
          <div className="image-section" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            overflow: 'hidden'
          }} />
        </Col>
      </Row>
    </Container>
  );
}
