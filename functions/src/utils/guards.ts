import { getAuth } from 'firebase-admin/auth';

import { Middleware } from './middleware';

export const isAuthenticated: Middleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send();
  }

  const tokenResult = await getAuth().verifyIdToken(token);

  if (!tokenResult) {
    return res.status(401).send();
  }

  res.locals = {
    ...res.locals,
    uid: tokenResult.uid,
    role: tokenResult.role,
  };

  return next();
};

export const isAuthorized: (role: string) => Middleware = (role) => async (req, res, next) => {
  if (res.locals.role !== role) {
    return res.status(403).send();
  }

  return next();
};
