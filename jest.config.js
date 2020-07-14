module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60000,
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  globalSetup: "<rootDir>/src/test/globalSetup.ts",
  runner: "./serial-jest-runner.js",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
};
