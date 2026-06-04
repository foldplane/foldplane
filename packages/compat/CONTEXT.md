# Compatibility

Compatibility defines how Foldplane makes, tests, and reports claims about matching Convex-style behavior.

## Language

**Convex-compatible**:
Foldplane matches documented Convex-style application API behavior for supported features, as measured by fixture apps and compatibility reports. It does not mean Foldplane copies Convex internals, matches undocumented behavior, supports every Convex Cloud feature, or can run arbitrary Convex deployments without adaptation.
_Avoid_: Clone, drop-in replacement, Convex backend

**Fixture app**:
A small, purpose-built application used to test one or more compatibility claims across runtimes. A fixture app is source-controlled, reproducible, and intentionally minimal.
_Avoid_: Example, demo, benchmark

**Compatibility report**:
A generated, versioned record of fixture app results for a specific Foldplane build and comparison target. It states which features passed, failed, were skipped, or are unsupported, and links failures back to exact fixture cases. Reports are JSON first and Markdown second.
_Avoid_: Scorecard, claim

**Compatibility claim**:
A specific supported feature assertion backed by fixture apps and compatibility reports.
_Avoid_: Marketing claim

**Supported feature**:
A documented Convex-style behavior Foldplane intends to pass in compatibility reports.

**Unsupported feature**:
A documented Convex behavior Foldplane intentionally does not support yet.

**Skipped case**:
A fixture case the compatibility report did not run in a specific execution, even if the feature might be supported.
_Avoid_: Unsupported feature

**Deviation**:
A known difference between Foldplane behavior and the comparison target for a supported feature.

**Comparison target**:
The runtime or toolchain a fixture app is run against to evaluate Foldplane behavior.
_Avoid_: Upstream, oracle, reference implementation

**Recorded baseline**:
A versioned set of expected fixture outputs captured from a comparison target. Recorded baselines live under `packages/compat/baselines/` with fixture metadata and comparison target provenance.
_Avoid_: Golden output
