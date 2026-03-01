const maybeObject: Record<string, number> | undefined = Math.random() > 0.5 ? { a: 1 } : undefined

const combined = {
  ...(maybeObject ?? {})
}

void combined
