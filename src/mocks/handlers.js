import { rest } from 'msw';
export const handlers = [
  rest.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', mockPrefecturesApi),
  rest.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', mockPopulationsApi)
];
