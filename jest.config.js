module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60000,
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
