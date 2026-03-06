import { dedent, runFixtureTests } from './fixtures/index.js'

await runFixtureTests('import', [
  {
    name: 'consistent-type-specifier-style-fail',
    code: dedent`
      import { type TestContext, test } from 'node:test'

      export function handle (t: TestContext): void {
        void test
        void t
      }
    `,
    expectErrors: [
      'import/consistent-type-specifier-style'
    ]
  },
  {
    name: 'consistent-type-specifier-style-pass',
    code: dedent`
      import type { TestContext } from 'node:test'
      import { test } from 'node:test'

      export function handle (t: TestContext): void {
        void test
        void t
      }
     `
  },
  {
    name: 'first-fail',
    code: dedent`
      import path from 'node:path'

      void path // this should come after all the imports
      import { ESLint } from 'eslint'

      void ESLint
    `,
    expectErrors: [
      'import/order',
      'import/first'
    ]
  },
  {
    name: 'newline-after-import-fail',
    code: dedent`
      import path from 'node:path'
      void path
    `,
    expectErrors: [
      'import/newline-after-import'
    ]
  },
  {
    name: 'newline-after-import-pass',
    code: dedent`
      import path from 'node:path'

      void path
    `
  },
  {
    name: 'order-fail',
    code: dedent`
      import { ESLint } from 'eslint'
      import path from 'node:path'

      void ESLint
      void path
    `,
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-alphabetize-fail',
    code: dedent`
      import tseslint from 'typescript-eslint'
      import eslint from '@eslint/js'

      void tseslint
      void eslint
    `,
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-named-fail',
    code: dedent`
      import { Linter, ESLint } from 'eslint'

      void ESLint
      void Linter
    `,
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-newlines-fail',
    code: dedent`
      import eslint from '@eslint/js'

      import tseslint from 'typescript-eslint'

      void eslint
      void tseslint
    `,
    expectErrors: [
      'import/order'
    ]
  },
  {
    name: 'order-side-effects-pass',
    code: dedent`
      import 'foo'
      import eslint from '@eslint/js'
      import 'bar'

      void eslint
    `
  }
])
