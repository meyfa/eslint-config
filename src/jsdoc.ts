// ESLint patching to support proper plugin resolution
require('@rushstack/eslint-patch/modern-module-resolution.js')

export = {
  extends: 'plugin:jsdoc/recommended',
  rules: {
    'jsdoc/require-jsdoc': [
      'error',
      {
        contexts: [
          'ClassDeclaration',
          'TSInterfaceDeclaration',
          'TSEnumDeclaration'
        ]
      }
    ],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/no-types': [
      'error',
      {
        contexts: [
          'TSPropertySignature'
        ]
      }
    ],
    'jsdoc/require-returns-description': [
      'error',
      {
        contexts: [
          'TSPropertySignature'
        ]
      }
    ],
    'jsdoc/require-param-description': [
      'error',
      {
        contexts: [
          'TSPropertySignature'
        ]
      }
    ],
    'jsdoc/tag-lines': [
      'warn',
      'never',
      {
        startLines: 1
      }
    ]
  }
}
