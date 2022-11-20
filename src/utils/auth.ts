import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

import { app } from './app';
import { db } from './db';

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};
