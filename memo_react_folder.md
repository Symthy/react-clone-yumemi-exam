# フォルダ構成

大事なのは、

- １機能を構成する要素(hooks/provider/context 等)は１パッケージにまとめて格納すること（hooks/provider 毎での分散配置はアンチパターン）
- 横断的関心事（共通コンポ/関数や定数等）と機能(features)で閉じる物を明確に分ける
- 機能(features)で閉じて、依存関係を「機能(features) -> 横断的関心事」とする。このように全体で依存関係が入り乱れないようにする

## サンプル

大規模向け。components の下に色々置くでは見通しが悪くなるので、機能ごとに分け、さらに構成要素毎にフォルダを切る。

- [React ベストプラクティスの宝庫！「bulletproof-react」が勉強になりすぎる件](https://zenn.dev/meijin/articles/bulletproof-react-is-best-architecture)
- https://github.com/alan2207/bulletproof-react

```
src
|
+-- assets      # イメージ、フォントなどのすべての静的ファイルを格納
|
+-- components  # 共有コンポーネント
|
+-- config      # グローバル構成、env変数など
|
+-- features    # 機能ベースモジュール ★
|    +--<featureName>
|        +-- api         # エクスポートされたAPIリクエスト宣言と特定機能に関連するAPIフック
|        |
|        +-- components  # 特定機能にスコープした構成部品
|        |
|        +-- hooks       # 特定機能にスコープしたhooks
|        |
|        +-- routes      # 特定機能にスコープしたrouteコンポーネント # イメージ的にはpage兼routingのイメージ
|        |
|        +-- stores      # 特定機能にスコープした状態ストア
|        |
|        +-- types       # 特定機能のドメインの型
|        |
|        +-- utils       # 特定機能のUtility関数
|        |
|        +-- index.ts    # 機能のエントリポイントの場合は、特定の機能のパブリックAPIとして機能し、機能の外部で使用する必要があるすべてのものをエクスポートする。
|
+-- hooks       # 共有フック
|
+-- lib         # 外部ライブラリの再エクスポート
|
+-- providers   # all of the application providers
|
+-- routes      # routes configuration
|
+-- stores      # global state stores
|
+-- test        # test utilities and mock server
|
+-- types       # アプリケーション全体で使用する基本型
|
+-- utils       # 共有Utility関数
```

小規模～中規模なら、components の下にフォルダを切って格納していく形でもよさそう

小規模で済むなら、公式のような構成でも良さそうだし

- [React 公式 Doc ファイル構成](https://ja.reactjs.org/docs/faq-structure.html)

多少大きくなるようなら以下のように components を分けるのが良さそう

- [SPA Component の推しディレクトリ構成について語る](https://zenn.dev/yoshiko/articles/99f8047555f700)

```
src
+-- components
|    +-- page  # 1ページを表すコンポーネント (Next.js 使用時)
|    |    +-- top
|    +-- model
|    |    +-- user  # ステート＆ロジック？機能？
|    +-- ui
|    ~    +-- button  # ステートを持たないような表示のみのコンポーネント
|    +-- functional
+-- pages  # Next.js使用時 こちらはルーティングのみにする
```

- ★ [そのファイル、本当に hooks・utils に入れるんですか？React プロジェクトを蝕む「技術駆動パッケージング」](https://qiita.com/honey32/items/dbf3c5a5a71636374567)

```
src/
  ├ components/ ... 汎用的なコンポーネント
  ├ consts/     ... 中央管理したい定数群
  ├ hooks/      ... 汎用的なカスタムフック
  ├ features/
  │   ├ users/  ... ユーザー関連の機能
  │   └ posts/  ... 投稿関連の機能
  └ concerns/       ... 全体を横断して使われる、技術者視点で抜き出した個々の機能
      ├ auth/   ... ページや操作の許可・不許可
      └ toast/  ... トースト関連
          ├ Toast.tsx
          ├ toastContext.tsx
          ├ ToastProvider.tsx
          └ useToast.ts
```

- ※ Toast コンポーネントの Props と、状態管理の型を別々に切り離し、Toast.tsx だけ components/ 以下に移動するのもありかもらしい

規模に合わせて、段階的に？フォルダ構成を変えるのが良い？。以下も大規模になった際は、features フォルダを導入している。

refs:

- [React Folder Structure in 5 Steps [2022]](https://www.robinwieruch.de/react-folder-structure/)

- [Evolution of a React folder structure and why to group by features right away](https://profy.dev/article/react-folder-structure)

その他

- フォルダはパスカルケース
  > コンポーネントベースの UI ライブラリを使用するフロントエンドでは、コンポーネントを含むフォルダー/ファイルの場合、この名前付け規則が PascalCase に変更されました。
- pages フォルダは 複数ページ構成なら設けた方が良さそう（pages は Next.js での慣習）

## まとめ

上記の総括。src 直下は以下のように分けていくのが良い？（あくまで個人の見解）

この分け方がベストというわけではない。大事なのは、適切に責務/関心等の分離/分類がしやすい形に小さく分ける。管理と把握と拡張をしやすく保つこと。

以下の図のイメージが素晴らしい。

- ★ [そのファイル、本当に hooks・utils に入れるんですか？React プロジェクトを蝕む「技術駆動パッケージング」：２．責務に従ったパッケージングで解決](https://qiita.com/honey32/items/dbf3c5a5a71636374567#%EF%BC%92%E8%B2%AC%E5%8B%99%E3%81%AB%E5%BE%93%E3%81%A3%E3%81%9F%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E3%81%A7%E8%A7%A3%E6%B1%BA)

features と components/models の明確な境界がイメージしきれてない（実践してみないと恐らく見えてこない）。悩む＆小規模なら統合しても良いかも

```
src/
  ├ components/          # 共通コンポーネント（特定のfeatureに関係なくまたいで利用されるようなコンポーネント）
  |  ├ pages/              # ページコンポーネント ※features内に入れるべきか不明。個人的にはひとまとめにする場所が欲しい
  |  ├ ui/ or view/        # Viewの部品。見た目に関するコンポーネント
  |  └ models/             # その他。モデルに関するコンポーネント（domain/entityに近いイメージ）
  ├ consts/              # (中央管理したい)共通定数群
  ├ configs/             # グローバル構成、env変数など (constsと一緒でもいいかも)
  ├ hooks/               # 共通カスタムフック
  ├ features/            # 機能ベースコンポーネント群（機能毎でフォルダを割った方がいいなら割る）
  |  └ <FeatureName>/    # ※以下は大規模でなければ分けずにファイル名管理でも十分ならそれで良いと考える
  |    ├ api/              # APIフック
  |    ├ components/
  |    ├ hooks/
  |    ├ routes/ or pages/
  |    ├ stores/ or contexts/
  |    ├ types/
  |    ├ test/
  |    ├ utils/
  |    └ index.js or index.ts
  ├ concerns/            # 横断的に使用する機能コンポーネント群
  ├ providers/           # アプリケーション（全体にかかわる）プロバイダー
  ├ routes/              # ルーティング設定
  ├ stores/ or contexts/ # グローバルストア (Reactのcontextのみならcontextの方が良いかも？)
  ├ libs/ or external/   # 外部ライブラリをラップしたもの
  ├ utils/ or services/  # 共通Utility関数群（functinalでも良いかも？ ここは人/組織で命名がブレる）
  ├ types/               # 全体で共有する型定義
  └ test                 # test utilities and mock server
```
