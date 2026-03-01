import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('style', [
  {
    name: 'arrow-parens-fail',
    mustHave: ['@stylistic/arrow-parens'],
    errorCount: 1
  },
  {
    name: 'arrow-parens-pass',
    errorCount: 0
  },
  {
    name: 'comma-dangle-fail',
    mustHave: ['@stylistic/comma-dangle'],
    errorCount: 2 // array, object
  },
  {
    name: 'comma-dangle-pass',
    errorCount: 0
  },
  {
    name: 'brace-style-fail',
    mustHave: ['@stylistic/brace-style'],
    errorCount: 1
  },
  {
    name: 'brace-style-pass',
    errorCount: 0
  },
  {
    name: 'quote-props-fail',
    mustHave: ['@stylistic/quote-props'],
    errorCount: 1
  },
  {
    name: 'quote-props-pass',
    errorCount: 0
  },
  {
    name: 'operator-linebreak-fail',
    mustHave: ['@stylistic/operator-linebreak'],
    errorCount: 3 // '+', '?', ':'
  },
  {
    name: 'operator-linebreak-pass',
    errorCount: 0
  },
  {
    name: 'space-fail',
    mustHave: [
      '@stylistic/space-before-function-paren',
      '@stylistic/indent',
      '@stylistic/space-in-parens'
    ],
    errorCount: 4
  },
  {
    name: 'space-pass',
    errorCount: 0
  }
])
