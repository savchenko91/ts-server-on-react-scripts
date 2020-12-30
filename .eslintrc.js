// https://medium.com/@brygrill/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97

module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'error',
    'no-param-reassign': 'off',
    'default-case': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': [1],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-case-declarations': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    jasmine: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: '999.999.999',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    project: './tsconfig.json',
  },
}
