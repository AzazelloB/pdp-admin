import { RouteObject, useRoutes } from 'react-router-dom';

import HomePage from 'pages';
import PDPPage from 'pages/pdp';
import UsersPage from 'pages/users';

import Layout from './Layout';

const App = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout><HomePage /></Layout>,
    },
    {
      path: '/pdp',
      element: <Layout><PDPPage /></Layout>,
    },
    {
      path: '/users',
      element: <Layout><UsersPage /></Layout>,
    },
  ];

  return useRoutes(routes);
};

export default App;
