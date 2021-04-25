import React from 'react';
import 'antd/dist/antd.less';
import RouteWithSubRoutes from '../RouteWithSubRoutes';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { SingleRoute } from '../../interfaces';
import { AppProps } from './interfaces';
import { Layout, Menu } from 'antd';
import styles from './styles.css';
import seflogo from '../../../public/logo.png';
import ReactGA from 'react-ga';
import {
  InstagramFilled,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  MenuOutlined,
} from '@ant-design/icons';

// Initialize google analytics using the tracking code
ReactGA.initialize('UA-167873271-2');

const { Header, Content, Footer } = Layout;

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Layout style={{ background: '#fff' }}>
          <Header className={styles.header}>
            <Menu
              theme="light"
              mode="horizontal"
              overflowedIndicator={<MenuOutlined />}
            >
              <Menu.Item key="0">
                <a href="https://sefglobal.org/">
                  <img className={styles.logo} src={seflogo} alt="SEF Logo" />
                </a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="https://sefglobal.org/">Home</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="https://sefglobal.org/#projects">Projects</a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href="https://sefglobal.org/team.html">Team</a>
              </Menu.Item>
              <Menu.Item key="4">
                <a href="https://sefglobal.medium.com/">Blog</a>
              </Menu.Item>
              <Menu.Item key="5">
                <a href="https://sefglobal.org/join-us.html">Join Us</a>
              </Menu.Item>
              <div className={styles.iconList}>
                <a href="https://www.facebook.com/sustainableeducationfoundation/">
                  <FacebookFilled className={styles.icon} />
                </a>
                <a href="https://twitter.com/goasksef">
                  <TwitterSquareFilled className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/company/sefglobal/">
                  <LinkedinFilled className={styles.icon} />
                </a>
                <a href="https://www.instagram.com/sefglobal/">
                  <InstagramFilled className={styles.icon} />
                </a>
              </div>
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
          <Footer className={styles.footer}>
            © 2020
            <a className={styles.footerLink} href="https://sefglobal.org/">
              Sustainable Education Foundation - SEF
            </a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
