function helper (fn: (arg: string) => void) {
  fn('test')
}

// arg should be parenthesized
helper(arg => {})
