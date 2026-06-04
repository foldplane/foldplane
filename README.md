# Foldplane

Foldplane is an independent, community-built project for measuring and building toward Convex-style behavior on Cloudflare.

Foldplane is experimental. The first milestone is a compatibility harness that produces compatibility reports from fixture apps. A production Cloudflare Runtime is not available yet.

See [ROADMAP.md](./ROADMAP.md) for current milestone scope.

Foldplane is not affiliated with Convex.

## Goals

- Define reproducible compatibility claims through fixture apps and compatibility reports.
- Build a Runtime for Convex-style functions: queries, mutations, and actions.
- Build a self-hosted Cloudflare Runtime for users to run in their own Cloudflare account.
- Keep supported features, unsupported features, and deviations explicit.

## Non-goals

- Foldplane is not a managed hosted service.
- Foldplane is not Convex Cloud.
- Foldplane does not copy Convex internals or undocumented behavior.

## Initial Packages

- `@foldplane/compat`
- `@foldplane/runtime`
- `@foldplane/cloudflare`

## License

Apache-2.0. See [LICENSE](./LICENSE).
