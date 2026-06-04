# Cloudflare Runtime

Cloudflare Runtime defines how Foldplane runs on Cloudflare's platform primitives.

## Language

**Cloudflare Runtime**:
The Foldplane runtime environment built on Cloudflare primitives, including Workers, Durable Objects, D1, R2, deployment, coordination, and subscription transport.
_Avoid_: Cloudflare adapter

**Adapter**:
A replaceable Cloudflare-specific integration behind a Runtime interface, such as D1 persistence or R2 file storage.

**D1 adapter**:
A Cloudflare-specific persistence implementation behind the Runtime document store interface.
_Avoid_: Document store, database

**Subscription transport**:
The Cloudflare-specific mechanism used to deliver subscription updates to clients.
_Avoid_: Subscription
