import { ESLint } from 'eslint'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

export interface FixtureCase {
  readonly name: string

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

type LintMessage = ESLint.LintResult['messages'][number]

export interface LintResult {
  readonly filePath: string
  readonly errors: readonly LintMessage[]
  readonly warnings: readonly LintMessage[]
  readonly ruleIds: readonly string[]
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixturesDir = path.join(rootDir, 'test', 'fixtures')

const fixtureExtensions = ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'] as const

const eslint = new ESLint({
  cwd: rootDir,
  overrideConfigFile: path.join(rootDir, 'test', 'eslint-test-config.js')
})

export async function lintFixture (fixtureName: string): Promise<LintResult> {
  const resolvedFixtureName = await resolveFixtureName(fixtureName)
  const filePath = path.join(fixturesDir, resolvedFixtureName)

  const results = await eslint.lintFiles([filePath])
  assert.strictEqual(results.length, 1)

  const messages = results[0].messages
  const errors = messages.filter((m) => m.severity === 2)
  const warnings = messages.filter((m) => m.severity === 1)
  const ruleIds = messages.map((m) => m.ruleId).filter((id) => id != null)

  return { filePath, errors, warnings, ruleIds }
}

export async function runFixtureTests (suite: string, cases: readonly FixtureCase[]): Promise<void> {
  await test(suite, async () => {
    await assertSuiteCoverage(suite, cases)
    for (const fixtureCase of cases) {
      await runFixtureTest(suite, fixtureCase)
    }
  })
}

async function runFixtureTest (suite: string, fixtureCase: FixtureCase): Promise<void> {
  await test(fixtureCase.name, async () => {
    const result = await lintFixture(`${suite}/${fixtureCase.name}`)

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

async function resolveFixtureName (fixtureName: string): Promise<string> {
  if (fixtureExtensions.some((ext) => fixtureName.endsWith(`.${ext}`))) {
    await assertFixtureExists(fixtureName)
    return fixtureName
  }

  for (const ext of fixtureExtensions) {
    const candidate = `${fixtureName}.${ext}`
    if (await fixtureExists(candidate)) {
      return candidate
    }
  }

  const triedNames = fixtureExtensions.map((ext) => `${fixtureName}.${ext}`).join(', ')
  assert.fail(`Fixture not found: ${fixtureName} (tried: ${triedNames})`)
}

async function assertFixtureExists (fixtureName: string): Promise<void> {
  const filePath = path.join(fixturesDir, fixtureName)
  try {
    await fs.access(filePath)
  } catch {
    assert.fail(`Fixture not found: ${fixtureName}`)
  }
}

async function fixtureExists (fixtureName: string): Promise<boolean> {
  const filePath = path.join(fixturesDir, fixtureName)
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function assertSuiteCoverage (suite: string, cases: readonly FixtureCase[]): Promise<void> {
  const suiteDir = path.join(fixturesDir, suite)
  const caseNames = cases.map((c) => c.name)
  const uniqueCaseNames = new Set(caseNames)
  assert.equal(
    uniqueCaseNames.size,
    caseNames.length,
    `Duplicate fixture case names in suite '${suite}': ${caseNames.join(', ')}`
  )

  const entries = await fs.readdir(suiteDir, { withFileTypes: true })
  const fixtureBaseNames: string[] = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (entry.name.endsWith('.d.ts')) continue
    const ext = path.extname(entry.name).slice(1)
    if (!fixtureExtensions.includes(ext as (typeof fixtureExtensions)[number])) continue
    fixtureBaseNames.push(path.basename(entry.name, path.extname(entry.name)))
  }

  const fixtureNameSet = new Set(fixtureBaseNames)

  const missingFixtureFiles = caseNames.filter((name) => !fixtureNameSet.has(name))
  assert.equal(
    missingFixtureFiles.length,
    0,
    `Suite '${suite}' references missing fixtures: ${missingFixtureFiles.join(', ')}`
  )

  const orphanFixtures = fixtureBaseNames.filter((name) => !uniqueCaseNames.has(name))
  assert.equal(
    orphanFixtures.length,
    0,
    `Suite '${suite}' has fixture files not covered by tests: ${orphanFixtures.join(', ')}`
  )
}
