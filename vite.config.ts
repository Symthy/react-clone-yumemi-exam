import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext', // ref: https://github.com/vitejs/vite/issues/6985#issuecomment-1044375490
    rollupOptions: {
      input: {
        main: `${__dirname}/index.html`,
        notfound: `${__dirname}/404.html`
      }
    }
  },
  plugins: [react({ jsxImportSource: '@emotion/react' }), tsconfigPaths()],
  base: process.env.GITHUB_PAGES ? 'react-clone-yumemi-exam' : './' // Github Pages 用　ref: https://zenn.dev/shivase/articles/009-react-vite-githubpages
});
