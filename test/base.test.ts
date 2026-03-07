import { dedent, runFixtureTests } from './fixtures/index.ts'

await runFixtureTests('base', [
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
        let keepGoing2 = foo
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
        let keepGoing2 = foo
        do {
          keepGoing2 = next()
        } while (keepGoing2)
      }
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
  }
])
