import { api } from 'api';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

interface Skill {
  name: string;
  userEval: string;
  supervisorEval: string;
  notes: string[];
}

interface Category {
  name: string;
  skills: Skill[];
}

export interface Tab {
  name: string;
  categories: Category[];
}

export interface PDPForm {
  id: string;
  mentorId: string;
  userId: string;
  projectManagerIds: string[];
  hrIds: string[];
  from: string;
  to: string;
  feedback: string;
  type: string;
  level: string;
  archived: boolean;
  tabs: Tab[];
}

interface useUserPDPFormVariables {
  pathParams: {
    id: string;
  }
}

export const usePDPForm = ({ pathParams }: useUserPDPFormVariables) => {
  return useQuery<PDPForm>(
    ['getPDPForm', pathParams],
    () => api.get('getPDPForm/:id', { pathParams }).then((response) => response.data),
  );
};

export const usePDPForms = () => {
  return useQuery<PDPForm[]>(
    ['getPDPForms'],
    () => api.get('getPDPForms').then((response) => response.data),
  );
};

interface UpdatePDPForm {
  data: Partial<PDPForm>;
  pathParams: {
    id: string;
  };
}

export const useUpdatePDPForm = () => {
  return useMutation<
    unknown,
    AxiosError,
    UpdatePDPForm
  >(
    ({ data, pathParams }) => api.patch('updatePDPForm/:id', data, { pathParams }).then((response) => response.data),
  );
};

interface DuplicatePDPForm {
  pathParams: {
    id: string;
  };
  data: {
    newLevel: string;
  }
}

export const useDuplicatePDPForm = () => {
  return useMutation<
    unknown,
    AxiosError,
    DuplicatePDPForm
  >(
    ({
      pathParams,
      data,
    }) => api.post(
      'duplicatePDPForm/:id',
      data,
      { pathParams },
    ).then((response) => response.data),
  );
};

interface AddNote {
  pathParams: {
    id: string;
    tabIndex: number;
    categoryIndex: number;
    skillIndex: number;
  };
  data: {
    note: string;
  }
}

export const useAddNote = () => {
  return useMutation<
    unknown,
    AxiosError,
    AddNote
  >(
    ({
      pathParams,
      data,
    }) => api.post(
      'addNote/:id/:tabIndex/:categoryIndex/:skillIndex',
      data,
      { pathParams },
    ).then((response) => response.data),
  );
};

interface RemoveNote {
  pathParams: {
    id: string;
    tabIndex: number;
    categoryIndex: number;
    skillIndex: number;
    noteIndex: number;
  };
}

export const useRemoveNote = () => {
  return useMutation<
    unknown,
    AxiosError,
    RemoveNote
  >(
    ({
      pathParams,
    }) => api.post(
      'removeNote/:id/:tabIndex/:categoryIndex/:skillIndex/:noteIndex',
      {},
      { pathParams },
    ).then((response) => response.data),
  );
};

interface Template {
  id: string;
  name: string;
  type: string;
  tabs: Tab[];
}

export const useTemplates = () => {
  return useQuery<Template[]>(
    ['getTemplates'],
    () => api.get('getTemplates').then((response) => response.data),
  );
};

export interface AssignTemplateData {
  templateId: string;
  userId: string;
  from: string | null;
  to: string | null;
}

interface AssignTemplate {
  data: AssignTemplateData
}

export const useAssignTemplate = () => {
  return useMutation<
    unknown,
    AxiosError,
    AssignTemplate
  >(
    ({
      data,
    }) => api.post(
      'assignTemplate',
      data,
    ).then((response) => response.data),
  );
};
