export function prefixIncrementStandalonePass (): number {
  let foo = 0
  let bar = 0

  ++foo
  --bar

  return foo + bar
}
