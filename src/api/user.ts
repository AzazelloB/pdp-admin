import { api } from 'api';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

interface User {
  email: string;
  role: string;
}

export const useUserRoleList = () => {
  return useQuery<User[]>(
    ['getUserRoleList'],
    () => api.get('getUserRoleList').then((response) => response.data),
  );
};

interface SetUserRole {
  data: User
}

export const useSetUserRole = () => {
  return useMutation<
    unknown,
    AxiosError,
    SetUserRole
  >(
    ({ data }) => api.post('setUserRole', data).then((response) => response.data),
  );
};
