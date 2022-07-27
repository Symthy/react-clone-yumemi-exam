import { ResponseResolver, MockedRequest, restContext } from 'msw';

export const mockPrefecturesApi: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      // TODO
    })
  );
};
