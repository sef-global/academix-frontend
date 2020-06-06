import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../services/util/errorHandler';
import { ItemPayload, ItemStateProps, ItemUrlParams } from './interfaces';
import { List, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import styles from './styles.module.css';
import { SubCategory } from '../../interfaces';

class Items extends React.Component<
  RouteComponentProps<ItemUrlParams>,
  ItemStateProps
> {
  pageSize: number;
  SubCategoryId: string;
  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.pageSize = 10;
    this.SubCategoryId = this.props.match.params.subCategoryId;
    this.state = {
      isLoading: false,
      items: [],
      subCategory: null,
      pagination: {
        current: 1,
        total: 0,
        pageSize: this.pageSize,
      },
    };
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchSubCategoryDetails();
  }

  fetchSubCategoryDetails = () => {
    axios
      .get(
        window.location.origin +
          `/core/academix/sub-categories/${this.SubCategoryId}`
      )
      .then((result: AxiosResponse<SubCategory>) => {
        if (result.status == 200) {
          this.setState({
            subCategory: result.data,
          });
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          'Something went wrong when trying to load subcategory details'
        );
      });
  };

  fetchItems = (pageNo = 1) => {
    const pageNumber = pageNo - 1;
    this.setState({ isLoading: true });
    axios
      .get(
        window.location.origin +
          '/core/academix/sub-categories/' +
          `${this.SubCategoryId}/items?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
      )
      .then((result: AxiosResponse<ItemPayload>) => {
        if (result.status == 200) {
          const pagination = { ...this.state.pagination };
          pagination.current = pageNo;
          pagination.total = result.data.totalElements;
          this.setState({
            isLoading: false,
            items: result.data.content,
            pagination: pagination,
          });
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        handleApiError(error, 'Something went wrong when trying to load items');
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { Title } = Typography;
    let title = '';
    if (this.state.subCategory != null) {
      title = this.state.subCategory.translations[0].name;
    }
    return (
      <List
        header={<Title level={3}>{title}</Title>}
        className={styles.mainContent}
        pagination={{
          onChange: this.fetchItems,
          pageSize: this.pageSize,
          total: this.state.pagination.total,
        }}
        loading={this.state.isLoading}
        itemLayout="horizontal"
        dataSource={this.state.items}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.translations[0].name}
              className={styles.listItem}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default Items;
