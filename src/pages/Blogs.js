import React, { useState, useEffect, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function Blogs() {
    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBlogs = async () => {
        try {
            const response = await fetch('https://blog-application-nxjw.onrender.com/blogs/getBlogs');
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data = await response.json();
            setBlogs(data.blogs);
            setLoading(false); // Set loading to false after successful fetch
        } catch (error) {
            setError(error.message);
            setLoading(false); // Set loading to false on error
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <Container className="mt-4 mb-5">
            <Row>
                <Col>
                    {error && <p className="text-danger">{error}</p>}
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : user.isAdmin ? (
                        <AdminView blogsData={blogs} fetchData={fetchBlogs} />
                    ) : (
                        <UserView blogsData={blogs} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
