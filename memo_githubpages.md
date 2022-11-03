# Github Pages

## React

react-router-dom の BrowserRouter を使用している場合は、以下の通り直接 URL を踏むを Github の 404 ページに遷移してしまう

[React で gh-pages にデプロイしたとき、直接 URL を踏むと 404 が返る問題への対応](https://qiita.com/takuya0206/items/f284b5e68f48f1ebefae)

原因：ブラウザーはその URL のサーバー (この場合は GitHub ページ サーバー) を要求するが、この時点でクライアント側のルーター (react-router) は、そのページをまだ読み込めていないため、アクションを実行できず、404 が出る。

対処：

以下の 404.html と index.html の script をコピペする

[rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)

Vite の場合 そのままではリダイレクト先が https://username.github.io/?/repo-name/ になってしまうため 404.html 内の `var pathSegmentsToKeep` を 1 にする（ そうすれば https://username.github.io/repo-name/?/ になる）

### Github Pages 時のみ取り込む

404.html と index.html の script を Github Pages デプロイ用のビルド時のみ取り込む

```typescript
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: process.env.GITHUB_PAGES
        ? {
            index: `${__dirname}/index.html`,
            notfound: `${__dirname}/404.html`
          }
        : {
            index: `${__dirname}/index.html`
          }
    }
  },
```

index.html 内の script は 以下をヒントに、置換にて Github Pages デプロイ時のみスクリプトを取り込むようにした

[Vite 環境で index.html から環境変数を参照する](https://dev.classmethod.jp/articles/vite-index-html-read-env-variables/)

```typescript
// ref: https://dev.classmethod.jp/articles/vite-index-html-read-env-variables/
// ref: https://vitejs.dev/guide/api-plugin.html#transformindexhtml
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    enforce: 'pre' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /    %SCRIPT_FOR_GITHUB_PAGES%/g,
        process.env.GITHUB_PAGES ? fs.readFileSync('./ghpages/script.txt', 'utf8') : ''
      );
    }
  };
};
```

もっと良いやり方はありそう…
