# Wireframe Clean Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the wireframe viewer into feature folders with per-flow, per-role validated content, without changing what users see except the approved sidebar grouping by role.

**Architecture:** `domain/` holds types, role list, environment config and a pure validator. `content/` holds one data file per flow plus the catalog. `features/*` hold the UI, `shared/ui` holds the design system, `app/` holds the entry and layout. State is split into a selection provider and a workspace provider, both living in `features/workspace`.

**Tech Stack:** React 19, TypeScript 6, Vite 8, oxlint, Node 26 (native TypeScript type stripping for scripts). No test framework.

**Spec:** `docs/superpowers/specs/2026-11-04-wireframe-clean-architecture-design.md`

## Global Constraints

- Pure restructure: no new feature, no router, no new dependency, no test framework (spec D6).
- Every step leaves `npm run build` passing; `npm run lint` must show no warning beyond the two that exist today (`react/only-export-components` in `WireframeContext.tsx`, `react/set-state-in-effect` in `Sidebar.tsx`). Moving or splitting those files may move the warning, not add one.
- `validate.ts` stays pure (no `fs`). The check that each `source` file exists is done by `scripts/check-content.ts`; this refines the spec, which listed it under the validator.
- Files under `src/domain/`, `src/content/` and `scripts/` use explicit `.ts` extensions in relative imports and `import type` for types, so Node can run them directly. `tsconfig.app.json` already allows `.ts` imports.
- No enums, no parameter properties (`erasableSyntaxOnly`); unused locals and parameters are errors.
- Dependency direction: `app` → `features` → `domain` and `shared`. `content` imports only `domain` types. `shared/ui` imports nothing from the rest of `src`. A feature imports another feature only through that feature's `index.ts`.
- Use `git mv` for every move so history follows the file. Do not edit `docs/wireframes/**`.
- Visible output must match the baseline captured in Task 1, except the sidebar order and group titles.
- The user approved this plan; that authorises the local commits listed below. Do not push.

## Review Focus

- Catalog with zero flows: first selection must not crash. Expected: the app shows an empty state message, and `check:content` fails with "catalog is empty".
- Duplicate screen id inside a flow, or a `nextScreen` or `→ ID` that names a missing screen: `check:content` exits non-zero and names flow file and screen id.
- A flow whose `source` file does not exist: `check:content` exits non-zero.
- Search text that matches nothing: sidebar shows no groups and no crash; clearing the text restores the list.
- Dark theme on `PUB-01` after its gradient colour moves to tokens: the icon tile stays readable.

## File Structure

```text
src/app/                     main.tsx, App.tsx, App.css, index.css, WireframeLayout.tsx/.css, header/AppHeader.tsx/.css
src/content/                 roles.ts, index.ts, karaoke-owner/<flow>.ts (10), blink-admin/<flow>.ts (5)
src/domain/                  types.ts, environments.ts, validate.ts
src/features/workspace/      SelectionProvider, WorkspaceProvider, hooks, index.ts
src/features/navigation/     Sidebar (moved), index.ts
src/features/viewer/         WireframeScreenViewer (moved), custom-mockups.tsx, index.ts
src/features/inspector/      ScreenSpecPanel (moved), index.ts
src/features/design-system-view/  DesignSystemShowcase (moved), index.ts
src/shared/ui/               design-system (moved unchanged)
src/shared/assets/           logo_image.png (moved)
scripts/check-content.ts
```

`index.html` keeps pointing at the entry; update its script path to `/src/app/main.tsx`.

---

### Task 1: Domain foundation and baseline

**Files:**

- Create: `src/domain/types.ts`, `src/domain/environments.ts`, `src/domain/validate.ts`, `src/content/roles.ts`

**Interfaces:**

- Produces:
  - `type EnvironmentId = 'FLUTTER_APP' | 'REACT_PWA' | 'WEB_PUBLIC' | 'TRANSITION' | 'ADMIN_UI'`
  - `type RoleId = 'karaoke-owner' | 'blink-admin'`
  - `interface Screen` with the fields of today's `WireframeScreenSpec` minus `component`.
  - `interface Flow { id: string; title: string; role: RoleId; summary: string; actors: string[]; environments: EnvironmentId[]; screens: Screen[]; source: string }`
  - `interface Role { id: RoleId; label: string }`; `ROLES: Role[]` ordered `[{ id: 'karaoke-owner', label: 'Owner Karaoke' }, { id: 'blink-admin', label: 'Blink Admin' }]`
  - `type DeviceKind = 'mobile' | 'browser' | 'admin'`
  - `interface EnvironmentConfig { id: EnvironmentId; label: string; badgeVariant: 'env-flutter' | 'env-react' | 'env-public' | 'env-admin' | 'env-transition'; deviceKind: DeviceKind; simulatedUrl: (flow: Flow, screen: Screen) => string }`
  - `ENVIRONMENTS: Record<EnvironmentId, EnvironmentConfig>`
  - `interface ContentError { flowId: string; screenId?: string; message: string }`
  - `validateCatalog(flows: Flow[], roles: Role[]): ContentError[]`

