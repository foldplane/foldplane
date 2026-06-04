import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

test("captures a recorded baseline from the deterministic local comparison target", async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), "foldplane-baseline-"));
  const outputPath = path.join(outputDir, "minimal-query.json");

  await execFileAsync("node", [
    path.join(repoRoot, "packages/compat/scripts/capture-baseline.mjs"),
    "--fixture",
    path.join(repoRoot, "packages/compat/fixtures/minimal-query/fixture.json"),
    "--target",
    "deterministic-local",
    "--captured-at",
    "2026-06-04T12:00:00.000Z",
    "--out",
    outputPath,
  ]);

  const baseline = JSON.parse(await readFile(outputPath, "utf8"));

  assert.deepEqual(baseline, {
    id: "deterministic-local:minimal-query:2026-06-04T12:00:00.000Z",
    comparisonTarget: {
      id: "deterministic-local",
      name: "Deterministic Local Target",
      version: "fixture-v1",
      provenance: {
        source: "captured",
        capturedAt: "2026-06-04T12:00:00.000Z",
      },
    },
    fixtureApp: "minimal-query",
    expectedResults: [
      {
        fixtureCase: "returns-message",
        provenance: {
          fixtureApp: "minimal-query",
          fixtureCase: "returns-message",
        },
        expected: {
          message: "hello from deterministic local target",
        },
      },
    ],
  });
});

test("generates a JSON compatibility report from a captured recorded baseline", async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), "foldplane-captured-report-"));
  const fixturePath = path.join(
    repoRoot,
    "packages/compat/fixtures/minimal-query/fixture.json",
  );
  const baselinePath = path.join(outputDir, "baseline.json");
  const reportPath = path.join(outputDir, "report.json");

  await execFileAsync("node", [
    path.join(repoRoot, "packages/compat/scripts/capture-baseline.mjs"),
    "--fixture",
    fixturePath,
    "--target",
    "deterministic-local",
    "--captured-at",
    "2026-06-04T12:00:00.000Z",
    "--out",
    baselinePath,
  ]);

  await execFileAsync("node", [
    path.join(repoRoot, "packages/compat/scripts/generate-report.mjs"),
    "--fixture",
    fixturePath,
    "--baseline",
    baselinePath,
    "--out",
    reportPath,
  ]);

  const report = JSON.parse(await readFile(reportPath, "utf8"));

  assert.deepEqual(report.comparisonTarget, {
    id: "deterministic-local",
    name: "Deterministic Local Target",
    version: "fixture-v1",
    provenance: {
      source: "captured",
      capturedAt: "2026-06-04T12:00:00.000Z",
      baselineId: "deterministic-local:minimal-query:2026-06-04T12:00:00.000Z",
    },
  });
  assert.deepEqual(report.cases, [
    {
      fixtureApp: "minimal-query",
      fixtureCase: "returns-message",
      feature: "queries.basic-return-value",
      status: "passed",
      baseline: {
        id: "deterministic-local:minimal-query:2026-06-04T12:00:00.000Z",
        expectedResultId: "returns-message",
      },
      detail: {
        expected: {
          message: "hello from deterministic local target",
        },
      },
    },
  ]);
});
