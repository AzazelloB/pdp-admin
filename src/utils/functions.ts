import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

import { app } from './app';

export const functions = getFunctions(app, 'europe-west2');

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
