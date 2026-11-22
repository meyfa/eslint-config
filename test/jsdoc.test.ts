import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for the JSDoc configuration

await runFixtureTests('jsdoc', [
  {
    name: 'require-jsdoc__class__fail',
    code: dedent`
      class Example {}
    `,
    expectErrors: [
      'jsdoc/require-jsdoc'
    ]
  },
  {
    name: 'require-jsdoc__class__pass',
    code: dedent`
      /**
       * Example class.
       */
      class Example {}
    `
  },
  {
    name: 'require-jsdoc__function__fail',
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
    name: 'require-jsdoc__function__pass',
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
    name: 'no-types__property-signature__fail',
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
    name: 'no-types__property-signature__pass',
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
    name: 'require-param-description__fail',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param value
         * @returns The mapped number.
         */
        map: (value: number) => number
      }
    `,
    expectErrors: [
      'jsdoc/require-param-description'
    ]
  },
  {
    name: 'require-returns-description__fail',
    code: dedent`
      /**
       * Example interface.
       */
      export interface Example {
        /**
         * @param value The input value.
         * @returns
         */
        map: (value: number) => number
      }
    `,
    expectErrors: [
      'jsdoc/require-returns-description'
    ]
  },
  {
    name: 'tag-lines__warn',
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
