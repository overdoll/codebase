const path = require('path');

// Have to set chdir here - for some reason it breaks when passed to --node-options
process.chdir(__dirname);

module.exports = {
  reporters: ['default', './reporter'],
  moduleNameMapper: {
    '^@//:modules(.*)$': '<rootDir>/src/modules$1',
    '^@//:artifacts(.*)$': '<rootDir>/src/__generated__$1',
  },
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '.babelrc') },
    ],
  },
  coverageDirectory: '<rootDir>',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
