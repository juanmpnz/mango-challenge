import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  maxWorkers: 1,
  testEnvironment: 'node', 
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(module-name|another-module-name)/)",
  ],
};

export default createJestConfig(customJestConfig);
