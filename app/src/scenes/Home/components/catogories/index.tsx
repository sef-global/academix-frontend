import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './styles.css';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../../../services/util/errorHandler';
import { Category, CategoryStateProps } from './interfaces';
import { Link } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';

class Categories extends React.Component<{}, CategoryStateProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://www.mocky.io/v2/5ecfd2c33200009dc1e3d626')
      .then((result: AxiosResponse<Category[]>) => {
        if (result.status == 200) {
          this.setState({
            categories: result.data,
          });
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load categories'
        );
      });
  }

  render() {
    return (
      <Col md={20} offset={2}>
        <Row>
          {this.state.categories.map((category) => (
            <Col key={category.id} md={8}>
              <Link to={`${category.id}/${category.translations.en.name}`}>
                <Card hoverable className={styles.card} bordered={true}>
                  <h1 className={styles.categoryName}>
                    <BookOutlined /> {category.translations.en.name}
                  </h1>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
    );
  }
}

export default Categories;
