import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for ESLint core rules

await runFixtureTests('core', [
  {
    name: 'curly-fail',
    code: dedent`
      export function bracesFail (foo: boolean): number {
        if (foo) return 1
        else return 2
      }

      export function bracesFailControlStructures (foo: boolean): void {
        for (let i = 0; i < 1; ++i) console.log(i)

        let keepGoing = foo
        while (keepGoing) keepGoing = false

        const next = (): boolean => Math.random() > 0.5
        let keepGoing2: boolean
        do keepGoing2 = next(); while (keepGoing2)
      }
    `,
    expectErrors: [
      'curly', // if
      'curly', // else
      'curly', // for
      'curly', // while
      'curly' // do-while
    ]
  },
  {
    name: 'curly-pass',
    code: dedent`
      export function bracesPass (foo: boolean): number {
        if (foo) {
          return 1
        } else {
          return 2
        }
      }

      export function bracesPassControlStructures (foo: boolean): void {
        for (let i = 0; i < 1; ++i) {
          console.log(i)
        }

        let keepGoing = foo
        while (keepGoing) {
          keepGoing = false
        }

        const next = (): boolean => Math.random() > 0.5
        let keepGoing2: boolean
        do {
          keepGoing2 = next()
        } while (keepGoing2)
      }
    `
  },
  {
    name: 'no-useless-rename-fail',
    code: dedent`
      const obj = { foo: 1 }
      const { foo: foo } = obj
      console.log(foo)
    `,
    expectErrors: [
      'no-useless-rename'
    ]
  },
  {
    name: 'no-useless-rename-pass',
    code: dedent`
      const obj = { foo: 1 }
      const { foo } = obj
      console.log(foo)
    `
  },
  {
    name: 'no-useless-rename-pass-renamed',
    code: dedent`
      const obj = { foo: 1 }
      const { foo: bar } = obj
      console.log(bar)
    `
  },
  {
    name: 'object-shorthand-construction-fail',
    code: dedent`
      const foo = 1
      console.log({ foo: foo })
    `,
    expectErrors: [
      'object-shorthand'
    ]
  },
  {
    name: 'object-shorthand-construction-pass',
    code: dedent`
      const foo = 1
      console.log({ foo })
    `
  },
  {
    name: 'object-shorthand-construction-pass-renamed',
    code: dedent`
      const bar = 1
      console.log({ foo: bar })
    `
  },
  {
    name: 'object-shorthand-methods-fail',
    code: dedent`
      const obj = {
        foo: function (): void {}
      }
      console.log(obj)
    `,
    expectErrors: [
      'object-shorthand'
    ]
  },
  {
    name: 'object-shorthand-methods-pass',
    code: dedent`
      const obj = {
        foo (): void {}
      }
      console.log(obj)

      const arrowObj = {
        foo: (): void => {}
      }
      console.log(arrowObj)
    `
  },
  {
    name: 'radix-fail',
    code: dedent`
      Number.parseInt('10')
    `,
    expectErrors: [
      'radix'
    ]
  },
  {
    name: 'radix-pass',
    code: dedent`
      Number.parseInt('10', 10)
    `
  },
  {
    name: 'no-restricted-syntax-increment-for-fail',
    code: dedent`
      for (let i = 0; i < 3; i++) {
        ;
      }
      for (let j = 3; j > 0; j--) {
        ;
      }
      for (let a = 0, b = 0; a < 3; a++, ++b) {
        ;
      }
      for (let c = 3, d = 3; c > 0; c--, --d) {
        ;
      }
      for (let e = 0, f = 0; e < 3; ++e, f++) {
        ;
      }
      for (let g = 3, h = 3; g > 0; --g, h--) {
        ;
      }
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
    name: 'no-restricted-syntax-increment-for-pass',
    code: dedent`
      for (let i = 0; i < 3; ++i) {
        ;
      }
      for (let j = 3; j > 0; --j) {
        ;
      }
      for (let a = 0, b = 0; a < 3; ++a, ++b) {
        ;
      }
      for (let c = 3, d = 3; c > 0; --c, --d) {
        ;
      }

      export function suffixOutsideForLoopIsOk (): number {
        let k = 0
        const j = k++
        if (k !== j + 1) {
          throw new Error('Postfix increment should advance k after capturing its previous value')
        }
        return j
      }

      export function suffixInsideForBodyIsOk (): number {
        let m = 0
        let total = 0
        for (let i = 0; i < 3; ++i) {
          const n = m++
          total += n
        }
        return m - total
      }

      export function suffixInsideForConditionIsOk (): number {
        let p = 0
        for (let i = 0; p++ < 3; ++i) {
          ;
        }
        return p
      }
    `
  },
  {
    name: 'no-restricted-syntax-increment-standalone-fail',
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
    name: 'no-restricted-syntax-increment-standalone-pass',
    code: dedent`
      let foo = 0
      let bar = 0

      ++foo
      --bar

      export { foo, bar }
    `
  }
])
