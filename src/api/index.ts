import axios, { AxiosRequestConfig } from 'axios';
import { getUserToken } from 'utils/auth';

const pathParamsInterceptor = (config: AxiosRequestConfig) => {
  if (!config.url) {
    return config;
  }

  let formattedUrl = config.url;
  Object.entries(config.pathParams || {}).forEach(([
    k,
    v,
  ]) => {
    formattedUrl = formattedUrl.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    ...config,
    url: formattedUrl,
  };
};

export const createAxiosInstance = (config: Partial<AxiosRequestConfig>) => {
  config.headers?.setContentType('application/json');

  const newInstance = axios.create(config);

  newInstance.interceptors.request.use(pathParamsInterceptor);

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
