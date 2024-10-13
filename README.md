# @meyfa/eslint-config

[![CI](https://github.com/meyfa/eslint-config/actions/workflows/main.yml/badge.svg)](https://github.com/meyfa/eslint-config/actions/workflows/main.yml)

ESLint config for personal TypeScript projects.

## Usage

Install ESLint, as well as this package (`-DE` means `--save-dev --save-exact`):

```sh
npm install -DE eslint@9 @meyfa/eslint-config
```

Then in the `eslint.config.js`:

```js
import eslintConfig from '@meyfa/eslint-config'

export default [
  ...eslintConfig,
  {
    ignores: ['dist']
  }
]
```

If needed, override the TypeScript config location (default: `./tsconfig.lint.json`):

```js
import eslintConfig from '@meyfa/eslint-config'

export default [
  ...eslintConfig,
  {
    ignores: ['dist']
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.lint.json'
      }
    }
  }
]
```

If the project requires JSDoc for some files, add the following:

```js
import eslintConfig from '@meyfa/eslint-config'
import eslintConfigJsdoc from '@meyfa/eslint-config/jsdoc'

export default [
  ...eslintConfig,
  {
    ignores: ['dist']
  },
  {
    ...eslintConfigJsdoc,
    files: ['src/**/*.ts']
  }
]
```
