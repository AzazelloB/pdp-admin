import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import * as createCors from 'cors';

initializeApp();
const db = getFirestore();

const cors = createCors({ origin: true });

type Handler = (
  req: functions.https.Request,
  resp: functions.Response<unknown>
) => Promise<unknown>;

const createRequest = (handler: Handler) => {
  return functions.region('europe-west2').https.onRequest((req, res) => {
    cors(req, res, async () => {
      const result = await handler(req, res);

      res.send(result);
    });
  });
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
});

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
});

export const addUserRole = createRequest(async (req) => {
  const data = req.body;

  await db
    .collection('userRole')
    .add({
      email: data.email,
      role: data.role,
    });

  return true;
});

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
