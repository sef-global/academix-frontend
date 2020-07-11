import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { handleApiError } from '../../../../services/util/errorHandler';
import {
  ItemPayload,
  ItemProps,
  ItemStateProps,
  ItemUrlParams,
} from './interfaces';
import { List, Button, Card, Row, Typography, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import styles from './styles.module.css';

class Items extends React.Component<
  RouteComponentProps<ItemUrlParams> & ItemProps,
  ItemStateProps
> {
  pageSize: number;
  SubCategoryId: string;
  constructor(props: RouteComponentProps<ItemUrlParams> & ItemProps) {
    super(props);
    this.pageSize = 8;
    this.SubCategoryId = this.props.match.params.subCategoryId;
    this.props.setCurrent(this.SubCategoryId);
    this.state = {
      isLoading: false,
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

  componentDidUpdate() {
    if (this.SubCategoryId !== this.props.match.params.subCategoryId) {
      this.SubCategoryId = this.props.match.params.subCategoryId;
      this.fetchItems();
    }
  }

  render() {
    const { Paragraph, Title } = Typography;
    return (
      <Col className={styles.cardContainer}>
        <List
          pagination={{
            onChange: this.fetchItems,
            pageSize: this.pageSize,
            total: this.state.pagination.total,
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          loading={this.state.isLoading}
          itemLayout="horizontal"
          dataSource={this.state.items}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card>
                <Title level={4}>{item.name}</Title>
                <Paragraph ellipsis={{ rows: 8, expandable: true }}>
                  {item.description}
                </Paragraph>
                <Row className={styles.cardRounded}>
                  <Button
                    href={item.link}
                    type="primary"
                    target="_blank"
                    shape="circle"
                    size={'large'}
                  >
                    <ArrowRightOutlined />
                  </Button>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Col>
    );
  }
}

export default withRouter(Items);
