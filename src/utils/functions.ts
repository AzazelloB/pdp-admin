import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import { app } from './app';

export const functions = getFunctions(app, 'europe-west2');
// connectFunctionsEmulator(functions, 'localhost', 5001);

export const getUserRoleList = () => fetch('http://localhost:5001/review-form-e7e13/europe-west2/getUserRoleList');
export const setUserRole = (data: any) => {
  return fetch(
    'http://localhost:5001/review-form-e7e13/europe-west2/setUserRole',
    { body: JSON.stringify(data), method: 'POST' },
  );
};
export const addUserRole = httpsCallable(functions, 'addUserRole');
export const registerUser = httpsCallable(functions, 'registerUser');
