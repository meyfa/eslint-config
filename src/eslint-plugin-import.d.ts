declare module 'eslint-plugin-import' {
  import { TSESLint } from '@typescript-eslint/utils'
  const plugin: TSESLint.FlatConfig.Plugin
  export = plugin
}
