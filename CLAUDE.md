# CLAUDE.md

Guidance for working in this repository.

## What this repo is

An interactive viewer for the Nexlink Blink wireframes, built with React 19, TypeScript and
Vite. Designers and developers browse flows (initiatives) and their screens in a device
frame, with a spec panel beside each screen. It is a front-end only app: no backend calls,
no router, no tests.

The wireframe content has two forms that are **not connected yet**:

- `src/data/wireframe-registry.ts` is the data the app renders (hand-written TypeScript).
- `docs/wireframes/<role>/*.md` are the handoff documents copied from the backend
  repository (`nexlink-blink-backend`, `docs/product/roles/<role>/wireframes`). They are
  reference material only; nothing imports them.

This repo is one of five sibling repositories under the Nexlink workspace. The backend
repository is the source of truth for business rules and wireframe documents. Reading the
siblings is fine; do not edit them from here.

## Commands

```bash
npm install        # install dependencies (lockfile: package-lock.json)
npm run dev        # Vite dev server with HMR
npm run build      # tsc -b && vite build, output in dist/
npm run lint       # oxlint (config in .oxlintrc.json)
npm run preview    # serve the production build
```

There is no test script. Verify a change with `npm run build` (type check included) and
`npm run lint`, then look at it in `npm run dev`. `npm run lint` currently reports two
warnings that predate any change (`react/only-export-components` in `WireframeContext.tsx`
and `react/set-state-in-effect` in `Sidebar.tsx`); do not treat them as regressions.

TypeScript is strict about unused code (`noUnusedLocals`, `noUnusedParameters`),
`verbatimModuleSyntax` (use `import type` for types) and `erasableSyntaxOnly` (no enums or
parameter properties). `dist/` and `node_modules/` are git-ignored.

## Architecture

```text
src/
├── main.tsx, App.tsx          # entry; App switches between wireframes and design-system view
├── context/WireframeContext   # all app state (see below)
├── layouts/WireframeLayout    # header + sidebar + screen viewer + spec panel
├── components/
│   ├── header/                # AppHeader: theme, device, view mode, sidebar/spec toggles
│   ├── navigation/            # Sidebar: grouped initiatives, screen list, search
│   ├── viewer/                # WireframeScreenViewer: renders the active screen
│   ├── inspector/             # ScreenSpecPanel: fields of the active screen
│   └── showcase/              # DesignSystemShowcase: demo of the design system
├── design-system/             # tokens.css and one folder per component, exported by index.ts
├── data/wireframe-registry.ts # WIREFRAME_INITIATIVES: the data being shown
└── types/wireframe.ts         # WireframeInitiative, WireframeScreenSpec and related types
```

**State** lives entirely in `WireframeProvider`: selected initiative and screen, device
type (with an auto mode that follows window width), light/dark theme, search query,
sidebar and spec panel visibility, and view mode (`wireframes` or `design-system`).
Components read it through `useWireframe()`. Sidebar and spec panel open or close by
default according to window width (breakpoints 1024 and 1280).

**Rendering.** `WireframeScreenViewer` builds the screen from the data fields of the active
`WireframeScreenSpec` (`visibleData`, `userInput`, `primaryAction`, `nextScreen`, and so
on). `environment` decides the frame: `FLUTTER_APP`, `REACT_PWA`, `WEB_PUBLIC`,
`TRANSITION` or `ADMIN_UI`. `ADMIN_UI` renders a desktop layout; the others render inside
the device frame. The optional `component` field on a spec is declared in the type
but nothing uses it, and the `PUB-01` screen id has a special case in the viewer. Check
the viewer before relying on either.

**Navigation.** Initiatives are grouped in the sidebar by `category`: `business-ops`,
`human-resources`, `admin-platform`. Adding a new category value means changing the type
in `types/wireframe.ts` and the group list in `Sidebar.tsx`.

## Adding or changing a wireframe

1. Add or edit an object in `WIREFRAME_INITIATIVES` in `src/data/wireframe-registry.ts`.
   Fill every required field of `WireframeInitiative` and of each screen
   (`id`, `title`, `environment`, `actor`, `entryPoint`, `objective`, `visibleData`,
   `primaryAction`).
2. Use screen ids that are unique inside the initiative and keep the prefix style already
   used there (for example `REG-01`, `OWN-01`, `PUB-01`). `nextScreen` and the arrow
   written in `primaryAction` must point to an existing screen id.
3. Write the descriptive text in Vietnamese, in user-facing language: no API routes,
   database names or raw backend status names (this matches the backend wireframe rules).
4. Take content from the matching document in `docs/wireframes/<role>/` or from the
   backend repository, not from memory.

Reuse the design-system components and the CSS variables in
`src/design-system/tokens.css` instead of adding new colours or one-off styles. Styles are plain CSS files next to each component, with BEM-like class
names such as `wireframe-layout__body`.

## Design system

Source: `src/design-system/`. Each component is a folder with a `.tsx` and a `.css` file
and is exported from `index.ts`. The "Design System" view of the app
(`DesignSystemShowcase.tsx`) demonstrates every component; add a demo there when you add a
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

- Only 15 initiatives are in the registry, while `docs/wireframes/` holds about 40
  documents. Most roles (staff, cashier, collaborator, restaurant, common) are not in the
  app yet.
- The `folderPath` field of the existing registry entries points to old backend paths
  such as `docs/initiatives/<topic>/wireframe.md`. Those files moved to
  `docs/product/roles/<role>/wireframes/<topic>.md` in the backend repository. Update
  `folderPath` when you touch an entry.
- `WireframeContext` hard-codes the first selection (`karaoke-manager-appointments`,
  `OWN-01`). If that initiative or screen is renamed or removed, the app starts on a
  missing item.

## Git

- Work branch is `dev`; the remote is `origin` (`rayzAqua/blink-wireframe`). `main` only holds the
  initial template commit.
- Commit messages follow Conventional Commits, as in the existing history:
  `fix(sidebar): ...`, `feat(branding): ...`, `refactor(sidebar): ...`.
- Do not commit, push, create branches or rewrite history unless the user asks.
- Inspect `git status` before editing and keep unrelated or untracked work untouched.
