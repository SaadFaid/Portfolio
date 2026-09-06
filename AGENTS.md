# AGENTS.md

## Repo root

- The git repo root is `Portfolio-Showcase/`, not the parent directory. Open sessions at the parent against this subdirectory.

## Package manager & workspace

- **pnpm only.** Root `preinstall` forcibly deletes `package-lock.json`/`yarn.lock` and aborts installs unless the agent is pnpm. Never run `npm install` or add a `package-lock.json`.
- pnpm workspaces monorepo. Packages: `lib/*` (shared: `db`, `api-spec`, `api-zod`, `api-client-react`), `artifacts/*` (apps: `api-server`, `saad-faid-portfolio`, `mockup-sandbox`), `scripts`.
- Dependencies are versioned via the `catalog:` file in `pnpm-workspace.yaml` (occupied by a security lockfile policy). **Do not edit the `minimumReleaseAge: 1440` supply-chain guard.** New deps must be ≥1 day old unless allow-listed.
- Only linux-x64 binaries are installed; the `overrides` block stubs out every other esbuild/lightningcss/rollup/oxide platform. Don't add platform-specific deps.

## Commands

- `pnpm run typecheck` — full check: `tsc --build` on the `lib/*` project references, then per-package `tsc --noEmit` across `artifacts/*` and `scripts`. This is the only automated check — there is no lint/ESLint setup and no `.prettierrc` (prettier is installed but unconfigured), so don't hunt for a `pnpm run lint`.
- `pnpm run build` — runs typecheck first, then `pnpm -r --if-present run build`. The api-server "build" is an esbuild bundle to `dist/` via `build.mjs`.
- Single package: `pnpm --filter <@workspace/name> run <script>`. For a focused check, `tsc -p tsconfig.json --noEmit` in the package dir works directly.

## API contract & codegen (important)

- Source of truth is `lib/api-spec/openapi.yaml`. Regenerate client/Zod code with:
  `pnpm --filter @workspace/api-spec run codegen`
  (runs orval -> writes `lib/api-client-react/src/generated/*` and `lib/api-zod/src/generated/*`, then re-runs `typecheck:libs`).
- **Generated output is committed to git**, not gitignored. Edit the spec, re-run codegen, and commit the regenerated files together. Don't hand-edit `generated/*`.
- Orval config (`lib/api-spec/orval.config.ts`) forces the API title to `"Api"` — generated files are imported based on that assumption; don't rename the title.
- Client generates a `baseUrl: "/api"` with a custom fetch mutator (`lib/api-client-react/src/custom-fetch.ts`).

## App runtime requirements (hard errors if missing)

- `artifacts/saad-faid-portfolio` and `artifacts/mockup-sandbox` Vite configs **require both `PORT` and `BASE_PATH` env vars** or they throw at load. `saad-faid-portfolio` also requires `strictPort`. In `saad-faid-portfolio`, the `@assets` alias resolves to the repo-root `attached_assets/` directory (above the artifact dir) — that's where user-supplied images live, not `public/`.
- `artifacts/api-server` requires `PORT`; its `dev` script is **not a watcher** — it runs `build` then `start` (node on `dist/index.mjs`). Given PORT, run with `pnpm --filter @workspace/api-server run dev`.
- `lib/db` scripts (`push`, `push-force`) require `DATABASE_URL` and will throw without it. These are direct push against the live DB — there are **no migration files**; the Drizzle schema (`lib/db/src/schema/index.ts`) is the source of truth, pushed via `drizzle-kit push`.
- `.replit` `postMerge` hook runs `scripts/post-merge.sh` (pnpm frozen install + `db push`) after merges — be aware DB is auto-synced on merge.

## Cross-package resolution

- Shared libs (`api-zod`, `db`, `api-client-react`) export **raw TS source** (`./src/index.ts`), resolved via `tsconfig` `customConditions: ["workspace"]`. They are bundled at app build time, not precompiled. This is why the codegen output works without a separate build step.

## TypeScript base

- `tsconfig.base.json` is strict but baseline quirks: `noUnusedLocals:false` (unused locals are NOT errors), `strictFunctionTypes:false`, `noImplicitOverride:false`. Don't waste effort "fixing" unused variables to satisfy a check that isn't on.