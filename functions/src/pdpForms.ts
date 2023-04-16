import * as functions from 'firebase-functions';
import { Timestamp } from 'firebase-admin/firestore';

import { db } from './utils/bootstrap';
import { isAuthenticated } from './utils/guards';
import { createRequest } from './utils/request';
import { parsePathParams } from './utils/parsePathParams';

const REVIEW_PERIOD_IN_MONTH = 3;

// TODO unite frontend and backend types
const canSeeForm = (PDPForm: any, res: functions.Response<unknown>) => {
  return PDPForm.userId === res.locals.uid
      || PDPForm.mentorId === res.locals.uid
      || PDPForm.projectManagerIds.includes(res.locals.uid)
      || PDPForm.hrIds.includes(res.locals.uid);
};

export const getPDPForms = createRequest(async (req, res) => {
  const refUser = await db
    .collection('PDPForms')
    .where('userId', '==', res.locals.uid)
    .where('archived', '==', false)
    .get();

  const refMentor = await db
    .collection('PDPForms')
    .where('mentorId', '==', res.locals.uid)
    .where('archived', '==', false)
    .get();

  const refPM = await db
    .collection('PDPForms')
    .where('projectManagerIds', 'array-contains', res.locals.uid)
    .where('archived', '==', false)
    .get();

  const refHR = await db
    .collection('PDPForms')
    .where('hrIds', '==', res.locals.uid)
    .where('archived', '==', false)
    .get();

  const PDPForms = [
    ...refUser.docs,
    ...refMentor.docs,
    ...refPM.docs,
    ...refHR.docs,
  ];

  if (PDPForms.length === 0) {
    return res.status(404).send();
  }

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

  if (!canSeeForm(PDPForm, res)) {
    return res.status(403).send();
  }

  return {
    ...PDPForm,
    from: PDPForm.from.toDate(),
    to: PDPForm.to.toDate(),
  };
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

  if (!canSeeForm(PDPForm, res)) {
    return res.status(403).send();
  }

  await ref.update({
    ...data,
    from: Timestamp.fromDate(new Date(data.from)),
    to: Timestamp.fromDate(new Date(data.to)),
  });

  return data;
}, [isAuthenticated]);

export const duplicatePDPForm = createRequest(async (req, res) => {
  const id = req.params[0];
  const { newGrade: newLevel } = req.body;

  const ref = db
    .collection('PDPForms')
    .doc(id);

  const result = await ref.get();

  if (!result.exists) {
    return res.status(404).send();
  }

  const PDPForm = result.data()!;

  if (!canSeeForm(PDPForm, res)) {
    return res.status(403).send();
  }

  if (PDPForm.archived) {
    return res.status(400).send();
  }

  if (!newLevel) {
    return res.status(400).send();
  }

  const newTo: Date = PDPForm.to.toDate();
  newTo.setMonth(newTo.getMonth() + REVIEW_PERIOD_IN_MONTH);

  const newPDPForm = {
    ...PDPForm,
    level: newLevel,
    feedback: '',
    from: PDPForm.to,
    to: Timestamp.fromDate(newTo),
    tabs: PDPForm.tabs.map((tab) => ({
      ...tab,
      categories: tab.categories.map((category) => ({
        ...category,
        skills: category.skills.map((skill) => ({
          ...skill,
          supervisorEval: '',
          userEval: '',
        })),
      })),
    })),
  };

  await ref.update({
    archived: true,
  });

  await db
    .collection('PDPForms')
    .add(newPDPForm);

  return true;
}, [isAuthenticated]);

export const addNote = createRequest(async (req, res) => {
  const { note } = req.body;

  const {
    id,
    ...rest
  } = parsePathParams(req.params, ':id/:tabIndex/:categoryIndex/:skillIndex');

  const tabIndex = parseInt(rest.tabIndex, 10);
  const categoryIndex = parseInt(rest.categoryIndex, 10);
  const skillIndex = parseInt(rest.skillIndex, 10);

  const ref = db
    .collection('PDPForms')
    .doc(id);

  const result = await ref.get();

  if (!result.exists) {
    return res.status(404).send();
  }

  const PDPForm = result.data()!;

  if (!canSeeForm(PDPForm, res)) {
    return res.status(403).send();
  }

  if (!note || typeof note !== 'string') {
    return res.status(400).send();
  }

  const updatedPDPForm = {
    ...PDPForm,
    tabs: [
      ...PDPForm.tabs.slice(0, tabIndex),
      {
        ...PDPForm.tabs[tabIndex],
        categories: [
          ...PDPForm.tabs[tabIndex].categories.slice(0, categoryIndex),
          {
            ...PDPForm.tabs[tabIndex].categories[categoryIndex],
            skills: [
              ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills.slice(0, skillIndex),
              {
                ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills[skillIndex],
                notes: [
                  ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills[skillIndex].notes,
                  note,
                ],
              },
              ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills.slice(skillIndex + 1),
            ],
          },
          ...PDPForm.tabs[tabIndex].categories.slice(categoryIndex + 1),
        ],
      },
      ...PDPForm.tabs.slice(tabIndex + 1),
    ],
  };

  await ref.update(updatedPDPForm);

  return updatedPDPForm;
}, [isAuthenticated]);

export const removeNote = createRequest(async (req, res) => {
  const {
    id,
    ...rest
  } = parsePathParams(req.params, ':id/:tabIndex/:categoryIndex/:skillIndex/:noteIndex');

  const tabIndex = parseInt(rest.tabIndex, 10);
  const categoryIndex = parseInt(rest.categoryIndex, 10);
  const skillIndex = parseInt(rest.skillIndex, 10);
  const noteIndex = parseInt(rest.noteIndex, 10);

  const ref = db
    .collection('PDPForms')
    .doc(id);

  const result = await ref.get();

  if (!result.exists) {
    return res.status(404).send();
  }

  const PDPForm = result.data()!;

  if (!canSeeForm(PDPForm, res)) {
    return res.status(403).send();
  }

  const updatedPDPForm = {
    ...PDPForm,
    tabs: [
      ...PDPForm.tabs.slice(0, tabIndex),
      {
        ...PDPForm.tabs[tabIndex],
        categories: [
          ...PDPForm.tabs[tabIndex].categories.slice(0, categoryIndex),
          {
            ...PDPForm.tabs[tabIndex].categories[categoryIndex],
            skills: [
              ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills.slice(0, skillIndex),
              {
                ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills[skillIndex],
                notes: [
                  ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills[skillIndex].notes.slice(0, noteIndex),
                  ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills[skillIndex].notes.slice(noteIndex + 1),
                ],
              },
              ...PDPForm.tabs[tabIndex].categories[categoryIndex].skills.slice(skillIndex + 1),
            ],
          },
          ...PDPForm.tabs[tabIndex].categories.slice(categoryIndex + 1),
        ],
      },
      ...PDPForm.tabs.slice(tabIndex + 1),
    ],
  };

  await ref.update(updatedPDPForm);

  return updatedPDPForm;
}, [isAuthenticated]);
