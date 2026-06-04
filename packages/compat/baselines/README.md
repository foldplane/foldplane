# Recorded Baselines

Recorded baselines are versioned expected fixture outputs captured from comparison targets.

Each baseline should include fixture metadata and comparison target provenance.

## Capture a local deterministic baseline

The compatibility harness includes a deterministic local comparison target for CI-safe baseline capture:

```sh
node packages/compat/scripts/capture-baseline.mjs \
  --fixture packages/compat/fixtures/minimal-query/fixture.json \
  --target deterministic-local \
  --captured-at 2026-06-04T12:00:00.000Z \
  --out packages/compat/baselines/deterministic-local/minimal-query.json
```

Comparison targets implement a small lifecycle contract: start for a fixture app, run each fixture case, and stop after capture. Captured baselines record the comparison target name, optional version, capture time, fixture app, and fixture case identity.
