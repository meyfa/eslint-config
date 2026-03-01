import { runFixtureTests } from '../fixtures.js'

await runFixtureTests('style', [
  {
    name: 'arrow-parens-fail',
    expectErrors: [
      '@stylistic/arrow-parens'
    ]
  },
  {
    name: 'arrow-parens-pass'
  },
  {
    name: 'brace-style-fail',
    expectErrors: [
      '@stylistic/brace-style'
    ]
  },
  {
    name: 'brace-style-pass'
  },
  {
    name: 'comma-dangle-fail',
    expectErrors: [
      '@stylistic/comma-dangle', // array
      '@stylistic/comma-dangle' // object
    ]
  },
  {
    name: 'comma-dangle-pass'
  },
  {
    name: 'multi-spaces-fail',
    expectErrors: [
      '@stylistic/no-multi-spaces'
    ]
  },
  {
    name: 'operator-linebreak-fail',
    expectErrors: [
      '@stylistic/operator-linebreak', // +
      '@stylistic/operator-linebreak', // ?
      '@stylistic/operator-linebreak' // :
    ]
  },
  {
    name: 'operator-linebreak-pass'
  },
  {
    name: 'quote-props-fail',
    expectErrors: [
      '@stylistic/quote-props'
    ]
  },
  {
    name: 'quote-props-pass'
  },
  {
    name: 'space-fail',
    expectErrors: [
      '@stylistic/space-before-function-paren',
      '@stylistic/indent',
      '@stylistic/space-in-parens', // after (
      '@stylistic/space-in-parens' // before )
    ]
  },
  {
    name: 'space-pass'
  }
])
