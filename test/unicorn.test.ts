import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "eslint-plugin-unicorn" rules

await runFixtureTests('unicorn', [
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
    name: 'no-invalid-argument-count-fail',
    code: dedent`
      function identity (value: number): number {
        return value
      }

      console.log(identity(1, 2))
    `,
    expectErrors: [
      'unicorn/no-invalid-argument-count'
    ]
  },
  {
    name: 'prefer-block-statement-over-iife-fail',
    code: dedent`
      (() => {
        const value = 1
        console.log(value)
      })()
    `,
    expectErrors: [
      'unicorn/prefer-block-statement-over-iife'
    ]
  },
  {
    name: 'consistent-tuple-labels-fail',
    code: dedent`
      export type Point = [x: number, number]
    `,
    expectErrors: [
      'unicorn/consistent-tuple-labels'
    ]
  },
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
    name: 'no-multiple-promise-resolver-calls-fail',
    code: dedent`
      void new Promise<void>((resolve, reject) => {
        if (Math.random() > 0.5) {
          resolve()
        }
        reject(new Error('failed'))
      })
    `,
    expectErrors: [
      'unicorn/no-multiple-promise-resolver-calls'
    ]
  },
  {
    name: 'no-unsafe-promise-all-settled-values-fail',
    code: dedent`
      export async function collectValues (): Promise<number[]> {
        return (await Promise.allSettled([Promise.resolve(1)])).map((result) => result.value)
      }
    `,
    expectErrors: [
      'unicorn/no-unsafe-promise-all-settled-values'
    ]
  },
  {
    name: 'prefer-queue-microtask-fail',
    code: dedent`
      process.nextTick(() => {})
    `,
    expectErrors: [
      'unicorn/prefer-queue-microtask'
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
  },
  {
    name: 'no-typeof-undefined-fail',
    code: dedent`
      export function checkUndefined (value: string | undefined): void {
        if (typeof value === 'undefined') {
          ;
        }
      }
    `,
    expectErrors: [
      'unicorn/no-typeof-undefined'
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
    name: 'prefer-number-properties-fail',
    code: dedent`
      void isNaN(123)
    `,
    expectErrors: [
      'unicorn/prefer-number-properties'
    ]
  },
  {
    name: 'prefer-number-is-safe-integer-fail',
    code: dedent`
      if (!Number.isInteger(9007199254740992)) {
        throw new Error('Expected an integer')
      }
    `,
    expectErrors: [
      'unicorn/prefer-number-is-safe-integer'
    ]
  },
  {
    name: 'no-unsafe-property-key-fail',
    code: dedent`
      const key = {}
      const value = { [key]: true }
      console.log(value)
    `,
    expectErrors: [
      'unicorn/no-unsafe-property-key'
    ]
  },
  {
    name: 'no-unsafe-property-key-pass',
    code: dedent`
      const keyA = Symbol('keyA')
      const keyB = 'keyB'
      const value = { [keyA]: 1, [keyB]: 2 }
      console.log(value)
    `
  },
  {
    name: 'prefer-flat-math-min-max-fail',
    code: dedent`
      const largest = Math.max(Math.max(1, 2), 3)
      console.log(largest)
    `,
    expectErrors: [
      'unicorn/prefer-flat-math-min-max'
    ]
  },
  {
    name: 'prefer-flat-math-min-max-pass',
    code: dedent`
      const largest = Math.max(1, 2, 3)
      const clamped = Math.max(0, Math.min(largest, 100))
      console.log(largest, clamped)
    `
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
    name: 'no-useless-collection-argument-fail',
    code: dedent`
      new Set([])
    `,
    expectErrors: [
      'unicorn/no-useless-collection-argument'
    ]
  },
  {
    name: 'no-mismatched-map-key-fail',
    code: dedent`
      const values = new Map<string, number>()
      if (values.has('expected')) {
        console.log(values.get('actual'))
      }
    `,
    expectErrors: [
      'unicorn/no-mismatched-map-key'
    ]
  },
  {
    name: 'prefer-set-methods-fail',
    code: dedent`
      const values = new Set([1, 2])
      const otherValues = new Set([2, 3])
      const intersection = [...values].filter((value) => otherValues.has(value))
      console.log(intersection)
    `,
    expectErrors: [
      'unicorn/prefer-set-methods'
    ]
  },
  {
    name: 'no-useless-set-construction-fail',
    code: dedent`
      const values = new Set([1, 2])
      const otherValues = new Set([2, 3])
      const intersection = new Set(values).union(otherValues)
      console.log(intersection)
    `,
    expectErrors: [
      'unicorn/no-useless-set-construction'
    ]
  },
  {
    name: 'no-unused-builtin-method-return-fail',
    code: dedent`
      const values = [1, 2, 3]
      values.map((value) => value * 2)
    `,
    expectErrors: [
      'unicorn/no-unused-builtin-method-return'
    ]
  },
  {
    name: 'no-useless-fallback-in-spread-fail',
    code: dedent`
      const maybeObject: Record<string, number> | undefined
      console.log({ ...(maybeObject ?? {}) })
    `,
    expectErrors: [
      'unicorn/no-useless-fallback-in-spread'
    ]
  },
  {
    name: 'no-array-from-fill-fail',
    code: dedent`
      const values = Array.from({ length: 3 }).fill(1)
      console.log(values)
    `,
    expectErrors: [
      'unicorn/no-array-from-fill'
    ]
  },
  {
    name: 'prefer-array-from-map-fail',
    code: dedent`
      const values = Array.from([1, 2, 3]).map((value) => value * 2)
      console.log(values)
    `,
    expectErrors: [
      'unicorn/prefer-array-from-map'
    ]
  },
  {
    name: 'no-array-concat-in-loop-fail',
    code: dedent`
      let values: number[] = []
      for (const value of [1, 2, 3]) {
        values = values.concat(value)
      }
      console.log(values)
    `,
    expectErrors: [
      'unicorn/no-array-concat-in-loop'
    ]
  },
  {
    name: 'no-loop-iterable-mutation-fail',
    code: dedent`
      const values = [1]
      for (const value of values) {
        values.push(value)
      }
    `,
    expectErrors: [
      'unicorn/no-loop-iterable-mutation'
    ]
  },
  {
    name: 'prefer-array-iterable-methods-fail',
    code: dedent`
      const values = [1, 2, 3]
      for (const [, value] of values.entries()) {
        console.log(value)
      }
    `,
    expectErrors: [
      'unicorn/prefer-array-iterable-methods'
    ]
  },
  {
    name: 'prefer-direct-iteration-fail',
    code: dedent`
      const values = [...[1, 2, 3].values()]
      console.log(values)
    `,
    expectErrors: [
      'unicorn/prefer-direct-iteration'
    ]
  },
  {
    name: 'prefer-iterator-helpers-fail',
    code: dedent`
      const values = new Map([[1, 1]])
      const match = [...values.values()].find((value) => value === 1)
      console.log(match)
    `,
    expectErrors: [
      'unicorn/prefer-iterator-helpers'
    ]
  },
  {
    name: 'no-useless-iterator-to-array-fail',
    code: dedent`
      const iterator = [1, 2, 3][Symbol.iterator]()
      console.log(new Set(iterator.toArray()))
    `,
    expectErrors: [
      'unicorn/no-useless-iterator-to-array'
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
    name: 'prefer-at-fail',
    code: dedent`
      const values = [1, 2, 3]
      console.log(values[values.length - 1])
    `,
    expectErrors: [
      'unicorn/prefer-at'
    ]
  },
  {
    name: 'prefer-split-limit-fail',
    code: dedent`
      const protocol = 'https://example.com'.split(':')[0]
      console.log(protocol)
    `,
    expectErrors: [
      'unicorn/prefer-split-limit'
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
    name: 'no-unnecessary-string-trim-fail',
    code: dedent`
      const startsWithDash = ' -value '.trim().startsWith('-')
      console.log(startsWithDash)
    `,
    expectErrors: [
      'unicorn/no-unnecessary-string-trim'
    ]
  },
  {
    name: 'no-unsafe-string-replacement-fail',
    code: dedent`
      const replacement = '$&'
      const result = 'value'.replace('value', replacement)
      console.log(result)
    `,
    expectErrors: [
      'unicorn/no-unsafe-string-replacement'
    ]
  },
  {
    name: 'no-unsafe-buffer-conversion-fail',
    code: dedent`
      const bytes = new Uint8Array([1, 2, 3])
      const copy = Buffer.from(bytes.buffer)
      console.log(copy)
    `,
    expectErrors: [
      'unicorn/no-unsafe-buffer-conversion'
    ]
  }
])
