import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('base', [
  {
    name: 'radix-fail',
    expectErrors: [
      'radix'
    ]
  },
  {
    name: 'radix-pass'
  }
])
