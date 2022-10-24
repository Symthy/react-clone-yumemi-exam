# test

[React テスト応用、テストに悩む人へ](https://zenn.dev/tkdn/books/react-testing-patterns/viewer/testing-with-spy)

## Jest

### path alias

moduleNameMapper を使用する

```javascript
  // jest.config.js
  moduleNameMapper: {
    '^src/(.+)$': '<rootDir>/src/$1'
  }
```

refs:

- [How to use path alias in a react project with Typescript + Jest (stackoverflow)](https://stackoverflow.com/questions/51080947/how-to-use-path-alias-in-a-react-project-with-typescript-jest)
- [Jest で alias を使ったモジュール参照を扱う](https://blog.mitsuruog.info/2019/06/jest-module-name-mapper)

### jest-environment-jsdom (React+Jest)

DOM API を使用するテスト、かつ、Jest(v27 以上) を使う場合は指定が必要

デフォルトは jest-environment node

```
/**
 * @jest-environment jsdom
 */
```

```javascript
// jest.config.js 全テストに判定される
module.exports = {
  testEnvironment: 'jsdom'
};
```

refs:

- [Jest の「The error below may be caused by using the wrong test environment」の解決方法](https://qiita.com/mame_daifuku/items/79b6a5a1514a3f067e1a)
- [Jest v28 に上げるためにやったこと](https://zenn.dev/keita_hino/articles/488d31e8c4a240)

### Jest による React テスト

[jest.spyOn()の基本的な使い方を確認してみた](https://dev.classmethod.jp/articles/how-to-basic-use-of-jest-spyon/)

[実装例から見る React のテストの書き方](https://zenn.dev/tkdn/books/react-testing-patterns/viewer/testing-with-spy)
[React テスト応用、テストに悩む人へ](https://zenn.dev/tkdn/books/react-testing-patterns)

## MSW

### 初期構築

```
npm -i -D msw
npm -i -D msw-storybook-addon
```

package.json に以下追加

```
"scripts": {
  "init-msw": "msw init public/"
}
```

```
"msw": {
  "workerDirectory": "public"
}
```

mocks 定義

```
touch src/mocks/handlers.js
touch src/mocks/browser.js
```

ref:

- [Mock Service Worker: GETTING STARED](https://mswjs.io/docs/getting-started)
- [React に MSW を導入する手順](https://zenn.dev/higuchimakoto/articles/d9865193910046)
- [react+vite を playwright+msw で自動テストする](https://zenn.dev/dyoshikawa/articles/07ab82a5cbcde0)

### モックデータ作成

```typescript
// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const getData: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      // レスポンスボディ
    })
  );
```

```typescript
export const apiHandler = rest.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', getData);

export const handlers = [apiHandler];
```

```typescript
// brower用
export const worker = setupWorker(...handlers);
```

```typescript
// server用
export const server = setupServer(...handlers);
```

### MSW による テスト

```typescript
describe('component test', () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

  test('...');
});
```

server.use() を使って特定のテストのみリクエストハンドラーを上書き可能（レスポンスを返却するときに res.once() を使う必要あり）

```typescript
test('error case', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res.once(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
    })
  );

  const { findByText, queryByText } = render(UserList);

  expect(await findByText('Something went wrong...')).toBeInTheDocument();
  expect(queryByText('Loading...')).not.toBeInTheDocument();
});
```

ref: [フロントエンドのテストのモックには msw を使うのが最近の流行りらしい](https://zenn.dev/azukiazusa/articles/using-msw-to-mock-frontend-tests)

#### API 実行時の引数の検証

```typescript
const server = setupMockServer(...handlers);

describe('API call の検証', () => {
  const mockFn = jest.fn();
  beforeEach(() => {
    server.use(
      rest.get('/path/to/api', async (req, res, ctx) => {
        const target = req.url.searchParams.get('search');
        mockFn(target); // <- here
        return res(ctx.json({}));
      })
    );
  });
  test('「test」と入力しエンターキーを押すと、?search=test 付きで API が呼ばれる', async () => {
    render(<MyComponent />);
    const searchbox = await screen.findByRole('searchbox');
    const text = 'test';
    userEvent.type(searchbox, `${text}{enter}`);
    await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockFn).toBeCalledWith(text));
  });
});
```

header の検証も以下でできる

```typescript
server.use(
  rest.get('/path/to/api', async (req, res, ctx) => {
    const target = req.headers.get('x-msw-request-id');
    mockFn(target);
    return res(ctx.json({}));
  })
);
```

ref: [jest における MSW の活用事例](https://zenn.dev/takepepe/articles/jest-msw-mocking)

## E2E テスト

以下４つの比較がある

- TestCafe
- WebDriverIO
- Cypress.io
- Autify (有料)

[E2E テストツール Autify を使うまでの話](https://teamspirit.hatenablog.com/entry/2020/04/17/150000)

Autify の良いところ

- 習得が容易
  - 非エンジニアでも自動テストが作成できる
  - 簡単に作れるので、UI 変更への対応も比較的楽

Cypress は書きにくいらしい

[本気で考える React のベストプラクティス！bulletproof-react2022](https://zenn.dev/t_keshi/articles/bulletproof-react-2022#e2e%E3%83%86%E3%82%B9%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
