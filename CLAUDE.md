@AGENTS.md
# CLAUDE.md

# 0. MANDATORY WORKFLOW — READ THIS FILE BEFORE EVERY CHANGE

**Before implementing any change to the site — a new page, a component, a bug fix, a style tweak, anything — re-read this CLAUDE.md file first.**

This file is the standing source of truth for how this project should be built. Do not rely on memory of a previous conversation or assume the rules haven't changed. Every session, every task, every change: check this file first.

## Backend Kill-Switch — Read This Before Touching Anything Backend-Related

This project has a backend that can be **turned on or off** via environment variables:

- `BACKEND_ENABLED` — server-side switch. Read via `isBackendEnabled()` in [src/lib/backend-config.ts](src/lib/backend-config.ts). Controls DB/Prisma init, NextAuth, onOffice calls, and all `/api` backend logic.
- `NEXT_PUBLIC_BACKEND_ENABLED` — client-safe mirror of the same flag, for Client Components that need to conditionally skip fetches. Read via `isBackendEnabledClient()`.
- Both must be set to the same value (`"true"` or `"false"`) and kept in sync manually in `.env`.
- **Default is `"false"` (backend OFF)** — this is intentional, to avoid accidental connections to a production database or live API integrations when env vars are missing or misconfigured.
- API routes can be wrapped in `withBackendGuard()` to instantly return a 503 with a safe mock-state message when the backend is disabled, instead of failing unpredictably.

Whenever a task touches data fetching, forms, auth, or anything that could call the backend:

1. Check whether `BACKEND_ENABLED` / `NEXT_PUBLIC_BACKEND_ENABLED` is relevant to the change.
2. Make sure the UI behaves correctly in **both** states — backend OFF (mock/safe state) and backend ON (live data) — don't build something that only works when the backend happens to be enabled.
3. Never flip the flag to `"true"` in committed config or `.env.example` defaults without being explicitly asked to — the OFF default is a deliberate safety measure, not an oversight.
