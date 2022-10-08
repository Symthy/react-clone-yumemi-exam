import Axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios';

export interface ApiClient {
  get<T>(url: string, queryParams?: Record<string, any>): Promise<T>;
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
  }

  async get<T>(url: string, queryParams?: Record<string, any>): Promise<T> {
    const params =
      queryParams == null
        ? {}
        : {
            params: queryParams
          };
    const response = this.axios.get<T>(url, params);
    return response.then((res: AxiosResponse<T>) => res.data);
  }
}
