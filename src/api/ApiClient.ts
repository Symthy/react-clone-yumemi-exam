import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiClient {
  get<T>(url: string, queryParams?: Record<string, any>): Promise<T>;
}

export class AxiosApiClient implements ApiClient {
  private axios: AxiosInstance;

  constructor(private baseUrl: string, config?: AxiosRequestConfig) {
    this.axios = Axios.create({
      ...config,
      baseURL: baseUrl,
      headers: {
        Accept: 'application/json'
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
    return response.then((res) => res.data);
  }
}
