// ESLint patching to support proper plugin resolution
require('@rushstack/eslint-patch/modern-module-resolution.js')

export = {
  extends: 'standard',
  plugins: ['unicorn'],
  rules: {
    // ES modules require a file extension on every import.
    // NPM packages should be exempted. For example, we want to allow extensionless imports from 'preact/hooks'.
    'import/extensions': ['error', 'always', { ignorePackages: true }],
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
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      rules: {
        // This is active in standard-with-typescript, but would be a huge migration task at this time.
        '@typescript-eslint/consistent-type-imports': 'off',
        // standard-with-typescript enforces no-confusing-void-expression even for the arrow shorthand.
        // This makes writing React components basically impossible, so we need to override it here.
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: false
          }
        ],
        // Un-ban the {} type, which is the only concise way to express "any non-nullish value"
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false
            }
          }
        ]
      }
    },
    {
      files: 'test/**/*',
      rules: {
        // chai and chai-as-promised use expression statements for some assertions
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ]
}
