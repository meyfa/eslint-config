import { dedent, runFixtureTests } from './fixtures/index.ts'

// Test cases for "eslint-plugin-n" rules

await runFixtureTests('node', [
  {
    name: 'handle-callback-err__fail',
    code: dedent`
      import fs from 'node:fs'

      fs.readFile('file', (err, data) => {
        console.log(data)
      })
    `,
    expectErrors: [
      'n/handle-callback-err'
    ]
  },
  {
    name: 'handle-callback-err__pass',
    code: dedent`
      import fs from 'node:fs'

      fs.readFile('file', (err, data) => {
        if (err != null) {
          throw err
        }
        console.log(data)
      })
    `
  },
  {
    name: 'no-callback-literal__fail',
    code: dedent`
      function read (callback: (value: string) => void): void {
        callback('error')
      }
      read((value) => console.log(value))
    `,
    expectErrors: [
      'n/no-callback-literal'
    ]
  },
  {
    name: 'no-deprecated-api__fail',
    code: dedent`
      import domain from 'node:domain'

      console.log(domain)
    `,
    expectErrors: [
      'n/no-deprecated-api'
    ]
  },
  {
    name: 'no-exports-assign__pass',
    code: dedent`
      declare global {
        var exports: { value: number }
      }

      module.exports = { value: 1 }
    `
  },
  {
    name: 'no-new-require__fail',
    code: dedent`
      const value = new require('node:path')
      console.log(value)
    `,
    expectErrors: [
      'n/no-new-require'
    ]
  },
  {
    name: 'no-path-concat__fail',
    code: dedent`
      const file = import.meta.dirname + '/file'
      console.log(file)
    `,
    expectErrors: [
      'n/no-path-concat'
    ]
  },
  {
    name: 'process-exit-as-throw__pass',
    code: dedent`
      export function fail (): number {
        process.exit(1)
        console.log('unreachable')
        return 1
      }
    `
  }
])
