# CLAUDE.md

Guidance for working in this repository.

## What this repo is

An interactive viewer for the Nexlink Blink wireframes, built with React 19, TypeScript and
Vite. Designers and developers browse flows (initiatives) and their screens in a device
frame, with a spec panel beside each screen. It is a front-end only app: no backend calls,
no router, no tests.

The wireframe content has two forms that are **not connected yet**:

- `src/content/` is the data the app renders: one TypeScript file per flow, grouped by role.
- `docs/wireframes/<role>/*.md` are the handoff documents copied from the backend
  repository (`nexlink-blink-backend`, `docs/product/roles/<role>/wireframes`). They are
  reference material only; nothing imports them. Each flow's `source` field names its
  document.

This repo is one of five sibling repositories under the Nexlink workspace. The backend
repository is the source of truth for business rules and wireframe documents. Reading the
siblings is fine; do not edit them from here.

## Commands

```bash
npm install        # install dependencies (lockfile: package-lock.json)
npm run dev        # Vite dev server with HMR
npm run build      # tsc -b && vite build, output in dist/
npm run lint       # oxlint (config in .oxlintrc.json)
npm run check:content  # validate src/content (ids, links between screens, source files)
npm run preview    # serve the production build
```

There is no test script. Verify a change with `npm run build` (type check included),
`npm run lint` and `npm run check:content`, then look at it in `npm run dev`. `npm run lint`
currently reports one warning that predates any change (`react/set-state-in-effect` in
`Sidebar.tsx`); do not treat it as a regression.

TypeScript is strict about unused code (`noUnusedLocals`, `noUnusedParameters`),
`verbatimModuleSyntax` (use `import type` for types) and `erasableSyntaxOnly` (no enums or
parameter properties). `dist/` and `node_modules/` are git-ignored.

## Architecture

```text
src/
├── app/                   # entry (main.tsx, App.tsx), global CSS, WireframeLayout, header/
├── content/               # wireframe data
│   ├── roles.ts           # role ids, labels and sidebar order
│   ├── index.ts           # CATALOG: every flow, in sidebar order
│   ├── karaoke-owner/     # one <flow>.ts per flow
│   └── blink-admin/
├── domain/
│   ├── types.ts           # Flow, Screen, Role, EnvironmentId
│   ├── environments.ts    # ENVIRONMENTS: badge, label, device frame and address per environment
│   └── validate.ts        # validateCatalog(): pure content checks
├── features/
│   ├── workspace/         # SelectionProvider (flow, screen, device), WorkspaceProvider (theme,
│   │                      #   sidebar, inspector, view mode) and their hooks
│   ├── navigation/        # Sidebar: roles, flows, screens, search
│   ├── viewer/            # WireframeScreenViewer; custom-mockups/ for hand-built screens
│   ├── inspector/         # ScreenSpecPanel
│   └── design-system-view/# DesignSystemShowcase
└── shared/
    ├── ui/                # design system: tokens.css and one folder per component
    └── assets/
scripts/check-content.ts   # npm run check:content
```

Dependency direction: `app` → `features` → `domain` and `shared`. `content` imports only
`domain` types. A feature imports another feature only through that feature's `index.ts`.
`shared/ui` imports nothing from the rest of `src`. Files in `domain/`, `content/` and
`scripts/` use explicit `.ts` extensions in relative imports so Node can run them directly.

**State.** `WorkspaceProvider` holds theme, sidebar and inspector visibility (open by default
from 1024 and 1280 px, closed when the window narrows) and the view mode. `SelectionProvider`
holds the active flow, screen and device, starting on the first screen of the first flow in the
catalog. If the catalog is empty it renders a message instead of its children. Components read
state with `useSelection()` and `useWorkspace()`. `selectScreen` ignores ids that are not a
screen of the active flow, so a free-text `nextScreen` does nothing when clicked.

**Rendering.** `WireframeScreenViewer` builds a generic mockup from the fields of the active
`Screen` (`visibleData`, `userInput`, `primaryAction`, `nextScreen`, and so on). A screen with an
entry in `CUSTOM_MOCKUPS` (`features/viewer/custom-mockups`, keyed by screen id) renders that
component instead. `domain/environments.ts` decides the badge, the device frame
(`mobile`, `browser`, `admin`) and the simulated address for each environment.

