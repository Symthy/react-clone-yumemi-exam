# React Router

```
npm i react-router-dom
npm i -D @types/react-router-dom
```

[React Router Doc: Quick Start](https://reactrouter.com/docs/en/v6/getting-started/overview)

Router の種類（一部のみ。ドキュメント見るべし）

ref: [ルーティングライブラリ、React Router(v5)入門](https://zenn.dev/h_yoshikawa0724/articles/2020-09-22-react-router)

- BrowserRouter：HTML の History API（pushState、replaceState、popstate イベント）を使用して UI を URL と同期させるルーター
- HashRouter：URL のハッシュ部分（window.location.hash）を使用して UI を URL と同期させるルーター
- StaticRouter：location を変更しないルーター
- MemoryRouter
  - URL の履歴をメモリに保持するルーター（アドレスバーの読み取りまたは書き込みは行わない）
  - ブラウザーで URL を変更しないようにするユースケースの時は出番。ルートの履歴はユーザに公開されない
    - ref:[React-Router — MemoryRouter; a how to guide](https://mrsamczynski.medium.com/react-router-memoryrouter-a-how-to-guide-a496318bf981)

以下のように、コンポーネント化も可能（v6 ～？）

ref: https://github.com/alan2207/bulletproof-react/tree/master/src/routes

```typescript
export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  }
];

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to='.' /> }
    ]
  }
];

export const AppRoutes = () => {
  const auth = useAuth();
  const commonRoutes = [{ path: '/', element: <Landing /> }];
  const routes = auth.user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
```

## ref

https://reactrouter.com/en/main/start/overview

[React Router v6 はじめでもわかるルーティングの設定方法の基礎](https://reffect.co.jp/react/react-router-6)
