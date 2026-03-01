import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('unicorn', [
  {
    name: 'prefer-node-protocol-fail',
    mustHave: ['unicorn/prefer-node-protocol'],
    errorCount: 1
  },
  {
    name: 'prefer-node-protocol-pass',
    errorCount: 0
  }
])
