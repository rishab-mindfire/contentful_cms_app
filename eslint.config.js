import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  //  Core JS Recommended rules
  js.configs.recommended,

  //  Automated TypeScript Configurations
  ...tseslint.configs.recommended,

  // Application Rules (Source Files)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },

  // Test Files Specific Overrides
  {
    // Targets your test files explicitly
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      // Allow console.log/warn inside tests for easy debugging
      'no-console': 'off',
      // Turn off explicit return types on test blocks if necessary
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Disables Next.js specific layout/routing checks inside testing suites
      '@next/next/no-html-link-for-pages': 'off',
    },
  },

  // 5. Global Ignores
  {
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'lib/generated/',
      'commitlint.config.js',
      'commitlint.config.cjs',
    ],
  },
);
