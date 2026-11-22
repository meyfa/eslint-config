import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "eslint-plugin-promise" rules

await runFixtureTests('promise', [
  {
    name: 'param-names__fail',
    code: dedent`
      void new Promise((resolve, fail) => {
        fail(new Error('failed'))
      })
    `,
    expectErrors: [
      'promise/param-names'
    ]
  },
  {
    name: 'param-names__pass',
    code: dedent`
      void new Promise((resolve, reject) => {
        resolve(1)
      })
    `
  }
])
