/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // Use ts-jest to transform TypeScript files
  testEnvironment: "jsdom", // Simulates a browser environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Add setup for React Testing Library
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // File extensions to consider
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Transform JS/TS files with Babel
  },
};
