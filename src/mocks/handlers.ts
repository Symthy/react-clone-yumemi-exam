// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { RESAS_API_ENDPOINT, RESAS_API_POPULATIONS_PATH, RESAS_API_PREFECTURES_PATH } from 'src/api/constants';
import { forbidden } from './resolvers/errorForbidden';
import { serverError } from './resolvers/errorServerError';
import { mockPopulationsApi } from './resolvers/mockPopulationApi';
import { mockPrefecturesApi } from './resolvers/mockPrefecturesApi';

export const mockPrefecturesApiHandler = rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, mockPrefecturesApi);
export const mockPopulationsApiHandler = rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, mockPopulationsApi);

export const mockPrefecturesForbiddenHandler = rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, forbidden);
export const mockPopulationsForbiddenHandler = rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, forbidden);

export const mockPrefecturesServerErrorHandler = rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, serverError);

export const handlers = [mockPrefecturesApiHandler, mockPopulationsApiHandler];
