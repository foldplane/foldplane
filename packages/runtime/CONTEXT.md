# Runtime

Runtime defines the Convex-style execution model that Foldplane exposes to application code.

## Language

**Function**:
A user-authored query, mutation, or action executed by the Foldplane runtime. Use "Convex-style function" in public positioning when needed to distinguish Foldplane's implementation from Convex's product.
_Avoid_: Application function, backend function, server function, handler

**Query**:
A function that reads data and returns results without writing to the document store.

**Mutation**:
A function that writes data and runs as a transaction.

**Action**:
A function that can perform external side effects and can call queries or mutations instead of directly participating in the transactional document store.

**Document store**:
The logical database interface exposed to functions for reading and writing typed documents.
_Avoid_: Database, D1 store

**Self-hosted runtime**:
Software users run in their own Cloudflare account rather than a managed hosted Foldplane service.
_Avoid_: Managed service, hosted cloud, Convex Cloud alternative

**In-memory runtime**:
A Runtime implementation that executes functions and stores documents in process memory for compatibility testing and local development. It should prefer production-like semantics over testing convenience, and should not be confused with Cloudflare Runtime.
_Avoid_: Mock runtime, test runtime, fake runtime

**Generated API**:
Code generated from the user's functions that provides typed references for clients and function-to-function calls. Generated API support is part of the Runtime model but is not required for Milestone 0.
_Avoid_: SDK, client API, routes

**Subscription**:
A client-observable query result that can update when its dependencies change.
