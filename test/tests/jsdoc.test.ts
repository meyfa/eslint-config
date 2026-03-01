import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('jsdoc', [
  {
    name: 'require-jsdoc-class-fail',
    expectErrors: [
      'jsdoc/require-jsdoc'
    ]
  },
  {
    name: 'require-jsdoc-class-pass'
  },
  {
    name: 'require-jsdoc-function-fail',
    expectErrors: [
      'jsdoc/require-jsdoc'
    ]
  },
  {
    name: 'require-jsdoc-function-pass'
  },
  {
    name: 'no-types-property-signature-fail',
    expectErrors: [
      'jsdoc/no-types',
      'jsdoc/no-types'
    ]
  },
  {
    name: 'no-types-property-signature-pass'
  },
  {
    name: 'require-param-returns-description-fail',
    expectErrors: [
      'jsdoc/require-param-description',
      'jsdoc/require-returns-description'
    ]
  },
  {
    name: 'tag-lines-warn',
    expectWarnings: [
      'jsdoc/tag-lines'
    ]
  }
], {
  overrideConfigFile: 'test/eslint-test-config-jsdoc.js'
})
