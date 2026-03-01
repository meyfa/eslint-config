export function bracesPass (foo: boolean): number {
  if (foo) {
    return 1
  } else {
    return 2
  }
}

export function bracesPassControlStructures (foo: boolean): void {
  for (let i = 0; i < 1; ++i) {
    console.log(i)
  }

  let keepGoing = foo
  while (keepGoing) {
    keepGoing = false
  }

  const next = (): boolean => Math.random() > 0.5
  let keepGoing2 = foo
  do {
    keepGoing2 = next()
  } while (keepGoing2)
}
