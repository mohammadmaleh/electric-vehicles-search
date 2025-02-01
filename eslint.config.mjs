import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      semi: ['error'],
      quotes: ['error', 'single'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],

      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: false, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
    },
  }),
];

export default eslintConfig;
