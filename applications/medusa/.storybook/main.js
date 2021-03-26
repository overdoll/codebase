const cfg = require('../webpack.config');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...cfg.resolve.alias,
        },
      },
    };
  },
};
