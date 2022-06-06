const path = require('path')

module.exports = {
  reporters: ['default'],
  collectCoverage: true,
  coverageReporters: [
    ['lcovonly', {
      file: 'coverage.dat',
      projectRoot: './'
    }]
  ],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@//:modules(.*)$': '<rootDir>/src/modules$1',
    '^@//:domain(.*)$': '<rootDir>/src/domain$1',
    '^@//:common(.*)$': '<rootDir>/src/common$1',
    '^@//:artifacts(.*)$': '<rootDir>/src/__generated__$1',
    '^@//:assets(.*)$': '<rootDir>/src/assets$1',
    '\\.(scss|sass|css)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '.babelrc') }
    ]
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}
