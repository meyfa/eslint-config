import path from 'node:path'
import { fileURLToPath } from 'node:url'

import baseConfig from '../src/index.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default [
  ...baseConfig,
  {
    files: ['test/fixtures/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      parserOptions: {
        project: ['./test/tsconfig.eslint.json'],
        tsconfigRootDir: rootDir
      }
    }
  }
]
