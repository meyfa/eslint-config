import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('import', [
  {
    name: 'first-fail',
    expectErrors: [
      'import/order',
      'import/first'
    ]
  },
  {
    name: 'newline-after-import-fail',
    expectErrors: [
      'import/newline-after-import'
    ]
  },
  {
    name: 'newline-after-import-pass'
  },
  {
    name: 'order-fail',
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-alphabetize-fail',
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-named-fail',
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-newlines-fail',
    expectErrors: [
      'import/order'
    ]
  }
])
