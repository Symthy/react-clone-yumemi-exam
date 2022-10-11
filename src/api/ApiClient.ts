import Axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { resolveApiError } from './error';
import { ErrorResponseBody } from './types';

type QueryParameters = {
  [x: string]: string | number | boolean;
};

export interface ApiClient {
  get<T>(url: string, queryParams?: QueryParameters): Promise<T>;
}

export class AxiosApiClient implements ApiClient {
  private axios: AxiosInstance;

  constructor(private baseUrl: string, headers?: AxiosRequestHeaders) {
    this.axios = Axios.create({
      baseURL: baseUrl,
      headers: {
        ...headers
      }
    });
    // this.axios.interceptors.response.use(
    //   (response) => {
    //     return response.data;  // 型補完が思ったようにできないためinterceptorsは使わない
    //   },
    //   (error) => {
    //     const message = error.response?.data?.message || error.message;
    //     useNotificationStore.getState().addNotification({
    //       type: 'error',
    //       title: 'Error',
    //       message,
    //     });
    //     return Promise.reject(error);
    //   }
    // );
  }

  async get<T>(url: string, queryParams?: QueryParameters): Promise<T> {
    const params =
      queryParams == null
        ? {}
        : {
            params: queryParams
          };
    const response = this.axios.get<T>(url, params);
    return response
      .then((res: AxiosResponse<T>) => res.data)
      .catch((err: AxiosError<ErrorResponseBody>) => {
        const message = err.response?.data?.message || err.message;
        const status = err.response?.status.toString() || err.status;
        return Promise.reject(resolveApiError(message, status));
      });
  }
}
