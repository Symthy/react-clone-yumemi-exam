import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const mockPopulationsApi: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      // TODO
    })
  );
};
