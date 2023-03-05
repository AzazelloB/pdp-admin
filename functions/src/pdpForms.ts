import { db } from './utils/bootstrap';
import { isAuthenticated } from './utils/guards';
import { createRequest } from './utils/request';

export const getPDPForms = createRequest(async (req, res) => {
  const refUser = await db
    .collection('PDPForms')
    .where('userId', '==', res.locals.uid)
    .get();

  const refMentor = await db
    .collection('PDPForms')
    .where('mentorId', '==', res.locals.uid)
    .get();

  if (refUser.size === 0 && refMentor.size === 0) {
    return res.status(404).send();
  }

  const PDPForms = refUser.size ? refUser.docs : refMentor.docs;

  return PDPForms.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}, [isAuthenticated]);

export const getPDPForm = createRequest(async (req, res) => {
  const id = req.params[0];

  const ref = await db
    .collection('PDPForms')
    .doc(id)
    .get();

  if (!ref.exists) {
    return res.status(404).send();
  }

  const PDPForm = ref.data()!;

  if (PDPForm.userId !== res.locals.uid && PDPForm.mentorId !== res.locals.uid) {
    return res.status(403).send();
  }

  return PDPForm;
}, [isAuthenticated]);

export const updatePDPForm = createRequest(async (req, res) => {
  const id = req.params[0];
  const data = req.body;

  const ref = db
    .collection('PDPForms')
    .doc(id);

  const result = await ref.get();

  if (!result.exists) {
    return res.status(404).send();
  }

  const PDPForm = result.data()!;

  if (PDPForm.userId !== res.locals.uid && PDPForm.mentorId !== res.locals.uid) {
    return res.status(403).send();
  }

  await ref.update(data);

  return data;
}, [isAuthenticated]);
