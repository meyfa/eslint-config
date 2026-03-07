import eslintConfig from './src/index.ts'

export default [
  ...eslintConfig,
  {
    ignores: [
      'dist',
      'test/__generated__',
      '.idea',
      '.vscode'
    ]
  }
]
