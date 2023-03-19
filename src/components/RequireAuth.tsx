import { useUser } from 'hooks/useUser';

import Layout from 'components/Layout';
import { FormattedMessage } from 'react-intl';

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const user = useUser();

  // TODO redirect to login at some point
  if (user === null) {
    return (
      <Layout>
        <div>
          <FormattedMessage
            defaultMessage="Login to view this page"
          />
        </div>
      </Layout>
    );
  }

  return children;
};

export default RequireAuth;
