module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(//.*|(\\.|/)(test|spec|steps))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  modulePaths: [
    '<rootDir>/lib'
  ],
  collectCoverage: true,
  coverageDirectory: 'reports',
  coverageReporters: [
    'lcov',
  ],
  reporters: [
    'default',
    '<rootDir>/lib/jest-sonarcloud-reporter.js',
  ]
};
