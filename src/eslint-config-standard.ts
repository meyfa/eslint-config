import type { Linter } from 'eslint'

import config = require('eslint-config-standard')

const casted = config as Linter.Config
export = casted
