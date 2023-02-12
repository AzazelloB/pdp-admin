import 'axios';

declare module 'axios' {
  interface RawAxiosRequestConfig {
      pathParams?: Record<string, string | number>;
  }
}
