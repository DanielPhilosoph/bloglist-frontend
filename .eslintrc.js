/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "arrow-spacing": ["error", { before: true, after: true }],
    "react/prop-types": 0,
    indent: ["error", 2],
  },
  plugins: ["react", "jest"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
