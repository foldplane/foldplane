# Roadmap

Foldplane is experimental. The roadmap starts with compatibility evidence before production runtime claims.

## Milestone 0: Compatibility Harness

- Define the fixture app format.
- Add one or two tiny fixture apps.
- Run fixture apps against pluggable comparison targets where licensing and access allow.
- Store recorded baselines under `packages/compat/baselines/` with fixture metadata and comparison target provenance.
- Support CI-friendly compatibility checks from recorded baselines.
- Run fixture apps against Foldplane's in-memory runtime.
- Generate JSON compatibility reports first, then Markdown reports for human review on GitHub.
- Commit sample reports for releases and fixture documentation, but not every local run.

## Deferred From Milestone 0

- Generated API support.
- Realtime subscriptions.
- External-service action behavior.
- Authentication behavior, except for a tiny stubbed identity if a fixture needs one.
- Scheduled functions.
- HTTP actions.
- R2 file storage.
- Production Cloudflare Runtime.
- npm package publishing.
- README installation commands.

## Later Milestones

- Expand the Runtime beyond the initial in-memory implementation.
- Define the Runtime document store contract before adding Cloudflare persistence.
- Add D1 as the first Cloudflare document store adapter.
- Add Cloudflare Runtime support with Workers and Durable Objects after Runtime semantics are stable.
- Add R2 adapters after document and function compatibility is useful.
- Add subscription semantics and Cloudflare subscription transport.
- Add generated API support.
