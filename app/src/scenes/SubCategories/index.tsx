import React from 'react';
import styles from './styles.module.css';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../services/util/errorHandler';
import { SubCategoryStateProps, CategoryUrlParams } from './interfaces';
import { RouteComponentProps } from 'react-router';
import { List, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Category, SubCategory } from '../../interfaces';

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

  render() {
    const { Title } = Typography;
    let title = '';
    if (this.state.category != null) {
      title = this.state.category.translations[0].name;
    }
    return (
      <List
        header={<Title level={2}>{title}</Title>}
        className={styles.mainContent}
        dataSource={this.state.subCategories}
        renderItem={(subCategory) => {
          // Replace spaces and slashes from the subcategory name to include it on the URL
          const subCategoryName = subCategory.translations[0].name
            .trim()
            .replace(/\s+|\//g, '-')
            .toLowerCase();
          return (
            <Link to={`/academix/sub/${subCategory.id}/${subCategoryName}`}>
              <Card.Grid key={subCategory.id}>
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Title level={4}>
                        {subCategory.translations[0].name}
                      </Title>
                    }
                    className={styles.listItem}
                  />
                </List.Item>
              </Card.Grid>
            </Link>
          );
        }}
      />
    );
  }
}

export default SubCategories;
