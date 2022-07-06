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

That's it!

## Rules

This package provides all the rules from [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript/).
It customizes some things for files that match the glob `test/**/*` to work better with Mocha/Chai.

The main reason this package exists is to avoid having to install all peer dependencies of
eslint-config-standard-with-typescript.
