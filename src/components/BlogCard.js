import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-application-nxjw.onrender.com/blogs/getBlog/${blogId}`)
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
  }, [blogId]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  const { title, content, author, creationDate, _id, image } = blog;

  const sanitizeAndTruncateHTML = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    if (plainText.length > 200) {
      return plainText.substring(0, 200) + '...';
    } else {
      return plainText;
    }
  };

  return (
    <Card 
      style={{ 
        border: 'none', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        height: '100%', 
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'
      }} 
      className="mt-3"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover' 
          }}
        />
      )}
      <Card.Body style={{ flex: '1 1 auto' }}>
        <Card.Title className="mb-3">{title}</Card.Title>
        <Card.Text className="mb-2">
          <strong>Content:</strong> {sanitizeAndTruncateHTML(content)}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Author:</strong> {author}
        </Card.Text>
        <Card.Text className="mb-3">
          <strong>Created:</strong> {new Date(creationDate).toLocaleDateString()}
        </Card.Text>
        <div className="mt-auto">
          <Button 
            variant="primary" 
            onClick={() => navigate(`/blogs/getBlog/${_id}`)}
            style={{ backgroundColor: '#d0b8ac', color: 'white', border: 'none' }}
          >
            View Blog
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
