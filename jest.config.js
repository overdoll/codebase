const path = require('path');

// Have to set chdir here - for some reason it breaks when passed to --node-options
module.exports = {
  reporters: ['default'],
  collectCoverage: true,
  coverageReporters: [['clover', { file: 'coverage.dat' }]],
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
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
