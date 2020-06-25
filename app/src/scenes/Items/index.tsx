import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../services/util/errorHandler';
import { Item, ItemPayload, ItemStateProps, ItemUrlParams } from './interfaces';
import { List, Button, Modal } from 'antd';
import { RouteComponentProps } from 'react-router';
import styles from './styles.module.css';

class Items extends React.Component<
  RouteComponentProps<ItemUrlParams>,
  ItemStateProps
> {
  pageSize: number;
  SubCategoryId: string;
  constructor(props: RouteComponentProps<ItemUrlParams>) {
    super(props);
    this.pageSize = 10;
    this.SubCategoryId = this.props.match.params.subCategoryId;
    this.state = {
      isLoading: false,
      isModalVisible: false,
      selectedItem: null,
      items: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: this.pageSize,
      },
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

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

  showModal = (item: Item) => {
    this.setState({
      isModalVisible: true,
      selectedItem: item,
    });
  };

  handleModalCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  componentDidUpdate() {
    if (this.SubCategoryId !== this.props.match.params.subCategoryId) {
      this.SubCategoryId = this.props.match.params.subCategoryId;
      this.fetchItems();
    }
  }

  render() {
    return (
      <div>
        {this.state.selectedItem != null && (
          <Modal
            title={this.state.selectedItem.translations[0].name}
            visible={this.state.isModalVisible}
            onCancel={this.handleModalCancel}
            footer={[
              <Button
                key={this.state.selectedItem.id}
                type="primary"
                href={this.state.selectedItem.link}
                target="_blank"
              >
                Visit source
              </Button>,
            ]}
          >
            <p>{this.state.selectedItem.translations[0].description}</p>
          </Modal>
        )}
        <List
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
            <List.Item
              key={item.id}
              onClick={() => this.showModal(item)}
              className={styles.pointer}
            >
              <List.Item.Meta
                title={item.translations[0].name}
                className={styles.listItem}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Items;
