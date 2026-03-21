import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      tailwindcss: tailwindcss,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
