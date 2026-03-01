export function prefixIncrementForPass (): void {
  for (let i = 0; i < 3; ++i) {
    console.log(i)
  }

  for (let j = 3; j > 0; --j) {
    console.log(j)
  }

  for (let a = 0, b = 0; a < 3; ++a, ++b) {
    console.log(a + b)
  }

  for (let c = 3, d = 3; c > 0; --c, --d) {
    console.log(c + d)
  }
}

export function suffixOutsideForLoopIsOk (): number {
  let k = 0
  const j = k++
  return k + j
}

export function suffixInsideForBodyIsOk (): number {
  let m = 0
  for (let i = 0; i < 3; ++i) {
    const n = m++
    m = n
  }
  return m
}

export function suffixInsideForConditionIsOk (): number {
  let p = 0
  for (let i = 0; p++ < 3; ++i) {
    console.log(i)
  }
  return p
}
