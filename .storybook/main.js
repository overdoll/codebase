module.exports = {
  stories: [
    '../applications/medusa/stories/**/*.stories.mdx',
    '../applications/medusa/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../applications/medusa/src/**/*.stories.mdx',
    '../applications/medusa/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
