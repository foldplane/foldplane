import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getComparisonTarget } from "../lib/comparison-targets.mjs";

function parseArgs(argv) {
  const args = new Map();

  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];

    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(
        "Usage: capture-baseline.mjs --fixture <path> --target <id> --captured-at <iso timestamp> --out <path>",
      );
    }

    args.set(key.slice(2), value);
  }

  for (const required of ["fixture", "target", "captured-at", "out"]) {
    if (!args.has(required)) {
      throw new Error(`Missing required --${required} argument.`);
    }
  }

  return Object.fromEntries(args);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function captureBaseline({ fixture, target, capturedAt }) {
  const comparisonTarget = {
    id: target.id,
    name: target.name,
    ...(target.version ? { version: target.version } : {}),
    provenance: {
      source: "captured",
      capturedAt,
    },
  };

  await target.start({ fixture });

  try {
    const expectedResults = [];

    for (const fixtureCase of fixture.cases) {
      expectedResults.push({
        fixtureCase: fixtureCase.id,
        provenance: {
          fixtureApp: fixture.fixtureApp,
          fixtureCase: fixtureCase.id,
        },
        expected: await target.runFixtureCase({ fixture, fixtureCase }),
      });
    }

    return {
      id: `${target.id}:${fixture.fixtureApp}:${capturedAt}`,
      comparisonTarget,
      fixtureApp: fixture.fixtureApp,
      expectedResults,
    };
  } finally {
    await target.stop();
  }
}

const args = parseArgs(process.argv.slice(2));
const fixture = await readJson(args.fixture);
const target = getComparisonTarget(args.target);
const baseline = await captureBaseline({
  fixture,
  target,
  capturedAt: args["captured-at"],
});

await mkdir(path.dirname(args.out), { recursive: true });
await writeFile(args.out, `${JSON.stringify(baseline, null, 2)}\n`);
