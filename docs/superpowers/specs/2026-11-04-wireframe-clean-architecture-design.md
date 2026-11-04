# Wireframe app — clean architecture restructure

**Status:** design approved in conversation on 2026-11-04; written spec awaiting review.
**Scope:** pure code restructure of this repository. No new product features.

## Goal

Reorganise the wireframe viewer so that:

- wireframe content is structured data, split per flow and grouped by role, validated before
  it reaches the UI;
- the UI is organised by feature, with no feature reading another feature's internals;
- adding or editing a flow touches exactly one data file;
- what users see is unchanged, except for one approved difference (sidebar grouping).

## Current state (evidence)

- `src/data/wireframe-registry.ts` is one 1176-line file holding all 15 flows, hand written,
  with no validation (duplicate screen ids or a wrong `nextScreen` fail silently).
- `WireframeContext` mixes selection (initiative, screen, device), theme, responsive panel
  layout, search query and view mode. The first selection is hard coded
  (`karaoke-manager-appointments`, `OWN-01`).
- `WireframeScreenViewer` (391 lines) builds a generic mockup from the screen fields, has a
  special case for screen id `PUB-01` and a hard coded `#d81467`. The mapping from
  environment to badge, device frame and fake URL is repeated inside viewer code.
- The optional `component` field of `WireframeScreenSpec` is declared but never used.
- `docs/wireframes/` holds ~40 documents copied from the backend; nothing reads them.
  Registry `folderPath` values still point to old backend paths.

## Decisions

| #   | Decision                                                                                                          | Reason                                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| D1  | Source of content is structured TypeScript data, one file per flow, grouped by role. Markdown stays as reference. | Fastest, lowest risk; a generator from markdown can come later.                                       |
| D2  | Code is organised by feature (not by technical layer, not full Feature-Sliced Design).                            | Isolates change; FSD is too heavy for a viewer.                                                       |
| D3  | Sidebar groups by role instead of `category`.                                                                     | Matches `docs/wireframes/<role>/` and scales to the remaining roles. This is the only visible change. |
| D4  | Remove the unused `component` field; rename `folderPath` to `source`.                                             | Dead field; `source` must point to a real document.                                                   |
| D5  | Add `npm run check:content`.                                                                                      | Catch content errors before runtime.                                                                  |
| D6  | No router, no new dependency, no test framework.                                                                  | Out of scope; YAGNI.                                                                                  |

## Target structure

```text
src/
├── app/                        # App.tsx, main.tsx, providers, global CSS, top-level layout
├── content/                    # wireframe data
│   ├── karaoke-owner/<flow>.ts # 10 flows
│   ├── blink-admin/<flow>.ts   # 5 flows
│   ├── roles.ts                # role id, label, order
│   └── index.ts                # builds the catalog from all flow files
├── domain/
│   ├── types.ts                # Flow, Screen, Environment, Role
│   ├── environments.ts         # one config per environment (see below)
│   └── validate.ts             # catalog validation, used by check:content and dev startup
├── features/
│   ├── navigation/             # sidebar, search
│   ├── viewer/                 # screen rendering, device frame wiring, custom mockups
│   ├── inspector/              # screen spec panel
│   └── design-system-view/     # design system showcase
└── shared/
    ├── ui/                     # the current design-system folder, moved unchanged
    └── assets/
scripts/
└── check-content.ts            # run with `node scripts/check-content.ts`
```

Dependency direction: `app` → `features` → `domain` and `shared`; `content` depends only on
`domain` types; `features` read content only through the catalog exposed by `content/index.ts`.
`shared/ui` imports nothing from the rest of `src`.

## Data model

A flow keeps the fields it has today (id, title, summary, actors, environments, screens)
with these changes:

- `role` (one of the role ids) replaces `category` and `categoryLabel`. Labels and order
  come from `content/roles.ts`.
- `source` (path of the matching document under `docs/wireframes/`) replaces `folderPath`.
- Screens keep their fields; the unused `component` field is removed.

