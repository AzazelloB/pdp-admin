import axios, { AxiosRequestConfig } from 'axios';
import { getUserToken } from 'utils/auth';

export const createAxiosInstance = (config: Partial<AxiosRequestConfig>) => {
  const newInstance = axios.create({
    ...config,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return newInstance;
};

const api = createAxiosInstance({
  baseURL: process.env.REACT_APP_API_BASE,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getUserToken();
    config.headers.set('Authorization', `Bearer ${token}`);
  } catch {
    // user is not logged in
  }

  return config;
});

export {
  api,
};
