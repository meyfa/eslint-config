import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('base', [
  {
    name: 'curly-fail',
    expectErrors: [
      'curly', // if
      'curly', // else
      'curly', // for
      'curly', // while
      'curly' // do-while
    ]
  },
  {
    name: 'curly-pass'
  },
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
