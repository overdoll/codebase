const cfg = require('../webpack.config')

const path = require('path')

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  typescript: {
    reactDocgen: 'none',
  },
  stories: [
    './stories/**/*.stories.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  babel: async config => ({
    ...config,
    plugins: [...config.plugins, [
      '@babel/plugin-proposal-class-properties',
      { loose: true }
    ]],
  }),
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...cfg.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react',
        },
      },
    }
  },
}