- [ ] **Step 1: Capture the visual baseline.** Run `npm run dev -- --port 5199`. Save screenshots (light and dark, 1200 px and 375 px wide) to the session scratchpad of: first screen on load, one screen per environment, `PUB-01`, spec panel open, a search with results, the design system view. Record `npm run lint` output (two warnings). Stop the server.
- [ ] **Step 2: Write `types.ts`** with the interfaces above. `Screen` keeps `id, title, environment, actor, entryPoint, objective, visibleData, userInput?, primaryAction, secondaryActions?, nextScreen?, errorsOrOutcomes?, auditNote?`.
- [ ] **Step 3: Write `environments.ts`.** Labels with their emoji exactly as the viewer shows today (`📱 FLUTTER APP`, `🖥️ REACT PWA`, `🌐 WEB CÔNG KHAI`, `↗️ CHUYỂN TIẾP`, `🖥️ ADMIN UI`). `deviceKind`: ADMIN_UI → `admin`; WEB_PUBLIC and TRANSITION → `browser`; others → `mobile`. `simulatedUrl`: ADMIN_UI → `https://admin.blink.nexlink.vn/${flow.id}`; WEB_PUBLIC → `blink.nexlink.vn/invite/branch-karaoke#token-3days`; otherwise `blink.nexlink.vn/${flow.id}/${screen.id.toLowerCase()}`.
- [ ] **Step 4: Write `validate.ts`.** Pure, no `fs`. Errors for: empty catalog; duplicate flow id; unknown role; flow without screens; empty required string fields (`id`, `title`, `summary`, `source`, screen `id/title/actor/entryPoint/objective/primaryAction`) or empty `visibleData`; duplicate screen id in a flow; `nextScreen` naming a missing screen; any `→ <ID>` (regex `/→\s*([A-Z]{2,4}-\d{2})/g`) in `primaryAction` or `secondaryActions` naming a missing screen.
- [ ] **Step 5: Write `roles.ts`** exporting `ROLES`.
- [ ] **Step 6: Verify.** Run `npm run build` (passes). Run `node -e "import('./src/domain/validate.ts').then(m=>console.log(m.validateCatalog([],[])))"` and expect one error whose message contains `empty`.
- [ ] **Step 7: Commit** `refactor(domain): add flow types, role list, environment config and validator`.

### Task 2: Per-flow content, catalog and check script

**Files:**

- Create: `src/content/karaoke-owner/*.ts`, `src/content/blink-admin/*.ts`, `src/content/index.ts`, `scripts/check-content.ts`
- Modify: `package.json`; the type imports and category use in `src/components/navigation/Sidebar.tsx`, `src/components/inspector/ScreenSpecPanel.tsx`, `src/components/viewer/WireframeScreenViewer.tsx`, `src/context/WireframeContext.tsx`
- Delete: `src/data/wireframe-registry.ts`, `src/types/wireframe.ts`

**Interfaces:**

- Consumes: Task 1 types, `ROLES`, `validateCatalog`.
- Produces: `CATALOG: Flow[]` from `src/content/index.ts`, ordered by role order then the old registry order; script `npm run check:content`.

- [ ] **Step 1: Split the registry with a throwaway script** kept in the scratchpad, not in the repo. It imports the old `WIREFRAME_INITIATIVES`, writes one file per flow as `export const <camelCaseId>: Flow = <object>`, with `role` per the spec table (10 flows `karaoke-owner`, 5 `blink-admin`), `source` = `docs/wireframes/<role>/<flow-id>.md`, and `category`, `categoryLabel`, `folderPath`, `component` dropped. Format the files with `npx prettier --single-quote --write`.
- [ ] **Step 2: Write `src/content/index.ts`** importing the 15 flows and exporting `CATALOG: Flow[]` in the order: partner-registration, branch-creation, floors, room-management, manager-appointments, staff-onboarding, staff-management, role-permissions, staff-permissions, cashier-terminal-authentication, subscriptions, auth-admin-settings, auth-policy-rollout, app-release-notifications, admin-audit.
- [ ] **Step 3: Write `scripts/check-content.ts`.** Imports `CATALOG`, `ROLES`, `validateCatalog`; adds one error per flow whose `source` file does not exist (`node:fs`); prints `<flowId> [<screenId>]: <message>` per error and exits 1 if any, else prints `content ok: <n> flows, <m> screens`. Add `"check:content": "node scripts/check-content.ts"` to `package.json`.
- [ ] **Step 4: Run `npm run check:content`.** Fix each reported error in the content file and list every fix in the commit body. Expected final output: `content ok: 15 flows, <m> screens`.
- [ ] **Step 5: Switch consumers to the catalog.** `WireframeContext` reads `CATALOG`; type imports change to `Flow` and `Screen`; remove every use of `category`. Sidebar groups by `ROLES` in declared order, group title is the role label, items are the flows with that `role`; the open-group state keys on role id. Delete the old registry and old types file.
- [ ] **Step 6: Negative checks.** Temporarily change one `nextScreen` to a missing id, run `npm run check:content`, expect exit 1 naming that flow and screen; temporarily point one `source` to a missing file, expect exit 1; revert both.
- [ ] **Step 7: Verify.** `npm run build`, `npm run lint`, `npm run check:content` pass; in the browser the sidebar shows "Owner Karaoke" then "Blink Admin" and every flow is reachable.
- [ ] **Step 8: Commit** `refactor(content): split registry into per-flow files grouped by role`.

