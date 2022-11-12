/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // SyntaxError: Unexpected token 'export' はこれで解決 ref: https://github.com/facebook/jest/issues/12036
    '^d3-(.+)$': `<rootDir>/node_modules/d3-$1/dist/d3-$1`, // recharts が依存している
    '^src/(.+)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/src/e2e/', '<rootDir>/tests-examples/']
};
