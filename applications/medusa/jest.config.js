const path = require('path')

const expo = {
  reporters: ['default'],
  collectCoverage: true,
  coverageReporters: [
    ['lcovonly', {
      file: 'coverage.dat',
      projectRoot: '../../'
    }]
  ],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@//:modules(.*)$': '<rootDir>/src/modules$1',
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
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

if (process.env.COVERAGE_OUTPUT_FILE) {
  expo.coverageDirectory = process.env.COVERAGE_OUTPUT_FILE.replace(
    '/coverage.dat',
    ''
  )
}

module.exports = expo
