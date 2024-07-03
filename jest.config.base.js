module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  };
  