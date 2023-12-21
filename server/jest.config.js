module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupFilesAfterEnv.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/(?!@foo)',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@interfaces(.*)$': '<rootDir>/src/interfaces$1',
    '^@resources(.*)$': '<rootDir>/src/resources$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  roots: ['src'],
};
