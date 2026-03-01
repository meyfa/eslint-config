import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('unicorn', [
  {
    name: 'custom-error-definition-fail',
    expectErrors: [
      'unicorn/custom-error-definition'
    ]
  },
  {
    name: 'isolated-functions-fail',
    expectErrors: [
      'unicorn/isolated-functions'
    ]
  },
  {
    name: 'no-instanceof-builtins-fail',
    expectErrors: [
      'unicorn/no-instanceof-builtins', // Array
      'unicorn/no-instanceof-builtins', // Function
      'unicorn/no-instanceof-builtins' // String
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
