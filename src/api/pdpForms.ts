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

interface Tab {
  name: string;
  categories: Category[];
}

export interface PDPForm {
  id: string;
  mentorId: string;
  userId: string;
  type: string;
  level: string;
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
  data: PDPForm;
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
