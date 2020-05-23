import React from 'react';
import 'antd/dist/antd.less';
import RouteWithSubRoutes from '../RouteWithSubRoutes';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom';
import { SingleRoute } from '../../interfaces';
import { AppProps } from './interfaces';
import { Layout, Menu } from 'antd';
import styles from './styles.css';
import logo from '../../../public/academix-logo.png';

const { Header, Content } = Layout;

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.logo}>
              <Link to="/academix">
                <img src={logo} alt="Academix Logo" />
              </Link>
            </div>
            <Menu theme="light" mode="horizontal">
              <Menu.Item key="1">SEF Home</Menu.Item>
            </Menu>
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Redirect exact from="/dashboard" to="/dashboard/home" />
              {this.props.routes.map((route: SingleRoute) => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
