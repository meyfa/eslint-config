import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('typescript', [
  {
    name: 'explicit-any-pass',
    mustNotHave: ['@typescript-eslint/no-explicit-any'],
    errorCount: 0
  },
  {
    name: 'floating-promises-fail',
    mustHave: ['@typescript-eslint/no-floating-promises'],
    errorCount: 1
  }
])
