const outerValue = 123

// @isolated
function readOuterValue (): number {
  return outerValue
}

void readOuterValue
