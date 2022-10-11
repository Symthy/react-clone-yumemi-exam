import { ApiClient, AxiosApiClient } from './ApiClient';
import { RESAS_API_ENDPOINT, RESAS_API_POPULATIONS_PATH, RESAS_API_PREFECTURES_PATH } from './constants';
import { resolveApiError } from './error';
import { ErrorResponseBody } from './types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isPrefecturesApiResponse = (res: any): res is PrefecturesApiResponse => res.result !== undefined;

export type PrefectureResponeseResult = {
  prefCode: number;
  prefName: string;
};

type PrefecturesApiResponse = {
  result: PrefectureResponeseResult[];
};

export class ResasApiClient {
  private readonly apiKey: string;

  private readonly apiClient: ApiClient;

  constructor(apiKey?: string, apiClient?: ApiClient) {
    if (apiClient) {
      this.apiKey = '';
      this.apiClient = apiClient;
      return;
    }
    this.apiKey = apiKey || '';
    this.apiClient = new AxiosApiClient(RESAS_API_ENDPOINT, this.headers());
  }

  private headers() {
    const headers = {
      Accept: 'application/json'
    };
    return this.apiKey
      ? {
          ...headers,
          'x-api-key': this.apiKey
        }
      : headers;
  }

  public initialized(): boolean {
    return this.apiKey !== '';
  }

  public get resasApiKey(): string {
    return this.apiKey;
  }

  public async getPrefectures(): Promise<PrefectureResponeseResult[]> {
    const res = await this.apiClient.get<PrefecturesApiResponse | ErrorResponseBody>(RESAS_API_PREFECTURES_PATH);
    if (isPrefecturesApiResponse(res)) {
      return res.result;
    }
    throw resolveApiError(res.message || '', res.statusCode);
  }

  public async getPopulations(prefCode: string, cityCode = '-') {
    // specified '-' to cityCode when select all city
    return this.apiClient.get(RESAS_API_POPULATIONS_PATH, {
      prefCode,
      cityCode
    });
    // Todo: error case
  }
}
