import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "@typescript-eslint" rules

await runFixtureTests('typescript', [
  {
    name: 'no-explicit-any__pass',
    code: dedent`
      const value: any = 123
      console.log(value)
    `
  },
  {
    name: 'consistent-type-imports__fail',
    code: dedent`
      import { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(t)
      }
    `,
    expectErrors: [
      '@typescript-eslint/consistent-type-imports'
    ]
  },
  {
    name: 'consistent-type-imports__pass',
    code: dedent`
      import type { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(t)
      }
    `
  },
  {
    name: 'consistent-type-imports__split__pass',
    code: dedent`
      import type { TestContext } from 'node:test'
      import { test } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(test, t)
      }
    `
  },
  {
    name: 'consistent-generic-constructors__fail',
    code: dedent`
      const map: Map<string, number> = new Map()
      console.log(map)
    `,
    expectErrors: [
      '@typescript-eslint/consistent-generic-constructors'
    ]
  },
  {
    name: 'consistent-generic-constructors__pass',
    code: dedent`
      const map = new Map<string, number>()
      console.log(map)
    `
  },
  {
    name: 'floating-promises__node-test__pass',
    code: dedent`
      import { test } from 'node:test'

      test('node:test call is safe', async () => {
        await Promise.resolve()
      })
    `
  },
  {
    name: 'floating-promises__fail',
    code: dedent`
      Promise.resolve()
    `,
    expectErrors: [
      '@typescript-eslint/no-floating-promises'
    ]
  },
  {
    name: 'method-signature-style__fail',
    code: dedent`
      export interface Foo {
        bar(): void
      }
    `,
    expectErrors: [
      '@typescript-eslint/method-signature-style'
    ]
  },
  {
    name: 'method-signature-style__pass',
    code: dedent`
      export interface Foo {
        bar: () => void
      }
    `
  },
  {
    name: 'no-meaningless-void-operator__fail',
    code: dedent`
      const value = 123
      void value
    `,
    expectErrors: [
      '@typescript-eslint/no-meaningless-void-operator'
    ]
  },
  {
    name: 'no-meaningless-void-operator__call__pass',
    code: dedent`
      const promise = Promise.resolve(123)
      void promise
    `
  }
])
