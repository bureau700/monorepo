const allExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.json'];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/all',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['import', 'prettier', 'promise', '@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    'sort-imports': 'off',
    'import/order': 'warn',
    'max-classes-per-file': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': ['error', allExtensions.reduce((o, ext) => ({ ...o, [ext]: 'never' }), {})],
    'react/no-unescaped-entities': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['**/tests/**/*.{ts,js}', '*.test.{ts,js}'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'jest/prefer-expect-assertions': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-hooks': [
          'error',
          {
            allow: ['afterEach', 'afterAll', 'beforeEach', 'beforeAll'],
          },
        ],
      },
    },
  ],
};
