module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  plugins: [
    //'unused-imports', // ONLY FOR CLEANING
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    //'unused-imports/no-unused-imports-ts': 2, // ONLY FOR CLEANING
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
