import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "eslint-plugin-import-x" rules

await runFixtureTests('import', [
  {
    name: 'consistent-type-specifier-style__fail',
    code: dedent`
      import { type TestContext, test } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(test, t)
      }
    `,
    expectErrors: [
      'import-x/consistent-type-specifier-style'
    ]
  },
  {
    name: 'consistent-type-specifier-style__pass',
    code: dedent`
      import type { TestContext } from 'node:test'
      import { test } from 'node:test'

      export function handle (t: TestContext): void {
        console.log(test, t)
      }
     `
  },
  {
    name: 'first__fail',
    code: dedent`
      import path from 'node:path'

      console.log(path) // this should come after all the imports
      import { ESLint } from 'eslint'

      console.log(ESLint)
    `,
    expectErrors: [
      'import-x/order',
      'import-x/first'
    ]
  },
  {
    name: 'newline-after-import__fail',
    code: dedent`
      import path from 'node:path'
      console.log(path)
    `,
    expectErrors: [
      'import-x/newline-after-import'
    ]
  },
  {
    name: 'newline-after-import__pass',
    code: dedent`
      import path from 'node:path'

      console.log(path)
    `
  },
  {
    name: 'order__fail',
    code: dedent`
      import { ESLint } from 'eslint'
      import path from 'node:path'

      console.log(ESLint, path)
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__alphabetize__fail',
    code: dedent`
      import tseslint from 'typescript-eslint'
      import eslint from '@eslint/js'

      console.log(tseslint, eslint)
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__named__fail',
    code: dedent`
      import { Linter, ESLint } from 'eslint'

      console.log(ESLint, Linter)
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__newlines__fail',
    code: dedent`
      import eslint from '@eslint/js'

      import tseslint from 'typescript-eslint'

      console.log(eslint, tseslint)
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__side-effects__pass',
    code: dedent`
      import 'foo'
      import eslint from '@eslint/js'
      import 'bar'

      console.log(eslint)
    `
  },
  {
    name: 'order__types__fail',
    code: dedent`
      // should be ordered by the source, not the type name
      import type { TypeA } from 'foo-b'
      import type { TypeB } from 'foo-a'

      export const helper = (a: TypeA, b: TypeB): void => {}
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__types__pass',
    code: dedent`
      // should be ordered by the source, not the type name
      import type { TypeB } from 'foo-a'
      import type { TypeA } from 'foo-b'

      export const helper = (a: TypeA, b: TypeB): void => {}
    `
  },
  {
    name: 'order__types-inside__fail',
    code: dedent`
      import type { TypeB, TypeA } from 'foo'

      export const helper = (a: TypeA, b: TypeB): void => {}
    `,
    expectErrors: [
      'import-x/order'
    ]
  },
  {
    name: 'order__types-inside__pass',
    code: dedent`
      import type { TypeA, TypeB } from 'foo'

      export const helper = (a: TypeA, b: TypeB): void => {}
    `
  }
])
