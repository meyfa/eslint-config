import { dedent, runFixtureTests } from './fixtures/index.ts'

await runFixtureTests('unicorn', [
  {
    name: 'custom-error-definition-fail',
    code: dedent`
      export class MyError extends Error {}
    `,
    expectErrors: [
      'unicorn/custom-error-definition'
    ]
  },
  {
    name: 'isolated-functions-fail',
    code: dedent`
      const outerValue = 123

      // @isolated
      export function readOuterValue (): number {
        return outerValue
      }
    `,
    expectErrors: [
      'unicorn/isolated-functions'
    ]
  },
  {
    name: 'no-instanceof-builtins-fail',
    code: dedent`
      const value: any = [1, 2, 3]
      if (value instanceof Array) {
        ;
      }
      if (value instanceof Function) {
        ;
      }
      if (value instanceof String) {
        ;
      }
    `,
    expectErrors: [
      'unicorn/no-instanceof-builtins', // Array
      'unicorn/no-instanceof-builtins', // Function
      'unicorn/no-instanceof-builtins' // String
    ]
  },
  {
    name: 'no-typeof-undefined-fail',
    code: dedent`
      let value: string | undefined
      if (typeof value === 'undefined') {
        ;
      }
    `,
    expectErrors: [
      'unicorn/no-typeof-undefined'
    ]
  },
  {
    name: 'no-useless-collection-argument-fail',
    code: dedent`
      new Set([])
    `,
    expectErrors: [
      'unicorn/no-useless-collection-argument'
    ]
  },
  {
    name: 'no-useless-fallback-in-spread-fail',
    code: dedent`
      const maybeObject: Record<string, number> | undefined
      void { ...(maybeObject ?? {}) }
    `,
    expectErrors: [
      'unicorn/no-useless-fallback-in-spread'
    ]
  },
  {
    name: 'no-useless-iterator-to-array-fail',
    code: dedent`
      const iterator = [1, 2, 3][Symbol.iterator]()
      void new Set(iterator.toArray())
    `,
    expectErrors: [
      'unicorn/no-useless-iterator-to-array'
    ]
  },
  {
    name: 'prefer-node-protocol-fail',
    code: dedent`
      import 'fs'
    `,
    expectErrors: [
      'unicorn/prefer-node-protocol'
    ]
  },
  {
    name: 'prefer-node-protocol-pass',
    code: dedent`
      import 'node:fs'
    `
  },
  {
    name: 'prefer-at-fail',
    code: dedent`
      const values = [1, 2, 3]
      void values[values.length - 1]
    `,
    expectErrors: [
      'unicorn/prefer-at'
    ]
  },
  {
    name: 'prefer-date-now-fail',
    code: dedent`
      void new Date().getTime()
    `,
    expectErrors: [
      'unicorn/prefer-date-now'
    ]
  },
  {
    name: 'prefer-number-properties-fail',
    code: dedent`
      void isNaN(123)
    `,
    expectErrors: [
      'unicorn/prefer-number-properties'
    ]
  },
  {
    name: 'prefer-string-slice-fail',
    code: dedent`
      void 'hello'.substring(1)
    `,
    expectErrors: [
      'unicorn/prefer-string-slice'
    ]
  },
  {
    name: 'require-array-join-separator-fail',
    code: dedent`
      void ['a', 'b'].join()
    `,
    expectErrors: [
      'unicorn/require-array-join-separator'
    ]
  },
  {
    name: 'throw-new-error-fail',
    code: dedent`
      fail()
      function fail (): never {
        throw Error('boom')
      }
    `,
    expectErrors: [
      'unicorn/throw-new-error'
    ]
  },
  {
    name: 'switch-case-break-position-fail',
    code: dedent`
      switch (Math.random()) {
        case 0: {
          void 0
        }
          break
      }
    `,
    expectErrors: [
      'unicorn/switch-case-break-position'
    ]
  }
])
