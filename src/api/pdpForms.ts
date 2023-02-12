import { api } from 'api';
import { useQuery } from 'react-query';

interface PDPForm {
  mentorId: string;
  userId: string;
  template: PDPTemplate;
  values: Record<string, unknown>;
}

interface useUserPDPFormVariables {
  pathParams: {
    id: string;
  }
}

export const useUserPDPForm = ({ pathParams }: useUserPDPFormVariables) => {
  return useQuery<PDPForm>(
    ['getUserPDPForm', pathParams],
    () => api.get('getUserPDPForm/:id', { pathParams }).then((response) => response.data),
  );
};

interface Category {
  name: string;
  skills: string[];
}

interface Tab {
  name: string;
  categories: Category[];
}

export interface PDPTemplate {
  type: string;
  level: string;
  tabs: Tab[];
}

interface useUserPDPTemplateVariables {
  pathParams: {
    id: string;
  }
}

export const useUserPDPTemplate = ({ pathParams }: useUserPDPTemplateVariables) => {
  return useQuery<PDPTemplate>(
    ['getUserPDPTemplate', pathParams],
    () => api.get('getUserPDPTemplate/:id', { pathParams }).then((response) => response.data),
  );
};
