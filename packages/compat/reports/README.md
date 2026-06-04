# Compatibility Reports

Compatibility reports are generated records of fixture app results for a specific Foldplane build and comparison target.

Reports should be committed for releases and fixture documentation, not for every local run.

## Generate the first JSON report

Run the compatibility report generator with a fixture app declaration, a recorded baseline, and an output path:

```sh
node packages/compat/scripts/generate-report.mjs \
  --fixture packages/compat/fixtures/minimal-query/fixture.json \
  --baseline packages/compat/baselines/convex-cloud/minimal-query.json \
  --out packages/compat/reports/minimal-query.json
```

For deterministic verification, run:

```sh
node --test packages/compat/tests/generate-report.test.mjs
```

Captured baselines can be passed to the same generator without a manual transformation step. The deterministic local target path is covered by:

```sh
node --test packages/compat/tests/capture-baseline.test.mjs
```
