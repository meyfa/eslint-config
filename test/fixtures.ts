import { ESLint } from 'eslint'
import assert from 'node:assert'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

export interface FixtureCase {
  readonly name: string
  readonly mustHave?: readonly string[]
  readonly mustNotHave?: readonly string[]
  readonly errorCount?: number
}

type LintMessage = ESLint.LintResult['messages'][number]

export interface LintResult {
  readonly filePath: string
  readonly errors: readonly LintMessage[]
  readonly ruleIds: readonly string[]
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixturesDir = path.join(rootDir, 'test', 'fixtures')

const eslint = new ESLint({
  cwd: rootDir,
  overrideConfigFile: path.join(rootDir, 'test', 'eslint-test-config.js')
})

export async function lintFixture (fixtureName: string) {
  const filePath = path.join(fixturesDir, fixtureName)

  const results = await eslint.lintFiles([filePath])
  assert.strictEqual(results.length, 1)

  const errors = results[0].messages.filter((m) => m.severity === 2)
  const ruleIds = errors.map((m) => m.ruleId).filter((id) => id != null)

  return { filePath, errors, ruleIds }
}

export async function runFixtureTests (suite: string, cases: readonly FixtureCase[]) {
  await test(suite, async () => {
    for (const fixtureCase of cases) {
      await runFixtureTest(suite, fixtureCase)
    }
  })
}

async function runFixtureTest (suite: string, fixtureCase: FixtureCase) {
  await test(fixtureCase.name, async () => {
    const result = await lintFixture(`${suite}/${fixtureCase.name}.ts`)

    if (fixtureCase.errorCount != null) {
      assert.equal(
        result.errors.length,
        fixtureCase.errorCount,
        `Expected ${fixtureCase.errorCount} errors, got ${result.errors.length}: ${JSON.stringify(result.errors, null, 2)}`
      )
    }

    for (const ruleId of fixtureCase.mustHave ?? []) {
      assert.ok(
        result.ruleIds.includes(ruleId),
        `Expected ${result.filePath} to include rule ${ruleId}, got: ${JSON.stringify(result.ruleIds)}`
      )
    }

    for (const ruleId of fixtureCase.mustNotHave ?? []) {
      assert.ok(
        !result.ruleIds.includes(ruleId),
        `Expected ${result.filePath} to NOT include rule ${ruleId}, got: ${JSON.stringify(result.ruleIds)}`
      )
    }
  })
}
