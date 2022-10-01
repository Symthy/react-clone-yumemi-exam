import { ApiClient, AxiosApiClient } from './ApiClient';

const RESAS_API_ENDPOINT = 'https://opendata.resas-portal.go.jp';
// ref: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html

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

  constructor(apiKey?: string) {
    this.apiKey = apiKey || '';
    this.apiClient = new AxiosApiClient(RESAS_API_ENDPOINT, this.options());
  }

  private options() {
    return this.apiKey || this.apiKey === ''
      ? {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      : {};
  }

  public getPrefectures(): Promise<PrefectureResponeseResult[]> {
    const response = this.apiClient.get<PrefecturesApiResponse>('/api/v1/prefectures');
    return response.then((res) => res.result);
  }

  public getPopulations(prefCode: string, cityCode = '-') {
    // specified '-' to cityCode when select all city
    return this.apiClient.get('/api/v1/population/composition/perYear', {
      prefCode,
      cityCode
    });
  }
}
