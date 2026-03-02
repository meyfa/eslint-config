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
