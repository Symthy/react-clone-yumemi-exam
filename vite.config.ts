import * as fs from 'fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext', // ref: https://github.com/vitejs/vite/issues/6985#issuecomment-1044375490
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
  plugins: [react({ jsxImportSource: '@emotion/react' }), tsconfigPaths(), htmlPlugin()],
  base: process.env.GITHUB_PAGES ? 'react-clone-yumemi-exam' : './' // Github Pages 用　ref: https://zenn.dev/shivase/articles/009-react-vite-githubpages
});
