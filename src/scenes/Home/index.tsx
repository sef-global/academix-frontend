import React from 'react';
import { Row, Col, Typography } from 'antd';
import styles from './styles.module.css';
import heroImg from './hero.jpg';
import logo from '../../../public/logo.png';
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
              <img src={logo} alt="Academix Logo" className={styles.logo} />
              <p className={styles.description}>
                AcadeMix aims to curate a collection of free education resources
                available for Sri Lankan students to maximise their learning
                potential from Primary through to Post Graduate education and
                beyond.
              </p>
              <p className={styles.descriptionContact}>
                If you have a website, blog or channel that features free
                education content to support curriculum in Sri Lanka, do share
                with us at&nbsp;
                <a href="mailto:info@sefglobal.org">info@sefglobal.org.</a> We
                also welcome any organisation that is keen on collaborating with
                us to join forces.
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
