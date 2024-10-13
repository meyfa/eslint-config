import pluginJsdoc from 'eslint-plugin-jsdoc'

const base = pluginJsdoc.configs['flat/recommended-typescript-error']

export default {
  ...base,

  rules: {
    ...base.rules,

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
