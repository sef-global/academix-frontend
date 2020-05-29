import React from 'react';
import { Row, Col, Button } from 'antd';
import styles from './styles.css';
import heroImg from './hero.jpg';
import logo from '../../../public/academix-logo.png';
import Categories from '../Home/components/catogories/index';

class Home extends React.Component {
  render() {
    return (
      <Row>
        <Col md={0} lg={3} />
        <Col md={24} lg={21}>
          <Row className={styles.mainContent}>
            <Col md={12} className={styles.descriptionContent}>
              <img src={logo} alt="Academix Logo" width={350} />
              <p className={styles.description}>
                AcadeMix aims to curate a collection of free education resources
                available for Sri Lankan students to maximise their learning
                potential from Primary through to Post Graduate education and
                beyond.
              </p>
              <Button type="primary" size="large">
                Learn More
              </Button>
            </Col>
            <Col md={12}>
              <img width="80%" src={heroImg} alt="Hero image" />
            </Col>
          </Row>
        </Col>
        <Categories />
      </Row>
    );
  }
}

export default Home;
