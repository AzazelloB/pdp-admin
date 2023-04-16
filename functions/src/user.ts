import { getAuth, UserRecord } from 'firebase-admin/auth';

import { createRequest } from './utils/request';
import { isAuthenticated, isAuthorized } from './utils/guards';
import { db } from './utils/bootstrap';

const prepareUsers = (users: UserRecord[]) => {
  return users.map((user) => ({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    role: user.customClaims?.role,
  }));
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

export const getUsers = createRequest(async () => {
  const authenticatedUsersResult = await getAuth().listUsers();

  return prepareUsers(authenticatedUsersResult.users);
}, [isAuthenticated]);

export const getUsersByIdentifier = createRequest(async (req, res) => {
  const { ids } = req.query;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).send();
  }

  const usersResult = await getAuth().getUsers(ids.map((id) => ({
    uid: id,
  })));

  return prepareUsers(usersResult.users);
}, [isAuthenticated]);
