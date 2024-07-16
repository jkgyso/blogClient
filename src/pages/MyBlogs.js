import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, FormGroup, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import react-quill
import 'react-quill/dist/quill.snow.css'; // Import styles for react-quill

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false);
  const [updateBlogTitle, setUpdateBlogTitle] = useState('');
  const [updateBlogContent, setUpdateBlogContent] = useState('');
  const [updateBlogImage, setUpdateBlogImage] = useState('');
  const [updateBlogId, setUpdateBlogId] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImageUrl, setNewBlogImageUrl] = useState('');
  const [selectedSection, setSelectedSection] = useState('blogs');
  const [comments, setComments] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = () => {
    fetch('https://blog-application-nxjw.onrender.com/blogs/getMyBlogs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.myBlogs) {
          setBlogs(data.myBlogs);
        } else {
          console.log(data.message);
          setBlogs([]);
        }
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  };

  const handleUpdate = (blog) => {
    setUpdateBlogId(blog._id);
    setUpdateBlogTitle(blog.title);
    setUpdateBlogContent(blog.content);
    setUpdateBlogImage(blog.image);
    setShowUpdateBlogModal(true);
  };

  const handleUpdateSubmit = () => {
    fetch(`https://blog-application-nxjw.onrender.com/blogs/updatePost/${updateBlogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: updateBlogTitle,
        content: updateBlogContent,
        image: updateBlogImage
      })
    })
      .then(res => res.json())
      .then(data => {
        setAlertMessage(data.message);
        setAlertType('success');
        setShowAlert(true);
        fetchMyBlogs();
        handleCloseUpdateBlogModal();
      })
      .catch(error => {
        console.error('Error updating blog:', error);
        setAlertMessage('Failed to update blog post.');
        setAlertType('error');
        setShowAlert(true);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://blog-application-nxjw.onrender.com/blogs/deleteOwnPost/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAlertMessage(data.message);
        setAlertType('success');
        setShowAlert(true);
        fetchMyBlogs();
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
        setAlertMessage('Failed to delete blog post.');
        setAlertType('error');
        setShowAlert(true);
      });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedBlog(null);
    setComments([]);
  };

  // const handleShowCommentsModal = (blog) => {
  //   setSelectedBlog(blog);
  //   fetchComments(blog._id);
  //   setShowCommentsModal(true);
  // };

  // const fetchComments = (blogId) => {
  //   fetch(`https://blog-application-nxjw.onrender.com/comments/getComments/${blogId}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.comments) {
  //         setComments(data.comments);
  //       } else {
  //         console.log(data.message);
  //         setComments([]);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching comments:', error);
  //     });
  // };

  const handleCloseAddBlogModal = () => {
    setShowAddBlogModal(false);
    setNewBlogTitle('');
    setNewBlogContent('');
    setNewBlogImageUrl('');
  };

  // const handleShowAddBlogModal = () => {
  //   setShowAddBlogModal(true);
  // };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const postData = {
      title: newBlogTitle,
      content: newBlogContent
    };
    if (newBlogImageUrl.trim() !== '') {
      postData.image = newBlogImageUrl;
    }

    fetch('https://blog-application-nxjw.onrender.com/blogs/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(data => {
        setAlertMessage(data.message);
        setAlertType('success');
        setShowAlert(true);
        fetchMyBlogs();
        handleCloseAddBlogModal();
      })
      .catch(error => {
        console.error('Error adding blog:', error);
        setAlertMessage('Failed to add blog post.');
        setAlertType('error');
        setShowAlert(true);
      });
  };

  const handleCloseUpdateBlogModal = () => {
    setShowUpdateBlogModal(false);
    setUpdateBlogTitle('');
    setUpdateBlogContent('');
    setUpdateBlogImage('');
    setUpdateBlogId('');
  };

  return (
    <Row>
      <Col md={3} className="sidebar pt-5 mt-5" style={{ backgroundColor: '#efe5dc', minHeight: '50vh', borderRight: '1px solid #ccc' }}>
        <div className="sidebar-header text-center mb-4">
          <h4>Blog Management</h4>
        </div>
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            action
            active={selectedSection === 'blogs'}
            onClick={() => setSelectedSection('blogs')}
            style={{
              backgroundColor: selectedSection === 'blogs' ? '#d0b8ac' : '',
              color: selectedSection === 'blogs' ? 'white' : ''
            }}
            className="cursor-pointer custom-list-group-item"
          >
            <strong>My Blogs</strong>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            action
            active={selectedSection === 'addBlog'}
            onClick={() => setSelectedSection('addBlog')}
            style={{
              backgroundColor: selectedSection === 'addBlog' ? '#d0b8ac' : '',
              color: selectedSection === 'addBlog' ? 'white' : ''
            }}
            className="cursor-pointer custom-list-group-item"
          >
            <strong>Add Blog</strong>
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={9}>
        {showAlert && (
          <Alert variant={alertType} onClose={handleCloseAlert} dismissible className='m-4 p-2' style={{ width: '50%', margin: '0 auto' }}>
            <p>{alertMessage}</p>
          </Alert>
        )}

        {selectedSection === 'blogs' && (
          <>
            <h1 className="text-center my-4">Welcome to your Blog Dashboard!</h1>
            {blogs.length > 0 ? (
              <Table hover responsive>
                <thead>
                  <tr className="text-center">
                    <th>Title</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>
                        <Link to={`/blogs/getBlog/${blog._id}`} style={{ color: '#000', textDecoration: 'underline' }}>{blog.title}</Link>
                      </td>
                      <td>{new Date(blog.creationDate).toLocaleDateString()}</td>
                      <td className="text-center">
                        <Button variant="info" style={{ backgroundColor: '#efe5dc', color: 'black' }} onClick={() => handleUpdate(blog)}><strong>Update</strong></Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(blog._id)}><strong>Delete</strong></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h3 className="text-center">You haven't written any blogs yet.</h3>
            )}
          </>
        )}

        {selectedSection === 'addBlog' && (
          <>
            <h2 className="my-5 text-center">Add A New Blog</h2>
            <Form onSubmit={handleAddBlog} className="mx-auto" style={{ maxWidth: '600px' }}>
              <FormGroup>
                <Form.Label><strong>Title</strong></Form.Label>
                <Form.Control
                  type="text"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label><strong>Content</strong></Form.Label>
                {/* Integrate react-quill for rich text editing */}
                <ReactQuill
                  rows={5}
                  as="textarea"
                  value={newBlogContent}
                  onChange={setNewBlogContent}
                  modules={{
                    toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      [{ 'size': [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'image', 'video'],
                      ['clean']
                    ],
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label><strong>Image URL (Optional)</strong></Form.Label>
                <Form.Control
                  rows={5}
                  type="textarea"
                  value={newBlogImageUrl}
                  onChange={(e) => setNewBlogImageUrl(e.target.value)}
                />
                <Form.Text className="text-muted">
          Get your Image URL <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">here</a>.
        </Form.Text>
              </FormGroup>
              <Button className='mt-3' type="submit" style={{ backgroundColor: '#efe5dc', color: 'black' }}><strong>Add Blog</strong></Button>
            </Form>
          </>
        )}
      </Col>

      {/* Update Blog Modal */}
      <Modal show={showUpdateBlogModal} onHide={handleCloseUpdateBlogModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updateBlogTitle}
                onChange={(e) => setUpdateBlogTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={updateBlogContent}
                onChange={setUpdateBlogContent}
                modules={{
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{ 'size': [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={updateBlogImage}
                onChange={(e) => setUpdateBlogImage(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateBlogModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Update Blog
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Blog Modal */}
      <Modal show={showAddBlogModal} onHide={handleCloseAddBlogModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={newBlogContent}
                onChange={(e) => setNewBlogContent(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={newBlogImageUrl}
                onChange={(e) => setNewBlogImageUrl(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddBlogModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Add Blog
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Comments Modal */}
      <Modal show={showCommentsModal} onHide={handleCloseCommentsModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comments for "{selectedBlog ? selectedBlog.title : ''}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length > 0 ? (
            <ListGroup>
              {comments.map(comment => (
                <ListGroup.Item key={comment._id}>
                  <strong>{comment.username}</strong>: {comment.content}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No comments yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCommentsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
