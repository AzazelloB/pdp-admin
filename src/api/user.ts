import { api } from 'api';
import { AxiosError } from 'axios';
import { QueryObserverOptions, useMutation, useQuery } from 'react-query';

interface UserRoleList {
  email: string;
  role: string;
}

export const useUserRoleList = () => {
  return useQuery<UserRoleList[]>(
    ['getUserRoleList'],
    () => api.get('getUserRoleList').then((response) => response.data),
  );
};

interface SetUserRole {
  data: UserRoleList
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

interface AddUserRole {
  data: UserRoleList
}

export const useAddUserRole = () => {
  return useMutation<
    unknown,
    AxiosError,
    AddUserRole
  >(
    ({ data }) => api.post('addUserRole', data).then((response) => response.data),
  );
};

export interface User {
  uid: string;
  displayName: string;
  email: string;
  role: string;
}

export const useUsers = () => {
  return useQuery<User[]>(
    ['getUsers'],
    () => api.get('getUsers').then((response) => response.data),
  );
};

interface UsersByIdentifierParams {
  ids: string[];
}

interface UsersByIdentifierVariables {
  params: UsersByIdentifierParams;
  options?: QueryObserverOptions<User[]>;
}

export const useUsersByIdentifier = (
  { params, options }: UsersByIdentifierVariables,
) => {
  return useQuery<User[]>(
    ['getUsersByIdentifier', params],
    () => api.get('getUsersByIdentifier', { params }).then((response) => response.data),
    options,
  );
};
