import eslint from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import { defineConfig } from 'eslint/config'
import pluginImportX from 'eslint-plugin-import-x'
import pluginNode from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

const customizedStylistic = pluginStylistic.configs.customize({
  braceStyle: '1tbs',
  quoteProps: 'as-needed',
  commaDangle: 'never',
  arrowParens: true,
  jsx: true
})

export default defineConfig({
  extends: [
    eslint.configs.recommended,
    ...(tseslint.configs.strictTypeChecked as Linter.Config[]),
    ...(tseslint.configs.stylisticTypeChecked as Linter.Config[])
  ],

  plugins: {
    'import-x': pluginImportX,
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
    /* ---- core ---- */

    camelcase: ['error', {
      allow: ['^UNSAFE_'],
      properties: 'never',
      ignoreGlobals: true
    }],

    // Require braces for all control statements.
    curly: ['error', 'all'],

    'no-empty': ['error', { allowEmptyCatch: true }],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForStatement[update.type=\'UpdateExpression\'] > UpdateExpression[operator=\'++\'][prefix=false]',
        message: 'Use prefix increment in for-loop update clause: ++i (not i++).'
      },
      {
        selector: 'ForStatement[update.type=\'UpdateExpression\'] > UpdateExpression[operator=\'--\'][prefix=false]',
        message: 'Use prefix decrement in for-loop update clause: --i (not i--).'
      },
      {
        selector: 'ForStatement[update.type=\'SequenceExpression\'] > SequenceExpression > UpdateExpression[operator=\'++\'][prefix=false]',
        message: 'Use prefix increment in for-loop update clause: ++i (not i++).'
      },
      {
        selector: 'ForStatement[update.type=\'SequenceExpression\'] > SequenceExpression > UpdateExpression[operator=\'--\'][prefix=false]',
        message: 'Use prefix decrement in for-loop update clause: --i (not i--).'
      },
      {
        selector: 'ExpressionStatement > UpdateExpression[operator=\'++\'][prefix=false]',
        message: 'Use prefix increment: ++i (not i++).'
      },
      {
        selector: 'ExpressionStatement > UpdateExpression[operator=\'--\'][prefix=false]',
        message: 'Use prefix decrement: --i (not i--).'
      }
    ],

    // Prevent useless renames like `const { foo: foo } = obj`.
    'no-useless-rename': 'error',

    // Prefer `{ foo }` over `{ foo: foo }` (including destructuring).
    'object-shorthand': ['error', 'always'],

    // Enforce the consistent use of the radix argument when using parseInt().
    radix: 'error',

    /* --- import ---- */

    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import-x/export': 'error',
    'import-x/first': 'error',
    'import-x/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import-x/no-duplicates': 'error',
    'import-x/no-named-default': 'error',
    'import-x/order': ['error', {
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      },
      named: {
        enabled: true,
        export: false
      },
      'newlines-between': 'never'
    }],
    'import-x/newline-after-import': ['error', { count: 1 }],
    'import-x/no-webpack-loader-syntax': 'error',

    // ES modules require a file extension on every import.
    // NPM packages should be exempted. For example, we want to allow extensionless imports from 'preact/hooks'.
    'import-x/extensions': ['error', 'always', { ignorePackages: true }],

    /* ---- node ---- */

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',

    /* ---- promise ---- */

    'promise/param-names': 'error',

    /* --- stylistic --- */

    ...customizedStylistic.rules,

    '@stylistic/list-style': ['error', {
      overrides: {
        '{}': {
          multiLine: {
            minItems: 0
          }
        }
      }
    }],

    '@stylistic/object-curly-newline': 'off',
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
    '@stylistic/curly-newline': ['error', {
      multiline: true,
      minElements: 1,
      consistent: true
    }],

    '@stylistic/jsx-closing-bracket-location': ['error'],
    '@stylistic/jsx-closing-tag-location': ['error'],
    '@stylistic/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'never',
      propElementValues: 'always'
    }],
    '@stylistic/jsx-curly-spacing': ['error', { when: 'never', children: true }],
    '@stylistic/jsx-equals-spacing': ['error', 'never'],
    '@stylistic/jsx-first-prop-new-line': 'error',
    '@stylistic/jsx-max-props-per-line': ['error', { when: 'multiline' }],
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/jsx-self-closing-comp': ['error', {
      component: true,
      html: true
    }],
    '@stylistic/jsx-tag-spacing': ['error', {
      afterOpening: 'never',
      beforeClosing: 'never',
      closingSlash: 'never',
      beforeSelfClosing: 'always'
    }],
    '@stylistic/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
      propertyValue: 'parens-new-line'
    }],

    /* ---- typescript ---- */

    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false
      }
    ],

    // node:test
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        allowForKnownSafeCalls: [
          { from: 'package', name: ['describe', 'it', 'suite', 'test'], package: 'node:test' }
        ]
      }
    ],

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // Force separate exports of things that exist only in the type system (with 'export type { Foo }').
    // This allows using performance-optimized transpilers such as SWC, ESBuild, and similar.
    '@typescript-eslint/consistent-type-exports': 'error',

    // Force using 'import type' for imports that only exist in the type system.
    // If importing both types and values from the same module, the type imports should be separate from value imports.
    // This helps to fully eliminate type-only imports instead of leaving unnecessary side effect-only imports in the emitted JavaScript.
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports'
      }
    ],

    // Enforce methods to be declared via property syntax instead of method syntax.
    '@typescript-eslint/method-signature-style': 'error',

    // These would be a huge migration task at this time.
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

    /* ---- unicorn ---- */

    // Prefer 'node:' protocol imports for Node.js built-in modules.
    'unicorn/prefer-node-protocol': 'error',
    // Prevent usage of variables from outside the scope of isolated functions
    'unicorn/isolated-functions': 'error',
    // Disallow calling functions with an invalid number of arguments.
    'unicorn/no-invalid-argument-count': 'error',
    // Prefer block statements over IIFEs used only for scoping.
    'unicorn/prefer-block-statement-over-iife': 'error',
    // Enforce consistent labels on tuple type elements.
    'unicorn/consistent-tuple-labels': 'error',
    // Enforce correct Error subclassing.
    'unicorn/custom-error-definition': 'error',
    // Require new when throwing an error.
    'unicorn/throw-new-error': 'error',
    // Disallow calling Promise executor resolver functions more than once on the same execution path.
    'unicorn/no-multiple-promise-resolver-calls': 'error',
    // Disallow reading Promise.allSettled() values without checking their status.
    'unicorn/no-unsafe-promise-all-settled-values': 'error',
    // Prefer queueMicrotask() over process.nextTick(), setImmediate(), and setTimeout(..., 0).
    'unicorn/prefer-queue-microtask': 'error',
    // Enforce that terminating statements appear inside the block statement of a case clause, not after it.
    'unicorn/switch-case-break-position': 'error',
    // Disallow comparing undefined using typeof.
    'unicorn/no-typeof-undefined': 'error',
    // Require Array.isArray() instead of instanceof Array.
    'unicorn/no-instanceof-builtins': 'error',
    // Prefer Number static properties over global ones.
    'unicorn/prefer-number-properties': [
      'error',
      { checkInfinity: false }
    ],
    // Prefer Number.isSafeInteger() over integer checks.
    'unicorn/prefer-number-is-safe-integer': 'error',
    // Disallow unsafe values as property keys.
    'unicorn/no-unsafe-property-key': 'error',
    // Prefer flat Math.min() and Math.max() calls over nested calls.
    'unicorn/prefer-flat-math-min-max': 'error',
    // Prefer Date.now() to get the number of milliseconds since the Unix Epoch.
    'unicorn/prefer-date-now': 'error',
    // Disallow useless values or fallbacks in Set, Map, WeakSet, or WeakMap.
    'unicorn/no-useless-collection-argument': 'error',
    // Disallow checking a Map key before accessing a different key.
    'unicorn/no-mismatched-map-key': 'error',
    // Prefer Set methods for Set operations.
    'unicorn/prefer-set-methods': 'error',
    // Disallow unnecessary Set construction around Set methods.
    'unicorn/no-useless-set-construction': 'error',
    // Disallow ignoring the return value of selected built-in methods.
    'unicorn/no-unused-builtin-method-return': 'error',
    // Disallow useless fallback when spreading in object literals.
    'unicorn/no-useless-fallback-in-spread': 'error',
    // Disallow .fill() after Array.from({length: ...}).
    'unicorn/no-array-from-fill': 'error',
    // Prefer using the Array.from() mapping function argument.
    'unicorn/prefer-array-from-map': 'error',
    // Disallow array accumulation with Array#concat() in loops.
    'unicorn/no-array-concat-in-loop': 'error',
    // Disallow mutating a loop iterable during iteration.
    'unicorn/no-loop-iterable-mutation': 'error',
    // Prefer iterating an array directly or with Array#keys() over Array#entries() when the index or value is unused.
    'unicorn/prefer-array-iterable-methods': 'error',
    // Prefer direct iteration over default iterator method calls.
    'unicorn/prefer-direct-iteration': 'error',
    // Prefer iterator helpers over temporary arrays from iterators.
    'unicorn/prefer-iterator-helpers': 'error',
    // Disallow useless Iterator.prototype.toArray() calls.
    'unicorn/no-useless-iterator-to-array': 'error',
    // Enforce using the separator argument with Array#join().
    'unicorn/require-array-join-separator': 'error',
    // Prefer .at() method for index access and String#charAt().
    'unicorn/prefer-at': 'error',
    // Prefer String#split() with a limit.
    'unicorn/prefer-split-limit': 'error',
    // Prefer String#slice() over String#substr() and String#substring().
    'unicorn/prefer-string-slice': 'error',
    // Disallow String#trim() before String#startsWith() or String#endsWith().
    'unicorn/no-unnecessary-string-trim': 'error',
    // Disallow non-literal replacement values in String#replace() and String#replaceAll().
    'unicorn/no-unsafe-string-replacement': 'error',
    // Prevent unsafe use of ArrayBuffer view .buffer.
    'unicorn/no-unsafe-buffer-conversion': 'error'
  }
})
