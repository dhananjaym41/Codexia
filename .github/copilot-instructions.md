## Quick summary

This repository currently contains a single frontend app at `Frontend/codex.ai` (Vite + React template). The `Backend/` folder exists but is empty — do not assume server code or API endpoints are present.

Use these instructions to make small, safe code changes, add frontend features, or scaffold a backend while respecting the repository's current structure and conventions.

## High-level architecture

- Frontend: `Frontend/codex.ai` — a Vite + React application using JavaScript/JSX. Entry is `src/main.jsx` and the primary UI component is `src/App.jsx`.
- Backend: `Backend/` — currently empty. If implementing a backend, add a clear API surface (e.g., `Backend/src/server.js`) and plan for a Vite dev proxy or separate dev server.

Key files to inspect before editing:
- `Frontend/codex.ai/package.json` — scripts: `dev`, `build`, `preview`, `lint`.
- `Frontend/codex.ai/vite.config.js` — Vite configuration (check for proxy or plugin settings before adding API calls).
- `Frontend/codex.ai/src/` — UI components (`.jsx`), assets under `src/assets` and static files in `public/` (e.g., `/vite.svg`).

## Developer workflows (commands)

From repo root, work inside the frontend app:

1. Install dependencies (Windows PowerShell):

   cd Frontend/codex.ai; npm install

2. Run the dev server with HMR:

   npm run dev

3. Build for production:

   npm run build

4. Preview a production build:

   npm run preview

5. Lint the codebase:

   npm run lint

Notes:
- The `package.json` overrides `vite` to use `rolldown-vite@7.x`. If you modify build or plugin behavior, check `vite.config.js` for compatibility.

## Project-specific conventions & patterns

- Language: JavaScript with JSX (`.jsx` files) — do not introduce TypeScript without a concerted repo-wide migration.
- Component style: small functional components using React hooks (see `src/App.jsx`). Follow the existing style (named exports default at bottom of files).
- Asset imports may use absolute public paths (e.g., `'/vite.svg'`) or relative imports from `src/assets`. Preserve existing patterns when adding images or static assets.
- Linting: `eslint` is configured; run `npm run lint` and follow rules in `eslint.config.js` before committing.

## Integration & external dependencies

- No external backend or cloud services are detected in the repo. When adding integrations:
  - Add any secrets to a secure store — do not commit them.
  - If you add an API backend under `Backend/`, document the contract (endpoints, auth, CORS) in `README.md` and consider adding a Vite dev proxy in `vite.config.js` for local full-stack dev.

## Safe edit rules for the AI agent

- Make minimal, single-purpose commits with descriptive messages.
- Run `npm install` and `npm run dev` (or `npm run build`) locally to validate behavior for any change touching the frontend.
- Do not modify `package-lock.json` unless you changed `package.json` dependencies. If you must update lockfile, run `npm install` yourself and include both files in the commit.
- Avoid creating TypeScript files or changing project-wide build tooling without explicit instruction.

## Examples to reference

- To add a new page, create `src/pages/MyPage.jsx` and wire it from `src/App.jsx`.
- To add an API call placeholder while backend is not present, add a stub in `Frontend/codex.ai/src/lib/api.js` that throws a clear error pointing to `Backend/` so maintainers know the backend is missing.

## If a `.github/copilot-instructions.md` already exists

- Preserve any project-specific sections. Merge token examples and commands above into existing guidance; keep commit history and existing reviewer notes when possible.

---
If anything is unclear or you'd like more detail (tests, recommended backend layout, or an initial API stub), tell me which area to expand and I'll update this file. 
