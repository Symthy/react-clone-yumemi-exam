// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const forbiddenBody = { statusCode: '403', message: 'Forbidden.', description: '' };

export const forbidden: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(ctx.status(200), ctx.json(forbiddenBody));
