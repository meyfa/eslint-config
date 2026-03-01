function helper (fn: (arg: string) => void) {
  fn('test')
}

helper((arg) => {
  void arg
})
