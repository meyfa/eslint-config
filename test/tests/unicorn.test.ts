import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('unicorn', [
  {
    name: 'custom-error-definition-fail',
    expectErrors: [
      'unicorn/custom-error-definition'
    ]
  },
  {
    name: 'no-typeof-undefined-fail',
    expectErrors: [
      'unicorn/no-typeof-undefined'
    ]
  },
  {
    name: 'no-useless-fallback-in-spread-fail',
    expectErrors: [
      'unicorn/no-useless-fallback-in-spread'
    ]
  },
  {
    name: 'prefer-node-protocol-fail',
    expectErrors: [
      'unicorn/prefer-node-protocol'
    ]
  },
  {
    name: 'prefer-at-fail',
    expectErrors: [
      'unicorn/prefer-at'
    ]
  },
  {
    name: 'prefer-date-now-fail',
    expectErrors: [
      'unicorn/prefer-date-now'
    ]
  },
  {
    name: 'prefer-number-properties-fail',
    expectErrors: [
      'unicorn/prefer-number-properties'
    ]
  },
  {
    name: 'prefer-string-slice-fail',
    expectErrors: [
      'unicorn/prefer-string-slice'
    ]
  },
  {
    name: 'prefer-node-protocol-pass'
  },
  {
    name: 'require-array-join-separator-fail',
    expectErrors: [
      'unicorn/require-array-join-separator'
    ]
  },
  {
    name: 'throw-new-error-fail',
    expectErrors: [
      'unicorn/throw-new-error'
    ]
  }
])
