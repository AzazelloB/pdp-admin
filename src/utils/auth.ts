import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  signInWithCredential,
  User,
} from 'firebase/auth';

import type { IGoogleCallbackResponse } from 'react-google-one-tap-login/dist/types/types';

import { app } from './app';
import { registerUser } from './functions';

export const auth = getAuth(app);

export const signInWithGooglePopup = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, googleProvider);

    afterLogin(user);
  } catch (err) {
    console.error(err);
  }
};

export const signInWithGoogleOneTap = async (response: IGoogleCallbackResponse) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);

    const { user } = await signInWithCredential(auth, credential);

    afterLogin(user);
  } catch (err) {
    console.error(err);
  }
};

const afterLogin = async (user: User) => {
  await registerUser({
    email: user.email,
  });

  await user.getIdToken(true);
  await user.reload();
  auth.updateCurrentUser(user);
};

export const logout = () => {
  signOut(auth);
};
