import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './styles.css';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../../../services/util/errorHandler';
import { CategoryStateProps } from './interfaces';
import { Link } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';
import { Category } from '../../../../interfaces';
import { trackPageWithGoogleAnalytics } from '../../../../services/util/googleAnalytics';

class Categories extends React.Component<{}, CategoryStateProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(window.location.origin + '/core/academix/categories')
      .then((result: AxiosResponse<Category[]>) => {
        if (result.status == 200) {
          this.setState({
            categories: result.data,
          });
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load categories'
        );
      });
    trackPageWithGoogleAnalytics();
  }

  render() {
    return (
      <Col md={20} offset={2}>
        <Row>
          {this.state.categories.map((category) => {
            // Replace spaces and slashes from the category name to include it on the URL
            const categoryName = category.translations[0].name
              .trim()
              .replace(/\s+|\//g, '-')
              .toLowerCase();
            return (
              <Col key={category.id} md={8}>
                <Link to={`/academix/${category.id}/${categoryName}`}>
                  <Card hoverable className={styles.card} bordered={true}>
                    <h1 className={styles.categoryName}>
                      <BookOutlined /> {category.translations[0].name}
                    </h1>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Col>
    );
  }
}

export default Categories;
