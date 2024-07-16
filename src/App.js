import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Blogs from './pages/Blogs';
import MyBlogs from './pages/MyBlogs';
import BlogView from './pages/BlogView';
// import Profile from './pages/Profile';
import Error from './pages/Error';
import { UserProvider } from './UserContext';

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });
  const [loading, setLoading] = useState(true);

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`https://blog-application-nxjw.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({ id: null, isAdmin: null });
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setUser({ id: null, isAdmin: null });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/users/details" element={<Profile />} /> */}
            <Route path="/blogs/getBlogs" element={<Blogs />} />
            <Route path="/blogs/getMyBlogs" element={<MyBlogs />} />
            <Route exact="true" path="/blogs/getBlog/:postId" element={<BlogView />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