### Task 3: Move the design system to shared/ui

**Files:**

- Move: `src/design-system/` → `src/shared/ui/`; `src/assets/logo_image.png` → `src/shared/assets/logo_image.png`
- Modify: every import of `design-system` and of the logo; `index.html` is untouched

**Interfaces:**

- Produces: `src/shared/ui/index.ts` unchanged API (all current exports).

- [ ] **Step 1: `git mv` both folders.** Update all import paths (`.../design-system` → `.../shared/ui`, `.../assets/logo_image.png` → `.../shared/assets/logo_image.png`) and any `src/design-system/tokens.css` reference in `CLAUDE.md` is left for Task 7.
- [ ] **Step 2: Verify.** `grep -rn "design-system'" src` returns nothing outside `shared/ui` imports; `npm run build` and `npm run lint` pass; load the app once in light theme.
- [ ] **Step 3: Commit** `refactor: move design system to shared/ui`.

### Task 4: Move features into feature folders

**Files:**

- Move: `components/navigation/*` → `features/navigation/`; `components/viewer/*` → `features/viewer/`; `components/inspector/*` → `features/inspector/`; `components/showcase/*` → `features/design-system-view/`; `components/header/*` → `app/header/`; `layouts/WireframeLayout.*` → `app/`; `App.tsx, main.tsx, App.css, index.css` → `app/`; `context/WireframeContext.tsx` → `features/workspace/WireframeContext.tsx` (split in Task 5)
- Create: `features/navigation/index.ts`, `features/viewer/index.ts`, `features/inspector/index.ts`, `features/design-system-view/index.ts`, `features/workspace/index.ts`
- Modify: `index.html` script path to `/src/app/main.tsx`

**Interfaces:**

- Produces: `Sidebar` from `features/navigation`; `WireframeScreenViewer` from `features/viewer`; `ScreenSpecPanel` from `features/inspector`; `DesignSystemShowcase` from `features/design-system-view`; `WireframeProvider`, `useWireframe` from `features/workspace`. `app/` imports features only through these index files.

- [ ] **Step 1: `git mv` all files above**, create the `index.ts` re-exports, fix imports (relative paths and CSS imports), and point `index.html` at `/src/app/main.tsx`.
- [ ] **Step 2: Verify.** `npm run build`, `npm run lint`, `npm run check:content` pass; `npm run dev` loads; click through a flow in each role and open the design system view.
- [ ] **Step 3: Commit** `refactor: organise UI into feature folders`.

### Task 5: Split state into selection and workspace providers

**Files:**

- Create: `src/features/workspace/SelectionProvider.tsx`, `src/features/workspace/WorkspaceProvider.tsx`
- Modify: `features/workspace/index.ts`, `features/navigation/Sidebar.tsx`, `features/viewer/WireframeScreenViewer.tsx`, `features/inspector/ScreenSpecPanel.tsx`, `app/App.tsx`, `app/WireframeLayout.tsx`, `app/header/AppHeader.tsx`
- Delete: `features/workspace/WireframeContext.tsx`

**Interfaces:**

