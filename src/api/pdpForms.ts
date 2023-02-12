import { api } from 'api';
import { useQuery } from 'react-query';

interface PDPForm {
  mentorId: string;
  userId: string;
  templateId: string;
  data: unknown;
}

interface useUserPDPFormVariables {
  pathParams: {
    id: string;
  }
}

export const useUserPDPForm = ({ pathParams }: useUserPDPFormVariables) => {
  return useQuery<PDPForm[]>(
    ['getUserForm', pathParams],
    () => api.get('getUserForm/:id', { pathParams }).then((response) => response.data),
  );
};
