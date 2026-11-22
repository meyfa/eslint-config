import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "@typescript-eslint" rules

await runFixtureTests('typescript', [
  {
    name: 'no-confusing-void-expression__fail',
    code: dedent`
      export function log (value: string): void {
        return value.length > 0
          ? console.log(value)
          : undefined
      }
    `,
    expectErrors: [
      '@typescript-eslint/no-confusing-void-expression'
    ]
  },
  {
    name: 'no-confusing-void-expression__arrow-shorthand__pass',
    code: dedent`
      const log = (value: string): void => console.log(value)
      log('test')
    `
  },
  {
    name: 'no-floating-promises__node-test__pass',
    code: dedent`
      import { test } from 'node:test'

      test('node:test call is safe', async () => {
        await Promise.resolve()
      })
    `
  },
  {
    name: 'no-floating-promises__fail',
    code: dedent`
      Promise.resolve()
    `,
    expectErrors: [
      '@typescript-eslint/no-floating-promises'
    ]
  },
  {
    name: 'array-type__fail',
    code: dedent`
      const values: Array<string> = []
      console.log(values)
    `,
    expectErrors: [
      '@typescript-eslint/array-type'
    ]
  },
  {
    name: 'array-type__pass',
    code: dedent`
      const values: string[] = []
      console.log(values)
    `
  },
  {
    name: 'consistent-type-exports__fail',
    code: dedent`
      import type { TestContext } from 'node:test'

      export { TestContext }
    `,
    expectErrors: [
      '@typescript-eslint/consistent-type-exports'
    ]
  },
  {
    name: 'consistent-type-exports__pass',
    code: dedent`
      export type { TestContext } from 'node:test'
    `
  },
  {
    name: 'consistent-type-imports__fail',
    code: dedent`
      import { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(t)
      }
    `,
    expectErrors: [
      '@typescript-eslint/consistent-type-imports'
    ]
  },
  {
    name: 'consistent-type-imports__pass',
    code: dedent`
      import type { TestContext } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(t)
      }
    `
  },
  {
    name: 'consistent-type-imports__split__pass',
    code: dedent`
      import type { TestContext } from 'node:test'
      import { test } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(test, t)
      }
    `
  },
  {
    name: 'method-signature-style__fail',
    code: dedent`
      export interface Foo {
        bar(): void
      }
    `,
    expectErrors: [
      '@typescript-eslint/method-signature-style'
    ]
  },
  {
    name: 'method-signature-style__pass',
    code: dedent`
      export interface Foo {
        bar: () => void
      }
    `
  },
  {
    name: 'no-unsafe-assignment__pass',
    code: dedent`
      function accept (value: unknown): void {
        const unsafe: any = value
        console.log(unsafe)
      }
      accept(1)
    `
  },
  {
    name: 'no-unsafe-argument__pass',
    code: dedent`
      function accept (value: unknown): void {
        console.log(value)
      }
      const unsafe: any = 1
      accept(unsafe)
    `
  },
  {
    name: 'no-unsafe-call__pass',
    code: dedent`
      const unsafe: any = (value: number): number => value
      console.log(unsafe(1))
    `
  },
  {
    name: 'no-unsafe-member-access__pass',
    code: dedent`
      const unsafe: any = { value: 1 }
      console.log(unsafe.value)
    `
  },
  {
    name: 'no-unsafe-return__pass',
    code: dedent`
      function getUnsafe (): unknown {
        const unsafe: any = 1
        return unsafe
      }
      console.log(getUnsafe())
    `
  },
  {
    name: 'require-await__pass',
    code: dedent`
      async function getValue (): Promise<number> {
        return 1
      }
      void getValue()
    `
  },
  {
    name: 'no-empty-object-type__pass',
    code: dedent`
      export const foo = (arg: {}): void => {
        console.log(arg)
      }
    `
  },
  {
    name: 'no-empty-function__pass',
    code: dedent`
      export function empty (): void {}
    `
  },
  {
    name: 'no-explicit-any__pass',
    code: dedent`
      const value: any = 123
      console.log(value)
    `
  },
  {
    name: 'no-unused-vars__unused__fail',
    code: dedent`
      const unused = 1
      console.log('test')
    `,
    expectErrors: [
      '@typescript-eslint/no-unused-vars'
    ]
  },
  {
    name: 'no-unused-vars__rest-sibling__pass',
    code: dedent`
      const value = { used: 1, unused: 2 }
      const { unused, ...rest } = value
      console.log(rest)
    `
  },
  {
    name: 'restrict-plus-operands__fail',
    code: dedent`
      export function add (): bigint {
        return 1n + 1
      }
    `,
    expectErrors: [
      '@typescript-eslint/restrict-plus-operands'
    ]
  },
  {
    name: 'restrict-plus-operands__pass',
    code: dedent`
      console.log(1 + 2)
    `
  },
  {
    name: 'restrict-template-expressions__fail',
    code: dedent`
      export function format (value: string[]): string {
        return \`value: ${'${value}'}\`
      }
    `,
    expectErrors: [
      '@typescript-eslint/restrict-template-expressions'
    ]
  },
  {
    name: 'restrict-template-expressions__number__pass',
    code: dedent`
      console.log(String.raw\`\${1}\`)
    `
  },
  {
    name: 'consistent-generic-constructors__fail',
    code: dedent`
      const map: Map<string, number> = new Map()
      console.log(map)
    `,
    expectErrors: [
      '@typescript-eslint/consistent-generic-constructors'
    ]
  },
  {
    name: 'consistent-generic-constructors__pass',
    code: dedent`
      const map = new Map<string, number>()
      console.log(map)
    `
  },
  {
    name: 'no-meaningless-void-operator__fail',
    code: dedent`
      const value = 123
      void value
    `,
    expectErrors: [
      '@typescript-eslint/no-meaningless-void-operator'
    ]
  },
  {
    name: 'no-meaningless-void-operator__call__pass',
    code: dedent`
      const promise = Promise.resolve(123)
      void promise
    `
  }
])
