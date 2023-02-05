import { api } from 'api';
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
  await api.post('registerUser', {
    email: user.email,
  });

  await user.getIdToken(true);
  await user.reload();
  auth.updateCurrentUser(user);
};

export const logout = () => {
  signOut(auth);
};

export const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        resolve(token);
      } else {
        reject();
      }

      unsub();
    });
  });
};
