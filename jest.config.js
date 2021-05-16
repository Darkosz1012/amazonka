export default {
    testEnvironment: "node",
    modulePathIgnorePatterns: [
        "<rootDir>/front/",
        "<rootDir>/__tests__/.*/utils/",
    ],
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
};
