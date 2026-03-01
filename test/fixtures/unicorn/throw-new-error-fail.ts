function fail (): never {
  throw Error('boom')
}

void fail
