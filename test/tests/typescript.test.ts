import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('typescript', [
  {
    name: 'explicit-any-pass'
  },
  {
    name: 'floating-promises-node-test-pass'
  },
  {
    name: 'floating-promises-fail',
    expectErrors: [
      '@typescript-eslint/no-floating-promises'
    ]
  }
])
