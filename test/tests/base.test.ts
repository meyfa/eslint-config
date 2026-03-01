import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('base', [
  {
    name: 'radix-fail',
    mustHave: ['radix'],
    errorCount: 1
  },
  {
    name: 'radix-pass',
    errorCount: 0
  }
])
