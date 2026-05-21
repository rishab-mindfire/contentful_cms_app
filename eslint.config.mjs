import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  //  GLOBAL IGNORES (Prisma, Next builds, etc.)
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'out/**',
      'prisma/generated/**',
      'lib/generated/prisma/**', // Added your specific custom Prisma path
    ],
  },

  // BASE RECOMMENDED & NEXT CONFIGS
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // GLOBAL ENVIRONMENT SETTINGS
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Automatically fixes 'alert', 'window', etc.
        ...globals.node,    // Automatically fixes 'module', 'require' in config files
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Stops demanding 'import React'
      'no-console': ['error', { allow: ['warn', 'error'] }], // Blocks console.log but keeps warns/errors
      '@typescript-eslint/no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
    },
  },

  //  PRETTIER OVERRIDE (Must be last to turn off conflicting styling rules)
  eslintConfigPrettier,
];
