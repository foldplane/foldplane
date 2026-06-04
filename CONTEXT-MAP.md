# Context Map

## Contexts

- [Compatibility](./packages/compat/CONTEXT.md) - defines compatibility claims, fixture apps, harnesses, reports, and what "Convex-compatible" means for Foldplane.
- [Runtime](./packages/runtime/CONTEXT.md) - defines the Convex-style execution model for functions, generated APIs, validators, function context, and document operations.
- [Cloudflare Runtime](./packages/cloudflare/CONTEXT.md) - defines the Cloudflare-specific runtime and deployment model for Workers, Durable Objects, D1 and R2 adapters, subscription transport, coordination, and persistence.

## Relationships

- **Compatibility -> Runtime**: Compatibility exercises Runtime behavior through fixture apps, but executable Foldplane behavior belongs to Runtime, including minimal or in-memory implementations.
- **Compatibility -> Cloudflare Runtime**: Compatibility exercises Cloudflare-specific deployments to distinguish runtime behavior from platform-adapter behavior.
- **Cloudflare Runtime -> Runtime**: Cloudflare Runtime hosts Runtime behavior on Cloudflare primitives without changing the core execution model. Runtime semantics should stabilize before Cloudflare-specific implementation work defines behavior.
