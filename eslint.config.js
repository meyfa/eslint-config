import eslintConfig from './dist/index.js'

export default [
  ...eslintConfig,
  {
    ignores: [
      'dist',
      '.idea',
      '.vscode'
    ]
  }
]
