import { dedent, runFixtureTests } from '../fixtures.js'

await runFixtureTests('jsdoc', [
  {
    name: 'require-jsdoc-class-fail',
    code: dedent`
      class Example {}
    `,
    expectErrors: [
      'jsdoc/require-jsdoc'
    ]
  },
  {
    name: 'require-jsdoc-class-pass',
    code: dedent`
      /**
       * Example class.
       */
      class Example {}
    `
  },
  {
    name: 'require-jsdoc-function-fail',
    code: dedent`
      function add (a: number, b: number): number {
        return a + b
      }
    `,
    expectErrors: [
      'jsdoc/require-jsdoc'
    ]
  },
  {
    name: 'require-jsdoc-function-pass',
    code: dedent`
      /**
       * Adds two numbers together.
       *
       * @param a The first number.
       * @param b The second number.
       * @returns The sum of the two numbers.
       */
      function add (a: number, b: number): number {
        return a + b
      }
    `
  },
  {
    name: 'no-types-property-signature-fail',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param {number} value The input value.
         * @returns {number} The mapped value.
         */
        map: (value: number) => number
      }
    `,
    expectErrors: [
      'jsdoc/no-types',
      'jsdoc/no-types'
    ]
  },
  {
    name: 'no-types-property-signature-pass',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param value The input value.
         * @returns The mapped value.
         */
        map: (value: number) => number
      }
    `
  },
  {
    name: 'require-param-returns-description-fail',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param value
         * @returns
         */
        map: (value: number) => number
      }
    `,
    expectErrors: [
      'jsdoc/require-param-description',
      'jsdoc/require-returns-description'
    ]
  },
  {
    name: 'tag-lines-warn',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param value The input value.
         *
         * @returns The mapped value.
         */
        map: (value: number) => number
      }
    `,
    expectWarnings: [
      'jsdoc/tag-lines'
    ]
  }
], {
  overrideConfigFile: 'eslint-test-config-jsdoc.js'
})
