// eslint-disable-next-line import/no-extraneous-dependencies
import { ResponseResolver, MockedRequest, restContext } from 'msw';

export const mockPrefectures = {
  message: null,
  result: [
    {
      prefCode: 36,
      prefName: '徳島県'
    },
    {
      prefCode: 37,
      prefName: '香川県'
    },
    {
      prefCode: 38,
      prefName: '愛媛県'
    },
    {
      prefCode: 39,
      prefName: '高知県'
    },
    {
      prefCode: 40,
      prefName: '福岡県'
    },
    {
      prefCode: 41,
      prefName: '佐賀県'
    },
    {
      prefCode: 42,
      prefName: '長崎県'
    },
    {
      prefCode: 43,
      prefName: '熊本県'
    },
    {
      prefCode: 44,
      prefName: '大分県'
    },
    {
      prefCode: 45,
      prefName: '宮崎県'
    },
    {
      prefCode: 46,
      prefName: '鹿児島県'
    },
    {
      prefCode: 47,
      prefName: '沖縄県'
    }
  ]
};

export const mockPrefecturesApi: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(
    ctx.status(200),
    // source : https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
    ctx.json(mockPrefectures)
  );
