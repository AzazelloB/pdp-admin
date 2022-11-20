import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { auth } from 'utils/auth';
import { useUser } from 'hooks/useUser';

const OneTapLogin: React.FC = () => {
  const user = useUser();

  useGoogleOneTapLogin({
    disabled: !!user,
    onError: (error) => console.log(error),
    onSuccess: (response) => console.log(response),
    googleAccountConfigs: {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      callback: (response) => {
        const credential = GoogleAuthProvider.credential(response.credential);

        signInWithCredential(auth, credential);
      },
    },
  });

  return null;
};

export default OneTapLogin;
