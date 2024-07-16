import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import featureImage from '../images/features.jpg';
import '../App.css'; // Import your custom CSS file

const Features = () => {
  return (
    <div className="my-5">
      <h2 className="mb-5 text-center">
        From Creation to Connection, Explore Our Comprehensive Blogging Features
      </h2>
      <Container fluid style={{ backgroundColor: '#fbfefb' }}>
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center mt-5 mb-5">
            <img
              src={featureImage}
              alt="features"
              style={{ maxWidth: '60%', height: 'auto' }}
            />
          </Col>
          <Col md={6} className="p-4 mt-md-5">
            <Accordion defaultActiveKey="0" className="align-items-center">
              <Accordion.Item eventKey="0" className="border-0">
                <Accordion.Header className="accordion-header">
                  <h5>Create and Publish</h5>
                </Accordion.Header>
                <Accordion.Body className="border-top-0">
                  Seamlessly create and publish your blogs with our user-friendly editor.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="border-0">
                <Accordion.Header className="accordion-header">
                  <h5>Customize Your Blog</h5>
                </Accordion.Header>
                <Accordion.Body className="border-top-0">
                  Personalize your blog with custom themes, fonts, and layouts.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="border-0">
                <Accordion.Header className="accordion-header">
                  <h5>Engage with Readers</h5>
                </Accordion.Header>
                <Accordion.Body className="border-top-0">
                  Interact with your audience through comments, likes, and shares.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="border-0">
                <Accordion.Header className="accordion-header">
                  <h5>Analytics and Insights</h5>
                </Accordion.Header>
                <Accordion.Body className="border-top-0">
                  Track your blog's performance with detailed analytics and insights.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4" className="border-0">
                <Accordion.Header className="accordion-header">
                  <h5>SEO Optimization</h5>
                </Accordion.Header>
                <Accordion.Body className="border-top-0">
                  Improve your blog's visibility with built-in SEO tools.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
