import React from 'react';
import styles from './styles.module.css';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../services/util/errorHandler';
import { SubCategoryStateProps, CategoryUrlParams } from './interfaces';
import { RouteComponentProps, Switch } from 'react-router';
import { Button, Col, PageHeader, Row, Typography } from 'antd';
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
    // Scroll to the top when the page is loaded
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

  setCurrent = (subCategoryId: string) => {
    this.setState({
      current: subCategoryId,
    });
  };

  onBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { Title } = Typography;
    let title = '';
    if (this.state.category != null) {
      title = this.state.category.name;
    }
    // Replace spaces and slashes from the category name to include it on the URL
    const categoryName = title
      .trim()
      .replace(/\s+|\//g, '-')
      .toLowerCase();
    return (
      <Router>
        <Row className={styles.mainContent}>
          <Col md={20} className={styles.headerWrapper}>
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
            <Row className={styles.subCategoryWrapperRow}>
              {this.state.subCategories.map((subCategory) => {
                // Replace spaces and slashes from the subcategory name to include it on the URL
                const subCategoryName = subCategory.name
                  .trim()
                  .replace(/\s+|\//g, '-')
                  .toLowerCase();
                return (
                  <Button
                    key={subCategory.id}
                    className={styles.subCategoryButton}
                    shape="round"
                    type={
                      this.state.current == subCategory.id.toString()
                        ? 'primary'
                        : undefined
                    }
                    size="large"
                    onClick={() => this.setCurrent(subCategory.id.toString())}
                  >
                    <Link
                      to={`/${this.CategoryId}/${categoryName}/${subCategory.id}/${subCategoryName}`}
                    >
                      {subCategory.name}
                    </Link>
                  </Button>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row className={styles.mainContent}>
          <Col md={20}>
            <Switch>
              <Route path="/:categoryId/:categoryName/:subCategoryId/:subCategoryName">
                <Items setCurrent={this.setCurrent} />
              </Route>
              {/* Todo: Use history.push to redirect to the first subcategory*/}
              <Route exact path={'/:categoryId/:categoryName'}>
                {this.state.subCategories.length > 0 && (
                  <Redirect
                    to={`${this.props.match.url}/${
                      this.state.subCategories[0].id
                    }/${this.state.subCategories[0].name
                      .trim()
                      .replace(/\s+|\//g, '-')
                      .toLowerCase()}`}
                  />
                )}
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    );
  }
}

export default withRouter(SubCategories);
