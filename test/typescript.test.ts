import { dedent, runFixtureTests } from './fixtures/index.ts'

await runFixtureTests('typescript', [
  {
    name: 'explicit-any-pass',
    code: dedent`
      const value: any = 123
      void value
    `
  },
  {
    name: 'consistent-type-imports-fail',
    code: dedent`
      import { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        void t
      }
    `,
    expectErrors: [
      '@typescript-eslint/consistent-type-imports'
    ]
  },
  {
    name: 'consistent-type-imports-pass',
    code: dedent`
      import type { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        void t
      }
    `
  },
  {
    name: 'consistent-type-imports-split-pass',
    code: dedent`
      import type { TestContext } from 'node:test'
      import { test } from 'node:test'

      export function handle (t: TestContext): void {
        void test
        void t
      }
    `
  },
  {
    name: 'consistent-generic-constructors-fail',
    code: dedent`
      const map: Map<string, number> = new Map()
      void map
    `,
    expectErrors: [
      '@typescript-eslint/consistent-generic-constructors'
    ]
  },
  {
    name: 'consistent-generic-constructors-pass',
    code: dedent`
      const map = new Map<string, number>()
      void map
    `
  },
  {
    name: 'floating-promises-node-test-pass',
    code: dedent`
      import { test } from 'node:test'

      test('node:test call is safe', async () => {
        await Promise.resolve()
      })
    `
  },
  {
    name: 'floating-promises-fail',
    code: dedent`
      Promise.resolve()
    `,
    expectErrors: [
      '@typescript-eslint/no-floating-promises'
    ]
  },
  {
    name: 'method-signature-style-fail',
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
    name: 'method-signature-style-pass',
    code: dedent`
      export interface Foo {
        bar: () => void
      }
    `
  }
])
