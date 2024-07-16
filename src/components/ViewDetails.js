import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ViewDetails = ({ blog }) => {
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const fetchComments = useCallback(() => {
    if (!blog) return;

    fetch(`https://blog-application-nxjw.onrender.com/comments/getComments/${blog._id}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [blog]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const openDeleteModal = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setCommentToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteComment = () => {
    if (!commentToDelete) return;

    fetch(`https://blog-application-nxjw.onrender.com/comments/deleteComment/${commentToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Comment deleted successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Comment successfully deleted'
          });
          fetchComments();
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Failed to delete comment'
          });
        }
        closeDeleteModal();
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to delete comment'
        });
        closeDeleteModal();
      });
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <p><strong>Title:</strong> {blog.title}</p>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>Date Created:</strong> {new Date(blog.creationDate).toLocaleString()}</p>
      <h5>Comments</h5>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              <Row>
                <Col md={10}>
                  <p><strong>{comment.name}</strong>: {comment.comment}</p>
                </Col>
                <Col md={2}>
                  <Button variant="danger" size="sm" onClick={() => openDeleteModal(comment._id)}>Delete</Button>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={deleteComment}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewDetails;
