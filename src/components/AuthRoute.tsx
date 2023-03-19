import { Outlet } from 'react-router-dom';

import RequireAuth from './RequireAuth';

const AuthRoute = () => {
  return <RequireAuth><Outlet /></RequireAuth>;
};

export default AuthRoute;