- Produces:
  - `SelectionProvider` and `useSelection(): { flows: Flow[]; activeFlow: Flow | undefined; activeScreen: Screen | undefined; selectFlow(flowId: string): void; selectScreen(screenId: string): void; deviceType: DeviceType; setDeviceType(device: DeviceType): void; isAutoDevice: boolean; setIsAutoDevice(auto: boolean): void }`. Initial selection is the first screen of the first catalog flow; `activeFlow` and `activeScreen` are `undefined` only for an empty catalog. Auto device uses `ENVIRONMENTS[env].deviceKind`.
  - `WorkspaceProvider` and `useWorkspace(): { theme: 'light' | 'dark'; toggleTheme(): void; isSidebarOpen: boolean; setIsSidebarOpen(open: boolean): void; toggleSidebar(): void; isSpecOpen: boolean; setIsSpecOpen(open: boolean): void; toggleSpec(): void; viewMode: 'wireframes' | 'design-system'; setViewMode(mode: 'wireframes' | 'design-system'): void }`. Keep the responsive defaults and resize handling (close sidebar under 1024 px, spec under 1280 px), and the `data-theme` attribute sync. `selectScreen` also closes the sidebar under 1024 px by calling the workspace setter, so `SelectionProvider` renders inside `WorkspaceProvider`.
  - Search query is local state in `Sidebar`; remove it from shared state.

- [ ] **Step 1: Implement the two providers and hooks**, copying the existing behaviour from `WireframeContext.tsx` with the interfaces above; remove the hard coded initial ids.
- [ ] **Step 1b: Log content errors in development.** In `SelectionProvider`, when `import.meta.env.DEV` is true, run `validateCatalog(CATALOG, ROLES)` once on mount and `console.error` one line per error. The production build is not blocked.
- [ ] **Step 2: Update consumers** to `useSelection` and `useWorkspace`. When `activeScreen` is `undefined`, the viewer renders a message "Chưa có wireframe nào trong danh mục" and the inspector and sidebar render nothing that needs a screen.
- [ ] **Step 3: Delete `WireframeContext.tsx`** and update `app/App.tsx` to nest `WorkspaceProvider` > `SelectionProvider`.
- [ ] **Step 4: Verify.** Build, lint, check:content pass. In the browser: first load opens the first screen of the first flow; resize the window across 1280 and 1024 px and see panels close; theme toggle works; search for text that matches nothing shows no groups, clearing it restores them; selecting a screen at 375 px width closes the sidebar. Temporarily empty `CATALOG` and confirm the empty message shows without a crash; revert.
- [ ] **Step 5: Commit** `refactor(workspace): split selection and workspace state`.

### Task 6: Environment config and custom mockups

**Files:**

- Create: `src/features/viewer/custom-mockups.tsx`
- Modify: `features/viewer/WireframeScreenViewer.tsx`, `features/inspector/ScreenSpecPanel.tsx`

**Interfaces:**

- Consumes: `ENVIRONMENTS`, `Screen`, `Flow`.
- Produces: `CUSTOM_MOCKUPS: Record<string, () => React.ReactElement>` keyed by screen id, containing `PUB-01`.

- [ ] **Step 1: Replace the badge switch statements** in the viewer and the inspector with a lookup in `ENVIRONMENTS[screen.environment]` (`<Badge variant={cfg.badgeVariant} withDot>{cfg.label}</Badge>`). Replace the viewer's simulated-URL function with `cfg.simulatedUrl(flow, screen)`.
- [ ] **Step 2: Move the `PUB-01` block** out of the viewer into `custom-mockups.tsx`. Replace its hard coded `#d81467` gradient with `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-active) 100%)`. The viewer uses `CUSTOM_MOCKUPS[screen.id]?.()` first and falls back to the generic mockup. The viewer has no `id === 'PUB-01'` check left (`grep -n "PUB-01" src/features/viewer/WireframeScreenViewer.tsx` is empty).
- [ ] **Step 3: Verify.** Build, lint, check:content pass. Compare with the baseline: `PUB-01` in light and dark (icon tile readable in both), one screen per environment (badge, frame and address bar unchanged), the spec panel badge.
- [ ] **Step 4: Commit** `refactor(viewer): read environment config and custom mockups from data`.

### Task 7: Documentation and final verification

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Update `CLAUDE.md`.** Replace the Architecture, "Adding or changing a wireframe" and "Known gaps" sections to match the new structure: file per flow under `content/<role>/`, `check:content`, `source` field, role grouping, providers in `features/workspace`, custom mockups map, environment config. Remove the gaps that are now fixed (hard coded first selection, outdated `folderPath`); keep the gap that only 15 of about 40 documents are in the catalog.
- [ ] **Step 2: Final verification.** `npm run build`, `npm run lint` (only the two baseline warnings), `npm run check:content` pass. Repeat every baseline screenshot comparison from Task 1 in light and dark at 1200 px and 375 px. The only differences allowed are the sidebar group titles and order.
- [ ] **Step 3: Confirm structure.** `grep -rn "from '../../data\|from '../types/wireframe\|context/WireframeContext" src` returns nothing; `src/components`, `src/layouts`, `src/context`, `src/data`, `src/types` no longer exist.
- [ ] **Step 4: Commit** `docs: describe the feature-based structure in CLAUDE.md`.
