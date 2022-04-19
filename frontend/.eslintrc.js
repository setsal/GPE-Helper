module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-shadow": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": ["error", { "custom": "ignore" }],
    "react/prop-types": 0,
    "no-console": "off",
    "linebreak-style": ["off", "windows"]
  },
};
