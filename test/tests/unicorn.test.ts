import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('unicorn', [
  {
    name: 'prefer-node-protocol-fail',
    expectErrors: [
      'unicorn/prefer-node-protocol'
    ]
  },
  {
    name: 'prefer-node-protocol-pass'
  }
])
