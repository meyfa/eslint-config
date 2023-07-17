// ESLint patching to support proper plugin resolution
require('@rushstack/eslint-patch/modern-module-resolution.js')

export = {
  extends: 'standard',
  rules: {
    // ES modules require a file extension on every import.
    // NPM packages should be exempted. For example, we want to allow extensionless imports from 'preact/hooks'.
    'import/extensions': ['error', 'always', { ignorePackages: true }]
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
