module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
      '\\.html$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  