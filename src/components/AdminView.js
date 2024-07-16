import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ViewDetails from './ViewDetails';

export default function AdminView({ blogsData, fetchData }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Function to handle opening details modal
    const openDetailsModal = (blog) => {
        setSelectedBlog(blog);
        setShowDetailsModal(true);
    };

    // Function to handle closing details modal
    const closeDetailsModal = () => {
        setSelectedBlog(null);
        setShowDetailsModal(false);
    };

    // Function to delete a blog post
    const deleteBlogPost = (blogId) => {
        fetch(`https://blog-application-nxjw.onrender.com/blogs/deletePost/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Blog post deleted successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Blog post successfully deleted'
                });
                fetchData(); // Refresh data after deletion
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to delete blog post'
                });
            }
        })
        .catch(error => {
            console.error('Error deleting blog post:', error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to delete blog post'
            });
        });
    };

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Table hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogsData.map((blog, index) => (
                        <tr key={blog._id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/blogs/getBlog/${blog._id}`} style={{ color: '#000', textDecoration: 'underline' }}>{blog.title}</Link></td>
                            <td>{blog.author}</td>
                            <td>{new Date(blog.creationDate).toLocaleString()}</td>
                            <td>
                                <Button variant="primary" style={{ backgroundColor: '#efe5dc', color: 'black' }} size="sm" onClick={() => openDetailsModal(blog)}>View Details</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => deleteBlogPost(blog._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Details Modal */}
            <Modal show={showDetailsModal} onHide={closeDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Blog Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBlog && <ViewDetails blog={selectedBlog} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDetailsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
