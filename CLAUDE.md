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
│   ├── roles.ts, sections.ts  # role and sidebar section ids, labels, order
│   ├── index.ts           # CATALOG: every flow, in sidebar order
│   ├── helpers.ts         # inApp(), bar(), buttons() for writing layouts
│   ├── karaoke-owner/     # one <flow>.ts per flow; plan-catalog.ts holds the plan figures
│   └── blink-admin/
├── domain/
│   ├── types.ts           # Flow, Screen, Block, Role, EnvironmentId
│   ├── icons.ts           # ICON_NAMES: icons a layout block may use
│   ├── environments.ts    # ENVIRONMENTS: badge, label, device frame, address, access per environment
│   └── validate.ts        # validateCatalog(): pure content checks
├── features/
│   ├── workspace/         # SelectionProvider (flow, screen, device), WorkspaceProvider (theme,
│   │                      #   sidebar, inspector, view mode) and their hooks
│   ├── navigation/        # Sidebar: roles, flows, screens, search
│   ├── viewer/            # WireframeScreenViewer; blocks/ draws layouts; custom-mockups/ for
│   │                      #   hand-built screens
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

**Rendering.** `WireframeScreenViewer` picks, in this order: the screen's `layout` (drawn by
`features/viewer/blocks/BlocksRenderer`), an entry in `CUSTOM_MOCKUPS`
(`features/viewer/custom-mockups`, keyed by screen id), or the generic mockup built from the text
fields (`visibleData`, `userInput`, `primaryAction`, ...). Owner flows use layouts; other roles
use the generic mockup. `domain/environments.ts` decides the badge, the device frame
(`mobile`, `browser`, `admin`), the simulated address and the access kind of each environment.

**Layouts and blocks.** A layout is a list of blocks (`Block` in `domain/types.ts`): `appBar`,
`hero`, `profile` (avatar and name of a person, tappable), `heading`, `text`, `keyValue`, `listGroup`, `field`, `tabs`, `stepper`, `progress`,
`cardList`, `table`, `alert`, `empty`, `skeleton`, `actions`, and the overlays `bottomSheet`,
`modal`, `toast` (drawn open, inside the device frame). Tappable blocks take `goto`: a screen id of
the same flow, or `flow-id/screen-id` for another flow. Icons are names from `ICON_NAMES`;
`blocks/icons.ts` maps each to a lucide icon (a missing mapping is a type error). To add an icon,
add the name to `ICON_NAMES` and the mapping. To add a block type, extend `Block`, `validate.ts`
(`BLOCK_TYPES`, `blockRefs`) and `BlockView.tsx`.

**Public link versus app.** Every screen shows whether it is a public link page or an in-app
screen. It is derived from `environment`: `WEB_PUBLIC` is a public link, `TRANSITION` is the step
from a link into the app, everything else is in the app. The sidebar marks public and transition
screens with an icon and counts public screens per flow; the inspector has a "Truy cập" row. The
validator rejects a public screen that leads (`nextScreen`, `goto`) straight to an in-app screen:
the step must go through a `TRANSITION` screen.

**Navigation.** The sidebar groups flows by `role`, in the order of `content/roles.ts`, and
inside a role by `section` (`content/sections.ts`). Adding a role means adding its id to `RoleId`
in `domain/types.ts`, an entry in `ROLES`, and an icon in `ROLE_ICONS` in `Sidebar.tsx`. Adding a
section means adding its id to `SectionId` and an entry in `SECTIONS`.

## Adding or changing a wireframe

1. Add or edit `src/content/<role>/<flow-id>.ts`; it exports a `Flow` with `role`, optional
   `section` and `source` (the matching document under `docs/wireframes/`). New flows are also
   imported and listed in `src/content/index.ts`; the order there is the sidebar order.
   Each screen needs `id`, `title`, `environment`, `actor`, `entryPoint`, `objective`,
   `visibleData`, `primaryAction`; add `layout` to draw it as a wireframe (use `helpers.ts`).
2. Use screen ids that are unique inside the flow and keep the prefix style already used
   there (for example `REG-01`, `OWN-01`, `PUB-01`). `nextScreen` is a screen id, a
   `flow-id/screen-id`, or free text naming a destination outside the flow (for example
   `Trang chủ cơ sở`); every id-shaped part must exist. An arrow written in `primaryAction` or
   `secondaryActions` (`→ PRM-03`) must point to a screen of the same flow; write cross-flow
   hints without an arrow.
3. Set `environment` to say where the screen runs: `FLUTTER_APP` or `REACT_PWA` (in the app),
   `WEB_PUBLIC` (a page opened from a link before login) or `TRANSITION` (link into the app).
4. Write the descriptive text in Vietnamese, in user-facing language: no API routes,
   database names or raw backend status names (this matches the backend wireframe rules).
5. Take content from the matching document in `docs/wireframes/<role>/` or from the
   backend repository, not from memory. Plan names, prices and limits come from
   `content/karaoke-owner/plan-catalog.ts`.
6. Run `npm run check:content`. It checks the rules above, block types, icon names, `goto`
   targets, the public-link rule and that every `source` file exists, prints one line per error
   (flow, screen id, message) and exits non-zero on failure. In development the same errors are
   logged to the browser console at startup.

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

- Only the Owner Karaoke flows (15 flows, with the Admin ones) are drawn as layouts and
  cover their documents. The other roles (staff, cashier, collaborator, restaurant, common) are not
  in the app yet; the Blink Admin flows still use the generic mockup.
- The three Admin screens of `subscriptions-owner-management` (`ADM-01` to `ADM-03`) use the
  generic admin mockup, not layouts.
- `karaoke-role-permissions.md` and `karaoke-staff-permissions.md` still describe an Owner option to
  lock a blocked permission. The business rules no longer have it, so the wireframes do not draw it;
  update those documents in the backend repository.
- `account-home.md` in `docs/wireframes/` does not describe the Owner account card (avatar and full
  name at the top of the Account screen, opening the account update screen `ACC-12`). The wireframe
  has it; update the document in the backend repository.
- `karaoke-partner-registration.md` in `docs/wireframes/` still lists six steps with a separate
  confirmation. The wireframe has three steps (plan, information and images, floors and rooms) and
  creates the facility when the last step is submitted; update the document in the backend repository.
- `karaoke-branch-creation.md` in `docs/wireframes/` still lists a separate confirmation and keeps
  images with floors and rooms. The wireframe has three steps (information and images, plan, floors
  and rooms) and creates the branch when the last step is submitted; update the document in the
  backend repository.
- The Account screen links to screens `ACC-17` to `ACC-28` (collaborator invites, partner restaurants,
  customer contacts, notifications, login methods). Backend `account-home.md` does not describe them yet.
- Some state and error screens (for example `ACC-06`, `ROOM-06`) are reached by a condition, not by a
  link, so they have no incoming `goto`.
- `CUSTOM_MOCKUPS` is empty; no screen needs a hand-built mockup now.

## Git

- Work branch is `dev`; the remote is `origin` (`rayzAqua/blink-wireframe`). `main` only holds the
  initial template commit.
- Commit messages follow Conventional Commits, as in the existing history:
  `fix(sidebar): ...`, `feat(branding): ...`, `refactor(sidebar): ...`.
- Do not commit, push, create branches or rewrite history unless the user asks.
- Inspect `git status` before editing and keep unrelated or untracked work untouched.
