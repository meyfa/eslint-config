import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'
import jsdocConfig from '../../src/jsdoc.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

export default [
  {
    ...jsdocConfig,
    files: ['test/__generated__/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./test/fixtures/tsconfig.eslint.json'],
        tsconfigRootDir: rootDir
      }
    }
  }
]
