import { dedent, runFixtureTests } from './fixtures/index.js'

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
  }
])
