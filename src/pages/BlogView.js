import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const BlogView = () => {
  const { postId } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });

  const fetchBlogDetails = useCallback(() => {
    fetch(`https://blog-application-nxjw.onrender.com/blogs/getBlog/${postId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        setBlog(data.blog);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setBlog(null);
      });
  }, [postId]);

  const fetchComments = useCallback(() => {
    fetch(`https://blog-application-nxjw.onrender.com/comments/getComments/${postId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setComments([]);
      });
  }, [postId]);

  useEffect(() => {
    fetchBlogDetails();
    fetchComments();
  }, [fetchBlogDetails, fetchComments]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prevComment => ({
      ...prevComment,
      [name]: value
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    fetch(`https://blog-application-nxjw.onrender.com/comments/addComment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire('Comment Added!', data.message, 'success');
        fetchComments();
        setNewComment({ name: '', comment: '' });
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        Swal.fire('Error!', 'Failed to add comment.', 'error');
      });
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  const { title, content, author, creationDate, image } = blog;

  return (
    <Container className="mt-5">
      <>
        {image && (
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        )}
        <h2 className="blog-title mt-3">{title}</h2>
        <p className="blog-author">By {author} | Created: {new Date(creationDate).toLocaleDateString()}</p>
        <p className="blog-content" dangerouslySetInnerHTML={{ __html: content }}></p>

        <hr />

        <Row>
          <Col md={8}>
            <h2 className="mt-4">Comments</h2>
            {comments.length > 0 ? (
              <ul className="list-unstyled">
                {comments.map(comment => (
                  <li key={comment._id} className="media mt-3">
                    <div>
                      <h5 className="mt-0 mb-1">{comment.name}</h5>
                      <span>{comment.comment}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </Col>
          <Col md={4}>
            <div className="mt-4 p-4 border rounded">
              <h3 className="mb-3">Leave a Comment</h3>
              <Form onSubmit={handleAddComment}>
                <Form.Group controlId="formCommentName" className="mb-3">
                  <strong><Form.Label>Name</Form.Label></strong>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newComment.name}
                    onChange={handleCommentChange}
                    required
                    placeholder="Your Name"
                  />
                </Form.Group>
                <Form.Group controlId="formComment" className="mb-3">
                  <strong><Form.Label>Comment</Form.Label></strong>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={newComment.comment}
                    onChange={handleCommentChange}
                    required
                    placeholder="Your Comment"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3"
                  type="submit"
                  style={{ backgroundColor: '#d0b8ac', border: 'none' }}
                >
                  Add Comment
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </>
    </Container>
  );
};

export default BlogView;
