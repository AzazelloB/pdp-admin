import axios, { AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (config: AxiosRequestConfig) => {
  const newInstance = axios.create({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    ...config,
  });

  return newInstance;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const api = createAxiosInstance({
  baseURL: 'http://localhost:5001/review-form-e7e13/europe-west2/',
});

export {
  api,
};
