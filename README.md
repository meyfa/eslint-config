# @meyfa/eslint-config

[![CI](https://github.com/meyfa/eslint-config/actions/workflows/main.yml/badge.svg)](https://github.com/meyfa/eslint-config/actions/workflows/main.yml)

ESLint config for personal TypeScript projects. It uses the RushStack patch to reduce dependency clutter.

## Usage

Install ESLint, as well as this package (`-DE` means `--save-dev --save-exact`):

```sh
npm install -DE eslint@8 @meyfa/eslint-config
```

Then in the `.eslintrc.yml`:

```yml
extends: '@meyfa/eslint-config'
parserOptions:
  project: './tsconfig.eslint.json'
```

That's it! If the project requires JSDoc for some files, add the following to the `.eslintrc.yml`:

```yml
overrides:
  - files: ['src/**/*.ts']
    extends: '@meyfa/eslint-config/jsdoc'
```
