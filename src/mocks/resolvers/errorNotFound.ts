// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const notFoundBody = {
  statusCode: '404',
  message: "404. That's an error.",
  description: 'The requested URL /404 was not found on this server.'
};

export const notFound: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(ctx.status(200), ctx.json(notFoundBody));
