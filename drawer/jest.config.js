module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
      '\\.html$': '<rootDir>/src/__mocks__/fileMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    }
  };
  