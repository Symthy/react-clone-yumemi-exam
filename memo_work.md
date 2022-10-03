# 環境構築関連

## vite

https://vitejs.dev/guide/

新規

```
npm create vite clone-yumemi-frontend -- --template react-ts
```

### パス alias 設定

[Vite+React+TypeScript+EsLint で、Import パスにエイリアスを使うためにハマったこと](https://zenn.dev/longbridge/articles/5e33ff1a625158#vite-%2B-react-%2B-typescript%E3%81%A7%E3%83%91%E3%82%B9%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9%E3%81%AE%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)

以下を使えば多少容易にできる

[vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)

## フォーマット設定（eslint/prettier/stylelint）

[Vite で作成した React（TypeScript）プロジェクトに EsLint と Prettier を導入する（2022/02）](https://zenn.dev/longbridge/articles/ae3aa36cf17d73)

### eslint

```
$ npm install eslint --save-dev
$ npm init @eslint/config
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.28.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
Installing eslint-plugin-react@^7.28.0, @typescript-eslint/eslint-plugin@latest, eslint-config-airbnb@latest, eslint@^7.32.0 || ^8.2.0, eslint-plugin-import@^2.25.3, eslint-plugin-jsx-a11y@^6.5.1, eslint-plugin-react-hooks@^4.3.0, @typescript-eslint/parser@latest
```

```
npm install eslint-config-airbnb-typescript --save-dev
npm i -D eslint-plugin-unused-imports
npm i -D eslint-plugin-import
npm i -D eslint-import-resolver-typescript
npm i -D eslint-plugin-storybook@latest
npm i -D eslint-plugin-jest
```

ルールの設定は最小限に

- [ESLint のルールを全部手動で設定するのは大変だからやめておけ](https://qiita.com/khsk/items/0f200fc3a4a3542efa90)

import の自動ソート

- [ESlint で import を自動ソートする](https://zenn.dev/riemonyamada/articles/02e8c172e1eeb1#pathgroupsexcludedimporttypes)

alias

- [Vite+React+TypeScript+EsLint で、Import パスにエイリアスを使うためにハマったこと](https://zenn.dev/longbridge/articles/5e33ff1a625158)

設定

- [ESLint で TypeScript のコーディング規約チェックを自動化しよう](https://typescriptbook.jp/tutorials/eslint)
- [ESLint 設定を作成する技術](https://zenn.dev/januswel/articles/402774d76424e71ac906)
- [Vite + React (TypeScript) のプロジェクトに ESLint と Prettier を導入する。](https://chaika.hatenablog.com/entry/2022/05/15/150000)

### prettier

```
npm install -D prettier
npm install -D eslint-config-prettier
```

### stylelint

```
npm i -D stylelint stylelint-config-standard stylelint-config-standard-scss stylelint-config-recess-order stylelint-config-prettier stylelint-scss
```

```javascript
// stylelintrc.js
module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  'string-quotes': 'double',
  ignoreFiles: ['/dist/*', '**/node_modules/**'],
  rules: {
    'at-rule-no-unknown': null, // stylelint-scss推奨ルール
    'scss/at-rule-no-unknown': true, // stylelint-scss推奨ルール
    indentation: 2
  }
};
```

refs:

- [Stylelint を導入したときのあれこれ](https://lab.astamuse.co.jp/entry/stylelint)
- [Prettier と ESLint・Stylelint の併用](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html)

## husky

チームメンバーの利用しているエディタの設定に依存せず Linter や Formatter を強制実行できる

- [【React】husky でコードフォーマットとコミットメッセージ生成を自動化する](https://zenn.dev/kindmaple/articles/44c3ee41bbfd91)
- [husky v7 と lint-staged でコミット時にリント実行](https://rinoguchi.net/2021/12/husky-and-lint-staged.html)

```
npm husky install
npx husky add .husky/pre-commit "npm run lint-staged"
```

## storybook

```
npx storybook init --builder @storybook/builder-vite
```

ref:

- [Vite + React + TypeScript に Vite 用 Storybook を導入する。Storybook は必要だぞ](https://zenn.dev/longbridge/articles/13e65ef71455e4)

以下のエラーが起きるため、react/require-default-props を off にする

```
propType "xxx" is not required, but has no corresponding defaultProps declaration.(eslint: react/require-default-props)
```

解決策はいくつか挙げられるものの、どれも不十分なため off にする方がよさそう

- [propType "name" is not required, but has no corresponding defaultProps declaration](https://www.angularfix.com/2022/02/proptype-is-not-required-but-has-no.html)

以下エラーについて

```
[vite]: Rollup failed to resolve import "@mdx-js/react" from "src/stories/Introduction.stories.mdx".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
```

react18 と @mdx-js v2 の相性の問題？ (2022/7/16 時点では未解決)

mdx 関係はバグがいくつかありそう。明確な回避方法が分からない。mdx 使わない方向で対処

mdx ファイルを使わなければ、この問題にはぶつからないため

- [[Bug] 'mdx' is not exported by node_modules/@mdx-js/react/index.js](https://github.com/storybookjs/builder-vite/issues/421)

以下問題 1 の対処やったが解決せず（参考までに貼り）

- [Storybook が Vite の Builder で動かない問題の回避策](https://zenn.dev/yogarasu/articles/75f7129d7a40bb)

### パス alias 設定

以下の vite.config.ts を流用する方法ではうまくいかず

[Vite + React + TypeScript に Vite 用 Storybook を導入する。Storybook は必要だぞ](https://zenn.dev/longbridge/articles/13e65ef71455e4#storybook-%E8%B5%B7%E5%8B%95%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-.main.js-%E3%81%AE%E8%A8%AD%E5%AE%9A)

以下でうまくいった。

```javascript
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      src: path.resolve(__dirname, '../src'),
    };
    return config;
  },
```

### storybook test

```
npm i -D @storybook/addon-interactions @storybook/jest @storybook/testing-library @storybook/test-runner jest
```

[Storybook 単体でインタラクションテストを実施する](https://zenn.dev/azukiazusa/articles/storybook-interaction-testing)

[Interaction Testing with Storybook](https://storybook.js.org/blog/interaction-testing-with-storybook/)

### addon

#### a11y

```
npm -i -D @storybook/addon-a11y
```

## Chromatic

https://www.chromatic.com/

https://storybook.js.org/tutorials/ui-testing-handbook/react/en/automate/

※Github リポジトリの settings - security - sercrets - actions で Repository sercrets に トークン(CHROMATIC_PROJECT_TOKEN) の追加が必要

## その他

### TypeScript

[TypeScript のコードレビューを依頼された人のための!と?の解説](https://dev.classmethod.jp/articles/typescript-assertions/)

### npm vs yarn vs pnpm

[npm と yarn と pnpm の違い 2021](https://zenn.dev/hibikine/articles/27621a7f95e761)

結論：

- 複数人開発なら、npm
- 個人開発なら、yarn or pnpm

pnpm

- 最後発のため標準で対応していないライブラリがあるらしい。storybook とか（致命傷）

yarn

- 開発者間でバージョンが違うと、lock ファイルに差分が出るらしい
- Yarn v2 は、npm との仕組みと大きく乖離しているらしい

速度： npm < yarn < pnpm

### npm

パッケージのバージョンアップ方法

```
npx -p npm-check-updates  -c "ncu -u"
```

[package.json に記載されているパッケージのバージョンアップ方法 【 npm-check-updates, outdated 】](https://qiita.com/sugurutakahashi12345/items/df736ddaf65c244e1b4f)

### E2E テストフレームワーク

[E2E テストフレームワークの Cypress に入門した](https://zenn.dev/manalink/articles/manalink-cypress-introduce)

[ブラウザ拡張の E2E テストを検討してみた（Playwright、Puppeteer、Cypress）](https://tech.techtouch.jp/entry/e2e-testing-tool#:~:text=Playwright%20%E3%81%A8%20Puppeteer%20%E3%81%AF%E3%80%8C%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6,%E3%82%92%E6%89%B1%E3%81%86%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82)

- Cypress

  - 複数タブについては Cypress はアーキテクチャ上、永久にサポート不可能
  - Component Testing というコンポーネント単位で E2E できるという衝撃的な新機能

- Playwright

  - 複数のページ（タブ）を単一のテストケースでサポートできること

### msw

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
