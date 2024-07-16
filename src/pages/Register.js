import { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import backgroundImage from '../images/register.png';
import { Link } from 'react-router-dom'; // Assuming you have React Router set up for navigation
import '../App.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        icon: "error",
        text: "Passwords do not match."
      });
      return;
    }

    fetch('https://blog-application-nxjw.onrender.com/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Registered Successfully") {
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!"
          });
        } else if (data.error) {
          Swal.fire({
            title: "Registration Error",
            icon: "error",
            text: data.error
          });
        }
      });
  }

  useEffect(() => {
    if (email !== "" && username !== "" && password !== "" && confirmPassword !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, username, password, confirmPassword]);

  return (
    <Container fluid className="register-page" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="register-card p-4" style={{ backgroundColor: '#f3d8c7', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h1>Register</h1>
              </Card.Title>
              <div className="text-center mb-4">
                <img src={backgroundImage} alt="Registration Background" className="img-fluid rounded" style={{ maxWidth: '100%', height: 'auto' }} />
                <h4 className="mt-3">Join our community of passionate bloggers and share your voice!</h4>
              </div>
              <Form onSubmit={(e) => registerUser(e)}>
                <Form.Group>
                  <Form.Label className="text-center"><strong>Email:</strong></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ maxWidth: '100%', margin: 'auto' }} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-center"><strong>Username:</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username must be at least 4 characters"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ maxWidth: '100%', margin: 'auto' }} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-center"><strong>Password:</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password must be at least 8 characters"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ maxWidth: '100%', margin: 'auto' }} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-center"><strong>Confirm Password:</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password must be at least 8 characters"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ maxWidth: '100%', margin: 'auto' }} />
                </Form.Group>
                <Button
                  variant={isActive ? "primary" : "secondary"}
                  type="submit"
                  disabled={!isActive}
                  className='mt-3 w-100'
                  style={{ border: '1px solid black', backgroundColor: isActive ? 'white' : '#d0b8ac', color: isActive ? 'black' : 'black' }}><strong>
                  Submit</strong>
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login" style={{ color: '#26254F', fontWeight: 'bold' }}>Log in here</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
