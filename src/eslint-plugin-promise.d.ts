declare module 'eslint-plugin-promise' {
  import { TSESLint } from '@typescript-eslint/utils'
  const plugin: TSESLint.FlatConfig.Plugin
  export = plugin
}
