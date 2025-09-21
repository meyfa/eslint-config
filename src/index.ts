import { defineConfig } from 'eslint/config'
import { Linter } from 'eslint'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import'
import pluginNode from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginStylistic from '@stylistic/eslint-plugin'
import pluginUnicorn from 'eslint-plugin-unicorn'

const customizedStylistic = pluginStylistic.configs.customize({
  braceStyle: '1tbs',
  quoteProps: 'as-needed',
  commaDangle: 'never',
  arrowParens: true,
  jsx: false
})

export default defineConfig({
  extends: [
    eslint.configs.recommended,
    ...(tseslint.configs.strictTypeChecked as Linter.Config[]),
    ...(tseslint.configs.stylisticTypeChecked as Linter.Config[])
  ],

  plugins: {
    import: pluginImport,
    n: pluginNode,
    promise: pluginPromise,
    '@stylistic': pluginStylistic,
    unicorn: pluginUnicorn
  },

  languageOptions: {
    parserOptions: {
      project: './tsconfig.lint.json'
    }
  },

  rules: {
    ...customizedStylistic.rules,

    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],

    'no-empty': ['error', { allowEmptyCatch: true }],

    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true, ignoreVoidOperator: false }
    ],

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // Force separate exports of things that exist only in the type system (with 'export type { Foo }').
    // This allows using performance-optimized transpilers such as SWC, ESBuild, and similar.
    '@typescript-eslint/consistent-type-exports': 'error',

    // These would be a huge migration task at this time.
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',

    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      vars: 'all'
    }],

    '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: false }],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

    camelcase: ['error', {
      allow: ['^UNSAFE_'],
      properties: 'never',
      ignoreGlobals: true
    }],

    'import/export': 'error',
    'import/first': 'error',
    'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',

    // ES modules require a file extension on every import.
    // NPM packages should be exempted. For example, we want to allow extensionless imports from 'preact/hooks'.
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',

    'promise/param-names': 'error',

    // Prefer 'node:' protocol imports for Node.js built-in modules.
    'unicorn/prefer-node-protocol': 'error',
    // Enforce correct Error subclassing.
    'unicorn/custom-error-definition': 'error',
    // Require Array.isArray() instead of instanceof Array.
    'unicorn/no-instanceof-array': 'error',
    // Disallow comparing undefined using typeof.
    'unicorn/no-typeof-undefined': 'error',
    // Disallow useless fallback when spreading in object literals.
    'unicorn/no-useless-fallback-in-spread': 'error',
    // Prefer .at() method for index access and String#charAt().
    'unicorn/prefer-at': 'error',
    // Prefer Date.now() to get the number of milliseconds since the Unix Epoch.
    'unicorn/prefer-date-now': 'error',
    // Prefer Number static properties over global ones.
    'unicorn/prefer-number-properties': [
      'error',
      { checkInfinity: false }
    ],
    // Prefer String#slice() over String#substr() and String#substring().
    'unicorn/prefer-string-slice': 'error',
    // Enforce using the separator argument with Array#join().
    'unicorn/require-array-join-separator': 'error',
    // Require new when throwing an error.
    'unicorn/throw-new-error': 'error',

    // Enforce the consistent use of the radix argument when using parseInt().
    radix: 'error'
  }
})
