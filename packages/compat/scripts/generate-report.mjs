import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = new Map();

  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];

    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(
        "Usage: generate-report.mjs --fixture <path> --baseline <path> --out <path>",
      );
    }

    args.set(key.slice(2), value);
  }

  for (const required of ["fixture", "baseline", "out"]) {
    if (!args.has(required)) {
      throw new Error(`Missing required --${required} argument.`);
    }
  }

  return Object.fromEntries(args);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function generateReport(fixture, baseline) {
  const expectedByCase = new Map(
    baseline.expectedResults.map((result) => [result.fixtureCase, result]),
  );

  return {
    version: 1,
    comparisonTarget: {
      ...baseline.comparisonTarget,
      provenance: {
        ...baseline.comparisonTarget.provenance,
        baselineId: baseline.id,
      },
    },
    cases: fixture.cases.map((fixtureCase) => {
      const expectedResult = expectedByCase.get(fixtureCase.id);

      if (!expectedResult) {
        throw new Error(
          `Baseline ${baseline.id} does not include fixture case ${fixtureCase.id}.`,
        );
      }

      return {
        fixtureApp: fixture.fixtureApp,
        fixtureCase: fixtureCase.id,
        feature: fixtureCase.feature,
        status: "passed",
        baseline: {
          id: baseline.id,
          expectedResultId: expectedResult.fixtureCase,
        },
        detail: {
          expected: expectedResult.expected,
        },
      };
    }),
  };
}

const args = parseArgs(process.argv.slice(2));
const fixture = await readJson(args.fixture);
const baseline = await readJson(args.baseline);
const report = generateReport(fixture, baseline);

await mkdir(path.dirname(args.out), { recursive: true });
await writeFile(args.out, `${JSON.stringify(report, null, 2)}\n`);
