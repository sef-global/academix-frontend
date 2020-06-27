import React from 'react';
import styles from './styles.module.css';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../services/util/errorHandler';
import { SubCategoryStateProps, CategoryUrlParams } from './interfaces';
import { RouteComponentProps } from 'react-router';
import { Col, Menu, PageHeader, Row, Typography } from 'antd';
import {
  Link,
  Route,
  BrowserRouter as Router,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { Category, SubCategory } from '../../interfaces';
import Items from './scenes/Items';

class SubCategories extends React.Component<
  RouteComponentProps<CategoryUrlParams>,
  SubCategoryStateProps
> {
  CategoryId: string;
  constructor(props: RouteComponentProps<CategoryUrlParams>) {
    super(props);
    this.CategoryId = this.props.match.params.categoryId;
    this.state = {
      subCategories: [],
      category: null,
      current: '',
    };
  }

  componentDidMount() {
    this.fetchSubCategories();
    this.fetchCategoryDetails();
  }

  fetchSubCategories = () => {
    axios
      .get(
        window.location.origin +
          `/core/academix/categories/${this.CategoryId}/sub-categories`
      )
      .then((result: AxiosResponse<SubCategory[]>) => {
        if (result.status == 200) {
          this.setState({
            subCategories: result.data,
          });
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load subcategories'
        );
      });
  };

  fetchCategoryDetails = () => {
    axios
      .get(
        window.location.origin + `/core/academix/categories/${this.CategoryId}`
      )
      .then((result: AxiosResponse<Category>) => {
        if (result.status == 200) {
          this.setState({
            category: result.data,
          });
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load category details'
        );
      });
  };

  handleClick = (e: { key: string }) => {
    this.setState({
      current: e.key,
    });
  };

  setCurrent = (subCategoryId: string) => {
    this.setState({
      current: subCategoryId,
    });
  };

  onBack = () => {
    this.props.history.push('/academix');
  };

  render() {
    const { Title } = Typography;
    let title = '';
    if (this.state.category != null) {
      title = this.state.category.translations[0].name;
    }
    return (
      <Router>
        <Row className={styles.mainContent}>
          <Col md={20}>
            <PageHeader
              className={styles.pageHeader}
              onBack={this.onBack}
              title={
                <Title className={styles.pageTitle} level={2}>
                  {title}
                </Title>
              }
            />
          </Col>
        </Row>
        <Row className={styles.mainContent}>
          <Col md={20}>
            <Menu
              mode="horizontal"
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
            >
              {this.state.subCategories.map((subCategory) => {
                // Replace spaces and slashes from the subcategory name to include it on the URL
                const categoryName = title
                  .trim()
                  .replace(/\s+|\//g, '-')
                  .toLowerCase();
                return (
                  <Menu.Item key={subCategory.id} className={styles.menuItem}>
                    <Link
                      to={`/academix/${this.CategoryId}/${categoryName}/${subCategory.id}`}
                    >
                      {subCategory.translations[0].name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Col>
        </Row>
        <Row className={styles.mainContent}>
          <Col md={20}>
            <Route path="/academix/:categoryId/:categoryName/:subCategoryId">
              <Items setCurrent={this.setCurrent} />
            </Route>
            {/* Todo: Use history.push to redirect to the first subcategory*/}
            {this.state.subCategories.length > 0 && (
              <Redirect
                exact
                to={`${this.props.match.url}/${this.state.subCategories[0].id}`}
              />
            )}
          </Col>
        </Row>
      </Router>
    );
  }
}

export default withRouter(SubCategories);