The 15 existing flows map to roles as follows.

- `karaoke-owner`: karaoke-partner-registration, karaoke-branch-creation, karaoke-floors,
  karaoke-room-management, karaoke-manager-appointments, karaoke-staff-onboarding,
  karaoke-staff-management, karaoke-role-permissions, karaoke-staff-permissions,
  cashier-terminal-authentication.
- `blink-admin`: subscriptions, auth-admin-settings, auth-policy-rollout,
  app-release-notifications, admin-audit.

This matches where the backend keeps the corresponding wireframe documents.

## Content validation

`domain/validate.ts` checks the whole catalog and returns a list of errors:

- flow ids unique; screen ids unique inside a flow;
- required fields present and non-empty;
- every `nextScreen` and every `→ <ID>` written in `primaryAction` or `secondaryActions`
  refers to a screen of the same flow;
- `source` points to an existing file under `docs/wireframes/`;
- the role of a flow exists in `roles.ts`.

`scripts/check-content.ts` imports the catalog, runs the validation, prints one line per error
(flow file, screen id, message) and exits non-zero on failure. It is run with
`node scripts/check-content.ts` (Node strips types natively; the code already avoids enums and
parameter properties). The `check:content` npm script wraps it. In development the app also
logs validation errors to the console at startup. The production build is not blocked by it.

Existing content may already contain such errors. Fixing them is part of the work and each fix
is reported, because correcting a wrong id changes content.

## State

`WireframeContext` is split into two providers.

- **Selection:** active flow, active screen, device mode (auto or manual). Initial selection is
  the first screen of the first flow in the catalog; there is no hard coded id. Selecting a flow
  selects its first screen.
- **Workspace (UI):** theme, sidebar and inspector open state with the responsive defaults that
  exist today (1024 and 1280), and view mode.

The search query becomes local state of the navigation feature.

## Viewer

- `domain/environments.ts` holds, for each environment, the badge label, badge variant, device
  frame type and a function that builds the simulated address. The viewer and the inspector read it; the duplicated badge switch statements
  (one in each) are removed.
- The generic mockup stays the default renderer.
- A map of custom mockups, keyed by screen id, lives in `features/viewer`. `PUB-01` moves
  there and its hard coded gradient colour is replaced by tokens. The viewer asks the map first
  and falls back to the generic renderer.

## Sidebar

Groups come from `roles.ts` in its declared order (Owner Karaoke first, Blink Admin second).
Within a group, flows keep today's order. Searching filters flows and screens as it does now.

## Out of scope

- Loading or parsing the markdown documents; wiring the other ~25 documents into the catalog.
- URL routing or shareable links.
- A test framework or snapshot tests.
- Visual redesign. The only visible change is the sidebar grouping.

## Verification

Run after each stage and at the end:

1. `npm run build` passes (type check included).
2. `npm run lint` reports no new warnings beyond the two that already exist.
3. `npm run check:content` passes.
4. In the browser, in light and dark theme, compare before and after for: the first screen on
   load, one screen of each environment (Flutter app, React PWA, web public, transition, admin),
   `PUB-01`, the spec panel, search, and the design system view. Sizes: desktop and 375 px wide.

## Migration order

1. Create `domain/` (types, environments, validation) and `content/roles.ts`.
2. Split the registry into per-flow files under `content/`, update `role` and `source`, build the
   catalog; add `check:content` and fix reported content errors.
3. Move the design system to `shared/ui` and fix imports.
4. Move features to `features/*`, split the context, wire the catalog and environment config.
5. Move `PUB-01` into the custom mockups map; remove the dead field and the old registry.
6. Move app entry to `app/`, update `CLAUDE.md`, run the full verification.

Each step leaves the build passing.

## Risks

- Moving files breaks imports silently in CSS. Mitigation: build and the browser comparison
  after every step.
- Validation may report errors in existing content. Mitigation: fix and list each one rather
  than relaxing the rule.
- Sidebar grouping by role changes what users see. Mitigation: it is an approved decision (D3)
  and the only one.
