// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { mockPopulationsApi } from './resolvers/mockPopulationApi';
import { mockPrefecturesApi } from './resolvers/mockPrefecturesApi';

export const mockPrefecturesApiHandler = rest.get(
  'https://opendata.resas-portal.go.jp/api/v1/prefectures',
  mockPrefecturesApi
);
export const mockPopulationsApiHandelr = rest.get(
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
  mockPopulationsApi
);

export const handlers = [mockPrefecturesApiHandler, mockPopulationsApiHandelr];
