const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  reporters: ['default', './reporter'],
  moduleNameMapper: {
    '^@//:modules(.*)$': '<rootDir>/src/modules$1',
    '^@//:artifacts(.*)$': '<rootDir>/src/__generated__$1',
  },
  // explicitly specify the path to babel.config.js relative to jest.config.js so
  // jest can find it even when jest.config.js is not in the root folder of the workspace
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '.babelrc') },
    ],
  },
};
