import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  signInWithCredential,
} from 'firebase/auth';

import type { IGoogleCallbackResponse } from 'react-google-one-tap-login/dist/types/types';

import { app } from './app';

export const auth = getAuth(app);

export const signInWithGooglePopup = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();

    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

export const signInWithGoogleOneTap = async (response: IGoogleCallbackResponse) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);

    await signInWithCredential(auth, credential);
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};
