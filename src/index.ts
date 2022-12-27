// ESLint patching to support proper plugin resolution
require('@rushstack/eslint-patch/modern-module-resolution.js')

export = {
  extends: 'standard-with-typescript',
  rules: {
    // ES modules require a file extension on every import.
    // NPM packages should be exempted. For example, we want to allow extensionless imports from 'preact/hooks'.
    'import/extensions': ['error', 'always', { ignorePackages: true }]
  },
  overrides: [
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
