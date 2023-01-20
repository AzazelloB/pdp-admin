import axios, { AxiosRequestConfig } from 'axios';

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

export {
  api,
};
