import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import { app } from './app';

export const functions = getFunctions(app, 'europe-west2');
connectFunctionsEmulator(functions, 'localhost', 5001);

export const getUsers = httpsCallable(functions, 'getUsers');
export const grantUserRole = httpsCallable(functions, 'grantUserRole');
