import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './services/serviceWorkers/serviceWorker';
import Home from './scenes/Home';
import { SingleRoute } from './interfaces';
import Items from './scenes/Items';
import SubCategories from './scenes/SubCategories';

const routes: SingleRoute[] = [
  {
    path: '/academix',
    exact: true,
    component: Home,
  },
  {
    path: '/academix/sub/:subCategoryId/:subCategoryName',
    exact: true,
    component: Items,
  },
  {
    path: '/academix/:categoryId/:categoryName',
    exact: true,
    component: SubCategories,
  },
];

ReactDOM.render(<App routes={routes} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
