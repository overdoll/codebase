const path = require('path');

module.exports = {
  reporters: ['default'],
  collectCoverage: true,
  coverageReporters: [
    ['lcovonly', { file: 'coverage.dat', projectRoot: '../../' }],
  ],
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
  coverageDirectory: process.env.COVERAGE_OUTPUT_FILE.replace(
    '/coverage.dat',
    '',
  ),
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