**Navigation.** The sidebar groups flows by `role`, in the order of `content/roles.ts`.
Adding a role means adding its id to `RoleId` in `domain/types.ts`, an entry in `ROLES`, and
an icon in `ROLE_ICONS` in `Sidebar.tsx`.

## Adding or changing a wireframe

1. Add or edit `src/content/<role>/<flow-id>.ts`; it exports a `Flow`. New flows are also
   imported and listed in `src/content/index.ts` (the order there is the sidebar order).
   Fill every required field of the flow and of each screen (`id`, `title`, `environment`,
   `actor`, `entryPoint`, `objective`, `visibleData`, `primaryAction`). `source` is the path of
   the matching document under `docs/wireframes/`.
2. Use screen ids that are unique inside the flow and keep the prefix style already used
   there (for example `REG-01`, `OWN-01`, `PUB-01`). `nextScreen` is either a screen id of the
   same flow or free text naming a destination outside the flow (for example
   `Trang chủ cơ sở`); a value shaped like an id must exist. An arrow written in
   `primaryAction` or `secondaryActions` (`→ PRM-03`) must point to an existing screen.
3. Write the descriptive text in Vietnamese, in user-facing language: no API routes,
   database names or raw backend status names (this matches the backend wireframe rules).
4. Take content from the matching document in `docs/wireframes/<role>/` or from the
   backend repository, not from memory.
5. Run `npm run check:content`. It checks the rules above and that every `source` file exists,
   prints one line per error (flow, screen id, message) and exits non-zero on failure. In
   development the same errors are logged to the browser console at startup.

Reuse the design-system components and the CSS variables in
`src/shared/ui/tokens.css` instead of adding new colours or one-off styles. Styles are plain CSS
files next to each component, with BEM-like class names such as `wireframe-layout__body`.

## Design system

Source: `src/shared/ui/`. Each component is a folder with a `.tsx` and a `.css` file
and is exported from `index.ts`. The "Design System" view of the app
(`features/design-system-view/DesignSystemShowcase.tsx`) demonstrates every component; add a demo there when you add a
component.

- **Primary colour is slate `#334155`** (neutral on purpose, so the status and environment
  colours carry the meaning). In dark mode the primary inverts to a light fill
  (`[data-theme='dark']` in `tokens.css`). Never write a primary colour as a hex or `rgba`
  value in a component; use `--color-primary*` tokens, `--color-primary-glow`,
  `--shadow-primary` or `--focus-ring`. The Blink pink `#EF227B` exists only in the logo
  image and its shadow in `AppHeader.css`.
- Colour families already mean something: sky = info and Flutter, violet = React PWA,
  emerald = success and public web, indigo = Admin UI, orange = transition,
  amber = warning, red = danger. Do not reuse them for decoration.
- Components: Button, Badge, Card, Input (with Textarea and Select), Modal,
  SegmentedControl, DeviceFrame, ListRow and ListGroup, Alert, Toast, Avatar, BottomSheet,
  Switch, Checkbox, Radio and RadioGroup, Tabs, Stepper, Progress, Skeleton, EmptyState,
  Table.
- `Toast` and `BottomSheet` take an `inline` prop that positions them inside the nearest
  positioned parent. Use it for anything shown inside a device frame; without it they cover
  the whole window.
- Follow the existing component style: props extend the native element where sensible,
  `className` is always accepted, generic components (`Tabs`, `RadioGroup`, `Table`,
  `SegmentedControl`) are typed with a generic value.

## Known gaps

- Only 15 flows are in the catalog, while `docs/wireframes/` holds about 40 documents. Most
  roles (staff, cashier, collaborator, restaurant, common) are not in the app yet.
- Some screens named in the documents are missing from the data: `ONB-02` (staff onboarding),
  `PRM-07` (staff permissions), `REL-02` and `MNT-02` (app releases). The flows that point to
  them say so in their action text instead of linking.
- Only `PUB-01` has a hand-built mockup; every other screen uses the generic one.

## Git

- Work branch is `dev`; the remote is `origin` (`rayzAqua/blink-wireframe`). `main` only holds the
  initial template commit.
- Commit messages follow Conventional Commits, as in the existing history:
  `fix(sidebar): ...`, `feat(branding): ...`, `refactor(sidebar): ...`.
- Do not commit, push, create branches or rewrite history unless the user asks.
- Inspect `git status` before editing and keep unrelated or untracked work untouched.
