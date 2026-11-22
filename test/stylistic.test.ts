import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "@stylistic/eslint-plugin" rules

await runFixtureTests('stylistic', [
  {
    name: 'arrow-parens__fail',
    code: dedent`
      const helper = (fn: (arg: string) => void) => fn('test')
      helper(arg => {}) // arg should be parenthesized
    `,
    expectErrors: [
      '@stylistic/arrow-parens'
    ]
  },
  {
    name: 'arrow-parens__pass',
    code: dedent`
      const helper = (fn: (arg: string) => void) => fn('test')
      helper((arg) => {})
    `
  },
  {
    name: 'brace-style__fail',
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
    name: 'brace-style__pass',
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
    name: 'comma-dangle__fail',
    code: dedent`
      console.log([
        1,
        2,
      ])

      console.log({
        a: 1,
        b: 2,
      })
    `,
    expectErrors: [
      '@stylistic/comma-dangle', // array
      '@stylistic/comma-dangle' // object
    ]
  },
  {
    name: 'comma-dangle__pass',
    code: dedent`
      console.log([
        1,
        2
      ])

      console.log({
        a: 1,
        b: 2
      })
    `
  },
  {
    name: 'indent__fail',
    code: dedent`
      export function foo (): void {
          return 0
      }
      foo()
    `,
    expectErrors: [
      '@stylistic/indent'
    ]
  },
  {
    name: 'indent__pass',
    code: dedent`
      export function foo (): void {
        return 0
      }
    `
  },
  {
    name: 'jsx-closing-bracket-location__fail',
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
    name: 'jsx-closing-tag-location__fail',
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
    name: 'jsx-curly-brace-presence__fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component foo={'bar'} />
    `,
    expectErrors: [
      '@stylistic/jsx-curly-brace-presence'
    ]
  },
  {
    name: 'jsx-curly-spacing__fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo={ 1} />
    `,
    expectErrors: [
      '@stylistic/jsx-curly-spacing'
    ]
  },
  {
    name: 'jsx-equals-spacing__fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo ='bar' />
    `,
    expectErrors: [
      '@stylistic/jsx-equals-spacing'
    ]
  },
  {
    name: 'jsx-first-prop-new-line__fail',
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
    name: 'jsx-max-props-per-line__fail',
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
    name: 'jsx-quotes__fail',
    fileExtension: 'tsx',
    code: dedent`
      <div foo="bar" />
    `,
    expectErrors: [
      '@stylistic/jsx-quotes'
    ]
  },
  {
    name: 'jsx-self-closing-comp__fail',
    fileExtension: 'tsx',
    code: dedent`
      <Component></Component>
    `,
    expectErrors: [
      '@stylistic/jsx-self-closing-comp'
    ]
  },
  {
    name: 'jsx-tag-spacing__fail',
    fileExtension: 'tsx',
    code: dedent`
      <div/>
    `,
    expectErrors: [
      '@stylistic/jsx-tag-spacing'
    ]
  },
  {
    name: 'jsx-wrap-multilines__prop__fail',
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
    name: 'jsx-wrap-multilines__prop__pass',
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
    name: 'max-statements-per-line__fail',
    code: dedent`
      export function foo (): void {
        const first = 'foo'; const second = 'bar'
        console.log(first, second)
      }
    `,
    expectErrors: [
      '@stylistic/max-statements-per-line'
    ]
  },
  {
    name: 'no-multi-spaces__fail',
    code: dedent`
      void 0  // too many spaces before the comment
    `,
    expectErrors: [
      '@stylistic/no-multi-spaces'
    ]
  },
  {
    name: 'operator-linebreak__fail',
    code: dedent`
      const foo = 'hello'
        + 'world'
      console.log(foo)

      const bar = foo === 'helloworld' ?
        'yes' :
        'no'
      console.log(bar)
    `,
    expectErrors: [
      '@stylistic/operator-linebreak', // +
      '@stylistic/operator-linebreak', // ?
      '@stylistic/operator-linebreak' // :
    ]
  },
  {
    name: 'operator-linebreak__pass',
    code: dedent`
      const foo = 'hello' +
        'world'
      console.log(foo)

      const bar = foo === 'helloworld'
        ? 'yes'
        : 'no'
      console.log(bar)
    `
  },
  {
    name: 'quote-props__fail',
    code: dedent`
      console.log({ 'a': 1 })
    `,
    expectErrors: [
      '@stylistic/quote-props'
    ]
  },
  {
    name: 'quote-props__pass',
    code: dedent`
      console.log({ 'a-b': 1 })
    `
  },
  {
    name: 'space-in-parens__fail',
    code: dedent`
      console.log( 'test' )
    `,
    expectErrors: [
      '@stylistic/space-in-parens', // after (
      '@stylistic/space-in-parens' // before )
    ]
  },
  {
    name: 'space-in-parens__pass',
    code: dedent`
      console.log('test')
    `
  },
  {
    name: 'space-before-function-paren__fail',
    code: dedent`
      export function foo(arg: string): string {
        return arg
      }
    `,
    expectErrors: [
      '@stylistic/space-before-function-paren'
    ]
  },
  {
    name: 'pace-before-function-paren__pass',
    code: dedent`
      export function foo (arg: string): string {
        return arg
      }
    `
  },
  {
    name: 'curly-newline__try-catch__pass',
    code: dedent`
      try {
        void 0
      } catch {}
    `
  },
  {
    name: 'curly-newline__arrow__pass',
    code: dedent`
      const fn = () => {
        return Math.random()
      }
      console.log(fn)
    `
  },
  {
    name: 'curly-newline__arrow-empty__pass',
    code: dedent`
      const fn = () => {}
      console.log(fn)
    `
  },
  {
    name: 'curly-newline__block-comment__pass',
    code: dedent`
      if (Math.random() > 0.5) { /* skip */ }
    `
  },
  {
    name: 'curly-newline__block-statement__pass',
    code: dedent`
      if (Math.random() > 0.5) {
        void 0
      }
    `
  },
  {
    name: 'curly-newline__switch-start-before__fail',
    code: dedent`
      switch (Math.random()) {
        case 0:
        { void 0
          break
        }
      }
    `,
    expectErrors: [
      '@stylistic/curly-newline'
    ]
  },
  {
    name: 'curly-newline__switch-start-after__fail',
    code: dedent`
      switch (Math.random()) {
        case 0: { void 0
          break
        }
      }
    `,
    expectErrors: [
      '@stylistic/curly-newline'
    ]
  },
  {
    name: 'curly-newline__switch-end__fail',
    code: dedent`
      switch (Math.random()) {
        case 0: {
          void 0
          break }
      }
    `,
    expectErrors: [
      '@stylistic/curly-newline'
    ]
  },
  {
    name: 'curly-newline__switch__pass',
    code: dedent`
      switch (Math.random()) {
        case 0: {
          void 0
          break
        }
      }
    `
  },
  {
    name: 'object-curly-newline__pass',
    code: dedent`
      import { import1, import2 } from 'foo'

      const { a } = { a: import1 }
      const {
        b
      } = {
        b: import2
      }

      const export1 = { a }
      const export2 = {
        b
      }

      export { export1 }
      export {
        export2
      }
    `
  },
  {
    name: 'object-curly-newline__object__fail',
    code: dedent`
      const foo = { a: 1
      }
      console.log(foo)
    `,
    expectErrors: [
      '@stylistic/object-curly-newline'
    ]
  },
  {
    name: 'object-curly-newline__pattern__fail',
    code: dedent`
      const { a,
        b } = { a: 1, b: 2 }

      console.log(a, b)
    `,
    expectErrors: [
      '@stylistic/object-curly-newline',
      '@stylistic/object-curly-newline'
    ]
  },
  {
    name: 'object-curly-newline__import__fail',
    code: dedent`
      import { import1,
        import2 } from 'baz'

      console.log(import1, import2)
    `,
    expectErrors: [
      '@stylistic/object-curly-newline',
      '@stylistic/object-curly-newline'
    ]
  },
  {
    name: 'object-curly-newline__export__fail',
    code: dedent`
      const export1 = 1
      const export2 = 2

      export { export1,
        export2 }
    `,
    expectErrors: [
      '@stylistic/object-curly-newline',
      '@stylistic/object-curly-newline'
    ]
  }
])
