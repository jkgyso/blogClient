import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Typical from 'react-typical';
import heroGif from '../images/hero.gif';
import Features from '../components/Features';

export default function Home() {
  return (
    <>
      <Row className="align-items-center">
        <Col md={6} className="p-4 text-center">
          <h1>
            <Typical
              steps={['Captivate', 2000, 'Communicate', 2000, 'Contribute', 4000, 'Inspire!', 4000]}
              loop={Infinity}
              wrapper="span"
              className="typical-text"
            />
          </h1>
          <p>Join us as we explore, engage, and enrich together.</p>
          <Link className="btn" style={{ backgroundColor: '#f3d8c7', color: 'black' }} to={'/blogs/getBlogs'}>
            <strong>Start reading</strong>
          </Link>
        </Col>
        <Col md={6} className="p-4 text-center">
          <img 
            src={heroGif} 
            alt="Captivating GIF" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </Col>
      </Row>
      <Features />
      <footer className="footer text-center p-3" style={{ backgroundColor: '#d0b8ac' }}>
        <p><strong>&copy; 2024 InspireBlog. All rights reserved.</strong></p>
      </footer>
    </>
  );
}
