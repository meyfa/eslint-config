import eslintConfig from './src/index.ts'

export default [
  ...eslintConfig,
  {
    ignores: [
      'dist',
      'test/fixtures',
      '.idea',
      '.vscode'
    ]
  }
]
