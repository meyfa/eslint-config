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
    name: 'jsx-closing-bracket-location-fail',
    expectErrors: [
      '@stylistic/jsx-closing-bracket-location'
    ]
  },
  {
    name: 'jsx-closing-tag-location-fail',
    expectErrors: [
      '@stylistic/jsx-one-expression-per-line',
      '@stylistic/jsx-closing-tag-location'
    ]
  },
  {
    name: 'jsx-curly-brace-presence-fail',
    expectErrors: [
      '@stylistic/jsx-curly-brace-presence'
    ]
  },
  {
    name: 'jsx-curly-spacing-fail',
    expectErrors: [
      '@stylistic/jsx-curly-spacing'
    ]
  },
  {
    name: 'jsx-equals-spacing-fail',
    expectErrors: [
      '@stylistic/jsx-equals-spacing'
    ]
  },
  {
    name: 'jsx-first-prop-new-line-fail',
    expectErrors: [
      '@stylistic/jsx-first-prop-new-line'
    ]
  },
  {
    name: 'jsx-max-props-per-line-fail',
    expectErrors: [
      '@stylistic/jsx-max-props-per-line'
    ]
  },
  {
    name: 'jsx-quotes-fail',
    expectErrors: [
      '@stylistic/jsx-quotes'
    ]
  },
  {
    name: 'jsx-self-closing-comp-fail',
    expectErrors: [
      '@stylistic/jsx-self-closing-comp'
    ]
  },
  {
    name: 'jsx-tag-spacing-fail',
    expectErrors: [
      '@stylistic/jsx-tag-spacing'
    ]
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
