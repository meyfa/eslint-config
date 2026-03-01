import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { ESLint } from 'eslint'

const testDirectory = path.dirname(fileURLToPath(import.meta.url))
const rootDirectory = path.dirname(testDirectory)

const defaultEslintConfigFile = path.join(testDirectory, 'eslint-test-config.js')
const generatedFixturesDir = path.join(testDirectory, '__generated__')

const fixtureExtensions = ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'] as const
const defaultFixtureExtension = 'ts'

export function dedent (strings: TemplateStringsArray, ...values: readonly unknown[]): string {
  const text = evaluateTemplate(strings, ...values).replace(/\r\n/g, '\n')
  if (!text.startsWith('\n')) {
    throw new Error('dedent template must start with a newline')
  }

  const lines = text.split('\n').slice(1)

  const minIndent = lines.filter((l) => l.trim() !== '').reduce((min, line) => {
    const indent = /^[ ]*/.exec(line)?.at(0)?.length ?? 0
    return Math.min(min, indent)
  }, Number.POSITIVE_INFINITY)

  return Number.isFinite(minIndent) && minIndent > 0
    ? lines.map((line) => line.slice(minIndent)).join('\n')
    : lines.join('\n')
}

function evaluateTemplate (strings: TemplateStringsArray, ...values: readonly unknown[]): string {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1]
    return result + (value != null ? `${values[i - 1] as any}` : '') + string
  }, '')
}

export interface FixtureCase {
  readonly name: string

  /**
   * Inline fixture source code.
   */
  readonly code: string

  /**
   * File extension to use when linting the fixture.
   * Defaults to `ts`.
   */
  readonly fileExtension?: (typeof fixtureExtensions)[number]

  /**
   * A list of all error rule IDs to expect. If specified, the actual errors must match this list exactly.
   * If not specified, the test will check that there are no errors.
   */
  readonly expectErrors?: readonly string[]

  /**
   * A list of all warning rule IDs to expect. If specified, the actual warnings must match this list exactly.
   * If not specified, the test will check that there are no warnings.
   */
  readonly expectWarnings?: readonly string[]
}

export interface FixtureSuiteOptions {
  /**
   * Path to an ESLint override config file, relative to the repo root.
   * Defaults to `test/eslint-test-config.js`.
   */
  readonly overrideConfigFile?: string
}

type LintMessage = ESLint.LintResult['messages'][number]

export interface LintResult {
  readonly filePath: string
  readonly errors: readonly LintMessage[]
  readonly warnings: readonly LintMessage[]
  readonly ruleIds: readonly string[]
}

const eslintCache = new Map<string, ESLint>()

function getEslint (overrideConfigFile: string): ESLint {
  const existing = eslintCache.get(overrideConfigFile)
  if (existing != null) {
    return existing
  }

  const instance = new ESLint({
    cwd: rootDirectory,
    overrideConfigFile
  })
  eslintCache.set(overrideConfigFile, instance)

  return instance
}

export async function runFixtureTests (suite: string, cases: readonly FixtureCase[], options: FixtureSuiteOptions = {}): Promise<void> {
  await test(suite, async () => {
    assertUniqueCaseNames(suite, cases)

    const suiteDir = path.join(generatedFixturesDir, suite)
    await fs.mkdir(suiteDir, { recursive: true })

    try {
      // Pre-generate all fixtures before the first lint run.
      // In CI, @typescript-eslint/parser may cache the TS Program for the project;
      // if later files don't exist yet, they won't be part of the Program and will error.
      for (const fixtureCase of cases) {
        const filePath = getFixtureFilePath(suite, fixtureCase)
        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, fixtureCase.code, 'utf-8')
      }

      for (const fixtureCase of cases) {
        await runFixtureTest(suite, fixtureCase, options)
      }
    } finally {
      // Keep the repo clean even on failing tests.
      await fs.rm(suiteDir, { recursive: true, force: true })
    }
  })
}

async function runFixtureTest (suite: string, fixtureCase: FixtureCase, options: FixtureSuiteOptions): Promise<void> {
  await test(fixtureCase.name, async () => {
    const result = await lintInlineFixture(suite, fixtureCase, options)

    if (fixtureCase.expectErrors == null) {
      assert.strictEqual(
        result.errors.length,
        0,
        `Expected no errors, but got ${result.errors.length}:\n${result.errors.map((e) => `- ${e.ruleId}: ${e.message} (line ${e.line})`).join('\n')}`
      )
    } else {
      const actualErrorRuleIds = result.errors.map((e) => e.ruleId).filter((id) => id != null)
      assert.deepStrictEqual(
        actualErrorRuleIds,
        fixtureCase.expectErrors,
        `Expected error rule IDs to be ${JSON.stringify(fixtureCase.expectErrors)}, but got ${JSON.stringify(actualErrorRuleIds)}`
      )
    }

    if (fixtureCase.expectWarnings == null) {
      assert.strictEqual(
        result.warnings.length,
        0,
        `Expected no warnings, but got ${result.warnings.length}:\n${result.warnings.map((w) => `- ${w.ruleId}: ${w.message} (line ${w.line})`).join('\n')}`
      )
    } else {
      const actualWarningRuleIds = result.warnings.map((w) => w.ruleId).filter((id) => id != null)
      assert.deepStrictEqual(
        actualWarningRuleIds,
        fixtureCase.expectWarnings,
        `Expected warning rule IDs to be ${JSON.stringify(fixtureCase.expectWarnings)}, but got ${JSON.stringify(actualWarningRuleIds)}`
      )
    }
  })
}

async function lintInlineFixture (
  suite: string,
  fixtureCase: FixtureCase,
  options: FixtureSuiteOptions = {}
): Promise<LintResult> {
  const fileExtension = fixtureCase.fileExtension ?? defaultFixtureExtension
  assert.ok(
    fixtureExtensions.includes(fileExtension),
    `Unsupported fixture extension: ${fileExtension}`
  )
  const fileName = `${fixtureCase.name}.${fileExtension}`

  const overrideConfigFile = options.overrideConfigFile ?? defaultEslintConfigFile
  const overrideConfigFilePath = path.isAbsolute(overrideConfigFile)
    ? overrideConfigFile
    : path.join(testDirectory, overrideConfigFile)
  const eslint = getEslint(overrideConfigFilePath)

  const filePath = path.join(generatedFixturesDir, suite, fileName)

  const results = await eslint.lintFiles([filePath])
  assert.strictEqual(results.length, 1)

  const messages = results[0].messages
  const errors = messages.filter((m) => m.severity === 2)
  const warnings = messages.filter((m) => m.severity === 1)
  const ruleIds = messages.map((m) => m.ruleId).filter((id) => id != null)

  return { filePath, errors, warnings, ruleIds }
}

function getFixtureFilePath (suite: string, fixtureCase: FixtureCase): string {
  const fileExtension = fixtureCase.fileExtension ?? defaultFixtureExtension
  const fileName = `${fixtureCase.name}.${fileExtension}`
  return path.join(generatedFixturesDir, suite, fileName)
}

function assertUniqueCaseNames (suite: string, cases: readonly FixtureCase[]): void {
  const caseNames = cases.map((c) => c.name)
  const uniqueCaseNames = new Set(caseNames)
  assert.equal(
    uniqueCaseNames.size,
    caseNames.length,
    `Duplicate fixture case names in suite '${suite}': ${caseNames.join(', ')}`
  )
}
