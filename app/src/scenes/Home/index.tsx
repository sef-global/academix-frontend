import React from 'react';
import { Row, Col, Typography } from 'antd';
import styles from './styles.module.css';
import heroImg from './hero.jpg';
import logo from '../../../public/academix-logo.png';
import Categories from './components/catogories';
import SLEFLogo from './SLEFLogo.png';

const { Title } = Typography;

class Home extends React.Component {
  render() {
    return (
      <Row>
        <Col md={0} lg={2} />
        <Col md={24} lg={21}>
          <Row className={styles.mainContent}>
            <Col md={10} className={styles.descriptionContent}>
              <img src={logo} alt="Academix Logo" width={350} />
              <p className={styles.description}>
                AcadeMix aims to curate a collection of free education resources
                available for Sri Lankan students to maximise their learning
                potential from Primary through to Post Graduate education and
                beyond.
              </p>
              <Row>
                <Title level={4}>
                  AcadeMiX is built in collaboration with,
                </Title>
              </Row>
              <Row>
                <Col md={6} lg={3}>
                  <img src={SLEFLogo} alt="SLEF Logo" width={220} />
                </Col>
              </Row>
            </Col>
            <Col md={2} />
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
