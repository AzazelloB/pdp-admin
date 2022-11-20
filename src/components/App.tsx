import { RouteObject, useRoutes } from 'react-router-dom';

import HomePage from 'pages';
import Layout from './Layout';

const App = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout><HomePage /></Layout>,
    },
  ];

  return useRoutes(routes);
};

export default App;
