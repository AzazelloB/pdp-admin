import { db } from './utils/bootstrap';
import { isAuthenticated } from './utils/guards';
import { createRequest } from './utils/request';

export const getUserPDPForm = createRequest(async (req, res) => {
  const id = req.params[0];

  const ref = await db
    .collection('PDPForms')
    .doc(id)
    .get();

  if (!ref.exists) {
    return res.status(404).send();
  }

  const PDPForm = ref.data()!;

  if (PDPForm.userId !== res.locals.uid) {
    return res.status(403).send();
  }

  const template = await PDPForm.template.get();

  return {
    ...PDPForm,
    template: template.data(),
  };
}, [isAuthenticated]);

export const getUserPDPTemplate = createRequest(async (req, res) => {
  const id = req.params[0];

  const ref = await db
    .collection('formTemplates')
    .doc(id)
    .get();

  if (!ref.exists) {
    return res.status(404).send();
  }

  return ref.data()!;
}, [isAuthenticated]);
