const path = require('path');
const { loadConfigFromFile, mergeConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true,
    interactionsDebugger: true
  },

  // vite.config.ts 再利用うまくいかなかったため直接指定
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      src: path.resolve(__dirname, '../src')
    };

    // ref: https://zenn.dev/rabbit/scraps/e9ab3527f49d45
    // ref: https://chot-inc.com/blog/gmwju-vx95/
    config.plugins = config.plugins.filter(
      (plugin) => !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react'))
    );
    config.plugins.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
    );
    config.esbuild = {
      // Fixed: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
      // https://github.com/vitejs/vite/issues/8644
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    };

    return config;
  }
};
