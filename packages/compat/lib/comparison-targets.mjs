/**
 * @typedef {object} ComparisonTarget
 * @property {string} id
 * @property {string} name
 * @property {string | undefined} version
 * @property {(context: { fixture: object }) => Promise<void>} start
 * @property {(context: { fixture: object, fixtureCase: object }) => Promise<object>} runFixtureCase
 * @property {() => Promise<void>} stop
 */

const deterministicLocalTarget = {
  id: "deterministic-local",
  name: "Deterministic Local Target",
  version: "fixture-v1",

  async start() {},

  async runFixtureCase({ fixtureCase }) {
    if (fixtureCase.id === "returns-message") {
      return {
        message: "hello from deterministic local target",
      };
    }

    throw new Error(
      `Deterministic local target does not implement fixture case ${fixtureCase.id}.`,
    );
  },

  async stop() {},
};

const targets = new Map(
  [deterministicLocalTarget].map((target) => [target.id, target]),
);

export function getComparisonTarget(targetId) {
  const target = targets.get(targetId);

  if (!target) {
    throw new Error(`Unknown comparison target ${targetId}.`);
  }

  return target;
}
