import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import * as cors from 'cors';

initializeApp();
const db = getFirestore();

const corsHandler = cors({ origin: true });

type Handler = (
  req: functions.https.Request,
  res: functions.Response<unknown>
) => Promise<unknown>;

type Middleware = (
  req: functions.https.Request,
  res: functions.Response<unknown>,
  next: () => void,
) => void;

const applyMiddleware = (
  req: functions.https.Request,
  res: functions.Response<unknown>,
  middlewareList: Middleware[],
) => {
  if (middlewareList.length === 0) {
    return;
  }

  const [middleware, ...rest] = middlewareList;

  middleware(req, res, () => applyMiddleware(req, res, rest));
};

const createRequest = (handler: Handler, middlewareList: Middleware[] = []) => {
  return functions.region('europe-west2').https.onRequest((req, res) => {
    corsHandler(req, res, () => {
      const target = async () => {
        const result = await handler(req, res);

        res.send(result);
      };

      applyMiddleware(req, res, [...middlewareList, target]);
    });
  });
};

const isAuthenticated: Middleware = async (req, res, next) => {
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

const isAuthorized: (role: string) => Middleware = (role) => async (req, res, next) => {
  if (res.locals.role !== role) {
    return res.status(403).send();
  }

  return next();
};

export const getUserRoleList = createRequest(async () => {
  const authenticatedUsersResult = await getAuth().listUsers();
  const userRoleListResult = await db.collection('userRole').get();

  return [
    ...authenticatedUsersResult.users.map((user) => ({
      email: user.email,
      role: user.customClaims?.role,
    })),
    ...userRoleListResult.docs.map((doc) => ({
      email: doc.get('email'),
      role: doc.get('role'),
    })),
  ];
}, [isAuthenticated]);

export const setUserRole = createRequest(async (req) => {
  const data = req.body;

  try {
    const user = await getAuth().getUserByEmail(data.email);

    getAuth().setCustomUserClaims(user.uid, {
      role: data.role,
    });
  } catch {
    const docs = await db
      .collection('userRole')
      .where('email', '==', data.email)
      .get();

    if (docs.docs[0]?.id) {
      db.collection('userRole').doc(docs.docs[0].id).update({
        role: data.role,
      });
    }
  }
}, [isAuthenticated, isAuthorized('admin')]);

export const addUserRole = createRequest(async (req) => {
  const data = req.body;

  await db
    .collection('userRole')
    .add({
      email: data.email,
      role: data.role,
    });

  return true;
}, [isAuthenticated, isAuthorized('admin')]);

export const registerUser = createRequest(async (req) => {
  const { email } = req.body;

  const user = await getAuth().getUserByEmail(email);

  if (!user.customClaims?.role) {
    assignRole(user);
  }
});

const assignRole = async (user: UserRecord) => {
  let role = 'employee';

  try {
    const docs = await db
      .collection('userRole')
      .where('email', '==', user.email)
      .get();

    if (docs.docs[0]?.id) {
      role = docs.docs[0].get('role');

      db.collection('userRole').doc(docs.docs[0].id).delete();
    }
  } catch {
    // do nothing
  }

  await getAuth().setCustomUserClaims(user.uid, {
    role,
  });
};
