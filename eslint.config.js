// https://github.com/sveltejs/eslint-plugin-svelte/issues/732
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import js from '@eslint/js';
import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

import globals from 'globals';

export default [
  {
    ignores: ['.DS_Store', 'node_modules', 'build/', '.svelte-kit/', 'index.js']
  },
  js.configs.recommended,
  ...tsEslint.configs.strict,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginPrettierRecommended, // must be last to override conflicting rules.
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser
      }
    },
    rules: {
      'svelte/no-target-blank': 'error',
      'svelte/no-at-debug-tags': 'error',
      'svelte/no-reactive-functions': 'error',
      'svelte/no-reactive-literals': 'error',
      'svelte/no-at-html-tags': 'off'
    }
  }
];
