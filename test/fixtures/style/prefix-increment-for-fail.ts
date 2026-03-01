export function prefixIncrementForFail (): void {
  for (let i = 0; i < 3; i++) {
    console.log(i)
  }

  for (let j = 3; j > 0; j--) {
    console.log(j)
  }

  for (let a = 0, b = 0; a < 3; a++, ++b) {
    console.log(a + b)
  }

  for (let c = 3, d = 3; c > 0; c--, --d) {
    console.log(c + d)
  }

  for (let a = 0, b = 0; a < 3; ++a, b++) {
    console.log(a + b)
  }

  for (let c = 3, d = 3; c > 0; --c, d--) {
    console.log(c + d)
  }
}
