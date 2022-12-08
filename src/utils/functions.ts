import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import { app } from './app';

export const functions = getFunctions(app, 'europe-west2');
connectFunctionsEmulator(functions, 'localhost', 5001);

export const getUserRoleList = httpsCallable(functions, 'getUserRoleList');
export const setUserRole = httpsCallable(functions, 'setUserRole');
export const addUserRole = httpsCallable(functions, 'addUserRole');
export const registerUser = httpsCallable(functions, 'registerUser');
