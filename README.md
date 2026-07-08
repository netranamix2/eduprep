# EduPrep — Frontend

React + TypeScript study/exam-prep platform. 8 routes (the 4 "Tools" designs are sub-tabs of one route).

## Stack

| Concern | Choice | Why |
|---|---|---|
| UI | React 18 + TypeScript | — |
| Build | Vite | Fast dev/HMR |
| Routing | React Router v6 | Nested layout + routes |
| **Server state** | **TanStack React Query** | Caching, loading/error, invalidation for all API data |
| **Client state** | **Zustand** | Tiny global UI state (tabs, grade, subject). Chosen over Redux — see note. |
| Styling | Tailwind CSS | Design tokens from the mockups in `tailwind.config.js` |
| Charts | Recharts | Study/performance graphs |
| Icons | lucide-react | Matches the mockup iconography |

### Why Zustand instead of Redux
This app is overwhelmingly *server state* (courses, leaderboard, progress, applications), which React Query owns end to end. The genuinely-global *client* state is small (active Tools tab, grade level, tutor subject, notification count). Redux's boilerplate adds cost without benefit at this scale. The store is isolated in `src/lib/store/`, so swapping in Redux later is localized.

## Getting started

```bash
npm install
npm run dev
```

## Architecture

```
src/
  app/                 App root, router, providers
  components/
    layout/            TopNav, AppLayout (shared shell)
    ui/                Reusable primitives (build as needed)
  features/            One folder per page — UI lives here
    landing/ journey/ tutor/ courses/ exam-prep/
    tools/ leaderboard/ applications/
  lib/
    api/client.ts      ⭐ THE DATA SEAM — mock now, real fetch later
    mock/data.ts       Mock dataset (conforms to src/types)
    query/             queryClient, keys, hooks  ← components import hooks only
    store/ui.ts        Zustand global client state
  routes/config.ts     Route table + nav config
  types/index.ts       Shared domain types (data contracts)
  styles/index.css     Tailwind layers + tokens
```

## Going from mock to real API

The whole app talks to data through **`src/lib/api/client.ts`**. Today each
method resolves mock data. To go live:

1. Set `USE_MOCK = false` in `client.ts`.
2. Uncomment the `http()` helper and `API_BASE`.
3. Fill in each method's real request body. Signatures stay the same.

Because components only ever call **React Query hooks** (`src/lib/query/hooks.ts`),
and those hooks only call the api client, nothing in the feature/UI layer changes.

## Conventions

- Components **never** call `api` directly or inline query keys — use hooks from `lib/query/hooks.ts` and keys from `lib/query/keys.ts`.
- Server data → React Query. Global UI state → Zustand. Local state → `useState`.
- Use the `cn()` helper for conditional classes.
- New design tokens go in `tailwind.config.js`, not inline hex.

## Status

Scaffold complete: routing, layout/nav, full data + state layers, mock data, and stub pages that each consume their real data hook. **Next:** build out each feature page's UI from the designs.
