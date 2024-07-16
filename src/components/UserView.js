import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import BlogCard from './BlogCard';
import travelImage from '../images/travel.jpg';
import designImage from '../images/design.jpg';
import foodImage from '../images/food.jpg';
import relationshipsImage from '../images/relationships.jpg';

const UserView = ({ blogsData }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData);
    }
  }, [blogsData]);

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <h1 className="text-center mt-3">Browse Topics You Love</h1>
        </Col>
      </Row>

      {/* Categories Section */}
      <Row className="text-center mt-4">
        <Col xs={6} md={3} className="mb-4">
          <>
            <Image
              src={travelImage}
              roundedCircle
              className="img-fluid category-img"
              style={{ width: '150px', height: '150px' }}
            />
            <strong>
              <p className="mt-2">Travel</p>
            </strong>
          </>
        </Col>
        <Col xs={6} md={3} className="mb-4">
          <>
            <Image
              src={designImage}
              roundedCircle
              className="img-fluid category-img"
              style={{ width: '150px', height: '150px' }}
            />
            <strong>
              <p className="mt-2">Design</p>
            </strong>
          </>
        </Col>
        <Col xs={6} md={3} className="mb-4">
          <>
            <Image
              src={foodImage}
              roundedCircle
              className="img-fluid category-img"
              style={{ width: '150px', height: '150px' }}
            />
            <strong>
              <p className="mt-2">Food</p>
            </strong>
          </>
        </Col>
        <Col xs={6} md={3} className="mb-4">
          <>
            <Image
              src={relationshipsImage}
              roundedCircle
              className="img-fluid category-img"
              style={{ width: '150px', height: '150px' }}
            />
            <strong>
              <p className="mt-2">Relationships</p>
            </strong>
          </>
        </Col>
      </Row>

      {/* Blogs Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <Row>
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <Col key={blog._id} xs={12} md={6} className="mb-4">
                  <div style={{ height: '100%' }}> {/* Ensures uniform height for all cards */}
                    <BlogCard blogId={blog._id} style={{ height: '100%' }} />
                  </div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center mt-4">No blogs found.</Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserView;
