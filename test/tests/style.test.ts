import { dedent, runFixtureTests } from '../fixtures.js'

await runFixtureTests('style', [
  {
    name: 'arrow-parens-fail',
    code: dedent`
      const helper = (fn: (arg: string) => void) => fn('test')
      helper(arg => {}) // arg should be parenthesized
    `,
    expectErrors: [
      '@stylistic/arrow-parens'
    ]
  },
  {
    name: 'arrow-parens-pass',
    code: dedent`
      const helper = (fn: (arg: string) => void) => fn('test')
      helper((arg) => {})
    `
  },
  {
    name: 'brace-style-fail',
    code: dedent`
      const value = Math.random()
      if (value > 0.5) {
        void 0
      }
      else {
        void 0
      }
    `,
    expectErrors: [
      '@stylistic/brace-style'
    ]
  },
  {
    name: 'brace-style-pass',
    code: dedent`
      const value = Math.random()
      if (value > 0.5) {
        void 0
      } else {
        void 0
      }
    `
  },
  {
    name: 'comma-dangle-fail',
    code: dedent`
      void [
        1,
        2,
      ]

      void {
        a: 1,
        b: 2,
      }
    `,
    expectErrors: [
      '@stylistic/comma-dangle', // array
      '@stylistic/comma-dangle' // object
    ]
  },
  {
    name: 'comma-dangle-pass',
    code: dedent`
      void [
        1,
        2
      ]

      void {
        a: 1,
        b: 2
      }
    `
  },
  {
    name: 'jsx-closing-bracket-location-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component
        a='1'
        b='2'>
        <span />
      </Component>
    `,
    expectErrors: [
      '@stylistic/jsx-closing-bracket-location'
    ]
  },
  {
    name: 'jsx-closing-tag-location-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component>
        <span /> </Component>
    `,
    expectErrors: [
      '@stylistic/jsx-one-expression-per-line',
      '@stylistic/jsx-closing-tag-location'
    ]
  },
  {
    name: 'jsx-curly-brace-presence-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component foo={'bar'} />
    `,
    expectErrors: [
      '@stylistic/jsx-curly-brace-presence'
    ]
  },
  {
    name: 'jsx-curly-spacing-fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo={ 1} />
    `,
    expectErrors: [
      '@stylistic/jsx-curly-spacing'
    ]
  },
  {
    name: 'jsx-equals-spacing-fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo ='bar' />
    `,
    expectErrors: [
      '@stylistic/jsx-equals-spacing'
    ]
  },
  {
    name: 'jsx-first-prop-new-line-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component a='1'
        b='2'
      />
    `,
    expectErrors: [
      '@stylistic/jsx-first-prop-new-line'
    ]
  },
  {
    name: 'jsx-max-props-per-line-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component
        a='1' b='2'
      />
    `,
    expectErrors: [
      '@stylistic/jsx-max-props-per-line'
    ]
  },
  {
    name: 'jsx-quotes-fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo="bar" />
    `,
    expectErrors: [
      '@stylistic/jsx-quotes'
    ]
  },
  {
    name: 'jsx-self-closing-comp-fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component></Component>
    `,
    expectErrors: [
      '@stylistic/jsx-self-closing-comp'
    ]
  },
  {
    name: 'jsx-tag-spacing-fail',
    fileExtension: 'tsx',
    code: dedent`
      <div/>
    `,
    expectErrors: [
      '@stylistic/jsx-tag-spacing'
    ]
  },
  {
    name: 'jsx-wrap-multilines-prop-fail',
    fileExtension: 'tsx',
    code: dedent`
      <MyComponent
        actions={(
          <>
          </>)}
      />
    `,
    expectErrors: [
      '@stylistic/jsx-wrap-multilines'
    ]
  },
  {
    name: 'jsx-wrap-multilines-prop-pass',
    fileExtension: 'tsx',
    code: dedent`
      <MyComponent
        actions={(
          <>
          </>
        )}
      />
    `
  },
  {
    name: 'max-statements-per-line-fail',
    code: dedent`
      export function foo (): void {
        if (Math.random() > 0.5) { return 'foo' }
      }
    `,
    expectErrors: [
      '@stylistic/max-statements-per-line'
    ]
  },
  {
    name: 'multi-spaces-fail',
    code: dedent`
      void 0  // too many spaces before the comment
    `,
    expectErrors: [
      '@stylistic/no-multi-spaces'
    ]
  },
  {
    name: 'operator-linebreak-fail',
    code: dedent`
      const foo = 'hello'
        + 'world'
      void foo

      const bar = foo === 'helloworld' ?
        'yes' :
        'no'
      void bar
    `,
    expectErrors: [
      '@stylistic/operator-linebreak', // +
      '@stylistic/operator-linebreak', // ?
      '@stylistic/operator-linebreak' // :
    ]
  },
  {
    name: 'operator-linebreak-pass',
    code: dedent`
      const foo = 'hello' +
        'world'
      void foo

      const bar = foo === 'helloworld'
        ? 'yes'
        : 'no'
      void bar
    `
  },
  {
    name: 'quote-props-fail',
    code: dedent`
      void { 'a': 1 }
    `,
    expectErrors: [
      '@stylistic/quote-props'
    ]
  },
  {
    name: 'quote-props-pass',
    code: dedent`
      void { 'a-b': 1 }
    `
  },
  {
    name: 'prefix-increment-for-fail',
    code: dedent`
      for (let i = 0; i < 3; i++) { ; }
      for (let j = 3; j > 0; j--) { ; }
      for (let a = 0, b = 0; a < 3; a++, ++b) { ; }
      for (let c = 3, d = 3; c > 0; c--, --d) { ; }
      for (let e = 0, f = 0; e < 3; ++e, f++) { ; }
      for (let g = 3, h = 3; g > 0; --g, h--) { ; }
    `,
    expectErrors: [
      'no-restricted-syntax', // i++
      'no-restricted-syntax', // j--
      'no-restricted-syntax', // a++
      'no-restricted-syntax', // c--
      'no-restricted-syntax', // f++
      'no-restricted-syntax' // h--
    ]
  },
  {
    name: 'prefix-increment-for-pass',
    code: dedent`
      for (let i = 0; i < 3; ++i) { ; }
      for (let j = 3; j > 0; --j) { ; }
      for (let a = 0, b = 0; a < 3; ++a, ++b) { ; }
      for (let c = 3, d = 3; c > 0; --c, --d) { ; }

      export function suffixOutsideForLoopIsOk (): number {
        let k = 0
        const j = k++
        return j
      }

      export function suffixInsideForBodyIsOk (): number {
        let m = 0
        for (let i = 0; i < 3; ++i) {
          const n = m++
          m = n
        }
        return m
      }

      export function suffixInsideForConditionIsOk (): number {
        let p = 0
        for (let i = 0; p++ < 3; ++i) { ; }
        return p
      }
    `
  },
  {
    name: 'prefix-increment-standalone-fail',
    code: dedent`
      let foo = 0
      let bar = 0

      foo++
      bar--

      export { foo, bar }
    `,
    expectErrors: [
      'no-restricted-syntax', // foo++
      'no-restricted-syntax' // bar--
    ]
  },
  {
    name: 'prefix-increment-standalone-pass',
    code: dedent`
      let foo = 0
      let bar = 0

      ++foo
      --bar

      export { foo, bar }
    `
  },
  {
    name: 'space-fail',
    code: dedent`
      foo( 'test' )
      function foo(arg: string): string {
          return arg
      }
    `,
    expectErrors: [
      '@stylistic/space-in-parens', // after (
      '@stylistic/space-in-parens', // before )
      '@stylistic/space-before-function-paren',
      '@stylistic/indent'
    ]
  },
  {
    name: 'space-pass',
    code: dedent`
      foo('test')
      function foo (arg: string): string {
        return arg
      }
    `
  }
])
