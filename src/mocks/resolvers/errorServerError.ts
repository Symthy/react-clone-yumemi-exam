// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const serverError: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => res(ctx.status(500));
