import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

import { signInWithGoogleOneTap } from 'utils/auth';
import { useUser } from 'hooks/useUser';

const OneTapLogin: React.FC = () => {
  const user = useUser();

  useGoogleOneTapLogin({
    disabled: !!user,
    onError: (error) => console.log(error),
    onSuccess: (response) => console.log(response),
    googleAccountConfigs: {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      callback: signInWithGoogleOneTap,
    },
  });

  return null;
};

export default OneTapLogin;
