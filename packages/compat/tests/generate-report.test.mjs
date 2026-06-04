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

test("generates a JSON compatibility report from a fixture app and recorded baseline", async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), "foldplane-compat-"));
  const outputPath = path.join(outputDir, "report.json");

  await execFileAsync("node", [
    path.join(repoRoot, "packages/compat/scripts/generate-report.mjs"),
    "--fixture",
    path.join(repoRoot, "packages/compat/fixtures/minimal-query/fixture.json"),
    "--baseline",
    path.join(
      repoRoot,
      "packages/compat/baselines/convex-cloud/minimal-query.json",
    ),
    "--out",
    outputPath,
  ]);

  const report = JSON.parse(await readFile(outputPath, "utf8"));

  assert.equal(report.version, 1);
  assert.deepEqual(report.comparisonTarget, {
    id: "convex-cloud",
    name: "Convex Cloud",
    provenance: {
      source: "recorded",
      capturedAt: "2026-06-04T00:00:00.000Z",
      baselineId: "convex-cloud:minimal-query:2026-06-04",
    },
  });
  assert.deepEqual(report.cases, [
    {
      fixtureApp: "minimal-query",
      fixtureCase: "returns-message",
      feature: "queries.basic-return-value",
      status: "passed",
      baseline: {
        id: "convex-cloud:minimal-query:2026-06-04",
        expectedResultId: "returns-message",
      },
      detail: {
        expected: {
          message: "hello from a query",
        },
      },
    },
  ]);
});
