# Owner Layout Blocks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render every Owner Karaoke screen as a real wireframe built from design-system blocks, from the 15 Owner documents, and show for every screen whether it is a public link page or an in-app screen.

**Architecture:** Screens gain an optional `layout: Block[]` drawn by one `BlocksRenderer` that uses the design-system components. `domain/environments.ts` derives an `access` value (`public-link`, `transition`, `app`) that the sidebar, viewer and inspector show and that the validator enforces. Owner flows are rebuilt one to one with the documents and grouped into sidebar sections.

**Tech Stack:** React 19, TypeScript 6, Vite 8, lucide-react (already installed), oxlint, Node 26 for `check:content`. No new dependency, no test framework.

**Spec:** `docs/superpowers/specs/2026-11-04-owner-layout-blocks-design.md` (builds on `2026-11-04-wireframe-clean-architecture-design.md`)

## Global Constraints

- Owner Karaoke role only; other roles keep the generic mockup and must render exactly as today.
- No new dependency. Icons come only from the allow-list `ICON_NAMES` in `src/domain/icons.ts`, mapped to `lucide-react` in `src/features/viewer/blocks/icons.ts`.
- Screen text is Vietnamese, user-facing: no API routes, database names or raw backend status names.
- Plans, prices, staff limits and the yearly and monthly payment options on any screen come from the spec section "Plan catalog used by the wireframes", not from the documents or from memory. The yearly price is the Admin-set discount (currently 50%) applied to the monthly price; Owner screens display it and never edit it. Where a document disagrees with these figures, the spec wins and the difference goes in the final report.
- Follow the document of each flow (`docs/wireframes/karaoke-owner/<flow-id>.md`); never invent behaviour. Where a document is unclear, follow it literally and list the question for the final report. Do not edit documents under `docs/wireframes/`.
- Files under `src/domain/`, `src/content/` and `scripts/` use explicit `.ts` extensions in relative imports and `import type` for types (Node runs them directly). No enums, no parameter properties; unused locals and parameters are errors.
- Dependency direction and feature boundaries as in `CLAUDE.md`: `content` imports only `domain`; features reach each other only through `index.ts`; `shared/ui` imports nothing from the rest of `src`.
- Every task ends with `npm run build`, `npm run lint` (exactly one warning, `react/set-state-in-effect` in `Sidebar.tsx`) and `npm run check:content` passing.
- Commit locally after each task with the message given; do not push.

## Review Focus

- A public-link screen whose `goto` or `nextScreen` points straight at an in-app screen (same flow or another flow): `check:content` exits non-zero naming flow and screen.
- An unknown block type, an icon name outside `ICON_NAMES`, or a `goto` to a missing screen or flow: `check:content` exits non-zero.
- A bottom sheet, modal or toast must stay inside the device frame, never cover the whole browser window.
- Dark theme: list rows, alerts, hero and sheets stay readable (no hard-coded light colours).
- Long Vietnamese titles and descriptions at 375 px wrap or truncate without horizontal scrolling.
- A screen without `layout` (every non-Owner flow) renders exactly as before.
- A cross-flow `goto` opens the target flow and screen and expands its sidebar group.

## Block Contract

Defined in Task 1 (`src/domain/types.ts`) and used by every later task.

```ts
export type AccessKind = "public-link" | "transition" | "app";
export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

export interface ListRowSpec {
  icon?: IconName;
  title: string;
  description?: string;
  badge?: string;
  chevron?: boolean;
  tone?: "danger";
  disabled?: boolean;
  goto?: string;
}
export interface ButtonSpec {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  goto?: string;
}

export type Block =
  | { type: "appBar"; title: string; back?: boolean; actions?: IconName[] }
  | {
      type: "hero";
      title: string;
      verified?: boolean;
      planTag?: string;
      lines?: string[];
      status?: string;
      cover?: boolean;
      logo?: boolean;
      goto?: string;
    }
  | { type: "heading"; text: string }
  | { type: "text"; text: string; muted?: boolean }
  | { type: "keyValue"; rows: { label: string; value: string }[] }
  | { type: "listGroup"; label?: string; rows: ListRowSpec[] }
  | {
      type: "field";
      kind: "input" | "textarea" | "select" | "switch" | "checkbox" | "radio";
      label: string;
      value?: string;
      placeholder?: string;
      helper?: string;
      error?: string;
      options?: string[];
      checked?: boolean;
    }
  | { type: "tabs"; items: string[]; active: number }
  | { type: "stepper"; steps: string[]; current: number }
  | { type: "progress"; label?: string; value: number }
  | {
      type: "cardList";
      items: {
        title: string;
        subtitle?: string;
        badge?: string;
        tone?: Tone;
        icon?: IconName;
        goto?: string;
      }[];
    }
  | { type: "table"; columns: string[]; rows: string[][] }
  | {
      type: "alert";
      variant: Tone;
      title?: string;
      text?: string;
      actionLabel?: string;
      goto?: string;
    }
  | {
      type: "empty";
      icon?: IconName;
      title: string;
      text?: string;
      actionLabel?: string;
      goto?: string;
    }
  | { type: "skeleton"; lines?: number }
  | { type: "actions"; buttons: ButtonSpec[] }
  | { type: "bottomSheet"; title: string; blocks: Block[] }
  | { type: "modal"; title: string; blocks: Block[]; buttons?: ButtonSpec[] }
  | { type: "toast"; text: string };
```

`goto` is a screen id of the same flow, or `flow-id/screen-id` for another flow. `Screen` gains `layout?: Block[]`; `Flow` gains `section?: SectionId`.

---

### Task 1: Domain — blocks, access, validation

**Files:**

- Create: `src/domain/icons.ts`, `src/content/sections.ts`
- Modify: `src/domain/types.ts`, `src/domain/environments.ts`, `src/domain/validate.ts`

**Interfaces:**

- Produces:
  - `ICON_NAMES: readonly string[]` and `type IconName` (union of its members). Initial names: `building, users, user, user-cog, git-branch, phone, bell, help-circle, shield-check, key-round, log-out, qr-code, gift, mail, handshake, settings, door-open, layers, tag, percent, clock, landmark, credit-card, badge-check, chart-bar, calendar, map-pin, image, lock, link, smartphone, globe, check-circle, alert-triangle, plus, trash, pencil, search, star, receipt, book-user, chevron-right, x, user-plus, user-x, history, wallet, door-closed`.
  - `type SectionId = 'start' | 'account' | 'setup' | 'staff' | 'branch-plan' | 'cashier' | 'report'`; `SECTIONS: { id: SectionId; label: string }[]` in order: Khởi đầu, Tài khoản và cơ sở, Thiết lập quán, Nhân sự, Chi nhánh và gói, Thu ngân, Báo cáo.
  - `AccessKind`, `Tone`, `ListRowSpec`, `ButtonSpec`, `Block` exactly as in the Block Contract; `Screen.layout?: Block[]`; `Flow.section?: SectionId`.
  - `EnvironmentConfig.access: AccessKind` and `EnvironmentConfig.accessLabel: string` with the spec's labels: `WEB_PUBLIC` → `public-link`, "Link công khai — mở được khi chưa đăng nhập"; `TRANSITION` → `transition`, "Chuyển tiếp — từ link sang ứng dụng"; `FLUTTER_APP`, `REACT_PWA` → `app`, "Trong ứng dụng — cần đăng nhập"; `ADMIN_UI` → `app`, "Trang quản trị Blink".
  - `validateCatalog(flows, roles)` additionally reports: unknown `type`; icon name not in `ICON_NAMES` (including nested sheet/modal blocks); `goto` (in blocks, including nested) naming a missing screen or flow; any `goto`/`nextScreen` target of a `WEB_PUBLIC` screen that is not a `WEB_PUBLIC` or `TRANSITION` screen.

- [ ] **Step 1: Write the failing check.** Add a throwaway script in the scratchpad that calls `validateCatalog` on small fixtures and prints `caught` or `MISSED` for each: (a) block with `type: 'bogus'`; (b) `listGroup` row with `icon: 'nope'`; (c) a nested `bottomSheet` block with `goto: 'ZZ-99'`; (d) `goto: 'other-flow/ZZ-99'`; (e) a `WEB_PUBLIC` screen with `goto` to a `FLUTTER_APP` screen of the same flow; (f) the same via `nextScreen`; (g) a `WEB_PUBLIC` screen going to a `TRANSITION` screen (must be accepted); (h) a `TRANSITION` screen going to an app screen (accepted). Run it: expect (a)–(f) MISSED.
- [ ] **Step 2: Add the types and constants** listed under Produces (`icons.ts`, `sections.ts`, `types.ts`, `environments.ts`).
- [ ] **Step 3: Extend `validate.ts`.** Walk blocks recursively. `goto` resolution: no `/` means same flow; with `/` the left part is a flow id. Reuse the existing error shape (`flowId`, `screenId`, message).
- [ ] **Step 4: Run the throwaway script again.** Expected: (a)–(f) caught, (g) and (h) accepted. Run `npm run check:content`, expected `content ok: 15 flows, 82 screens`.
- [ ] **Step 5: Commit** `feat(domain): add layout blocks, section ids and public-link access rules`.

### Task 2: Block renderer and viewer integration

**Files:**

- Create: `src/features/viewer/blocks/BlocksRenderer.tsx`, `src/features/viewer/blocks/icons.ts`, `src/features/viewer/blocks/blocks.css`, one component file per block type under `src/features/viewer/blocks/` (`AppBarBlock`, `HeroBlock`, `ListGroupBlock`, `FieldBlock`, `AlertBlock`, `CardListBlock`, `TableBlock`, `OverlayBlocks` and small ones grouped in `SimpleBlocks`)
- Modify: `src/features/viewer/WireframeScreenViewer.tsx`, `src/shared/ui` (only if a component needs a prop; keep API backward compatible)

**Interfaces:**

- Consumes: `Block`, `IconName`, `Screen`, `Flow`, `ENVIRONMENTS`, `useSelection().selectFlow/selectScreen`.
- Produces: `BlocksRenderer: React.FC<{ blocks: Block[]; flow: Flow; screen: Screen }>`; `iconFor(name: IconName): React.ComponentType<{ size?: number }>` in `blocks/icons.ts` covering every `ICON_NAMES` member (`Record<IconName, ...>`, so a missing name is a type error).

- [ ] **Step 1: Implement `icons.ts`** as a `Record<IconName, LucideIcon>` and `BlocksRenderer`, which renders non-overlay blocks in order inside a scrollable column, then overlay blocks (`bottomSheet`, `modal`, `toast`) last using the design-system `BottomSheet inline`, `Modal` styling inline and `Toast inline`. Each tappable block calls a shared `go(target: string)` that parses `flow/screen` or `screen` and calls `selectFlow(flowId, screenId)` or `selectScreen(screenId)`.
- [ ] **Step 2: Block rendering rules.** `appBar` of a `public-link` screen renders the brand name only (no back, no actions). `hero` draws cover, logo (initial letter fallback), title, verified tick, plan tag, lines and status chip from the account-home document. `listGroup` uses `ListGroup` and `ListRow` (rows with `goto` are interactive; `badge` renders a `Badge`). `field` uses `Input`, `Textarea`, `Select`, `Switch`, `Checkbox` or `RadioGroup` in non-interactive display state with the given `value`/`checked`. `actions` renders `Button`s stacked at the bottom of the screen.
- [ ] **Step 3: Wire the viewer.** `WireframeScreenViewer` renders `screen.layout` through `BlocksRenderer` when present, before the custom mockup map and the generic mockup. The device frame content must be a positioned container so inline overlays stay inside it; adjust `DeviceFrame.css` if not.
- [ ] **Step 4: Verify.** `npm run build`, `lint`, `check:content`. In the browser, a non-Owner flow looks exactly as before (compare `AUD-01` and `SUB-01` before and after). Temporarily give one Owner screen a `layout` with one block of every type and confirm each renders in light and dark at 375 px and desktop; the sheet and toast stay inside the frame. Revert the temporary layout.
- [ ] **Step 5: Commit** `feat(viewer): render screens from layout blocks`.

### Task 3: Show public link versus app

**Files:**

- Modify: `src/features/navigation/Sidebar.tsx` and its CSS, `src/features/inspector/ScreenSpecPanel.tsx`

**Interfaces:**

- Consumes: `ENVIRONMENTS[env].access`, `accessLabel`.

- [ ] **Step 1: Sidebar.** Each screen row shows a `Globe` icon when `access` is `public-link` and an `ArrowRightLeft` icon when `transition` (title attribute = `accessLabel`); in-app rows show nothing extra. A flow row shows "`n` link công khai" when it has any `public-link` screen.
- [ ] **Step 2: Inspector.** Add a row "Truy cập" under the existing environment row, showing `accessLabel`.
- [ ] **Step 3: Verify.** `build`, `lint`, `check:content`. In the browser, `karaoke-manager-appointments` shows icons on `PUB-01`, `PUB-02`, `PUB-03`, none on `OWN-01`; the flow row shows "2 link công khai"; the inspector row matches. Check light and dark, 375 px.
- [ ] **Step 4: Commit** `feat(navigation): mark public-link and transition screens`.

### Task 4: Pilot flow `account-home`

**Files:**

- Create: `src/content/karaoke-owner/account-home.ts` (exports `accountHome: Flow`, id `account-home`, `source` `docs/wireframes/karaoke-owner/account-home.md`, `section: 'account'`)
- Modify: `src/content/index.ts` (register the flow)

**Interfaces:**

- Consumes: Block Contract, Task 2 renderer.

- [ ] **Step 1: Read `account-home.md` fully.** Create one screen per screen or state it describes: the account screen with facility card, plan tag, hậu kiểm banner and the four menu groups; the branch picker sheet (open); the "Sắp có" toast state; the logout confirmation; the loading, error, restricted-facility and terminated variants; and the destination entries (each menu row `goto`s the first screen of the matching flow with `flow-id/screen-id`, or shows the "Sắp có" toast screen for QR phòng, Quà tặng, Lời mời phòng, Trợ giúp & hỗ trợ). Screen ids `ACC-01…`; every screen has `environment`, `actor`, `entryPoint`, `objective`, `visibleData`, `primaryAction`, `layout`.
- [ ] **Step 2: Check every `goto`.** Rows that point to flows converted later must `goto` an existing screen id of the current catalog (the first screen of that flow); if a target screen is renamed in a later task, that task updates this reference and `check:content` enforces it.
- [ ] **Step 3: Verify.** `npm run check:content` passes; open `account-home` in the browser at 375 px light and dark: facility card, tick, plan tag, grouped menu, branch sheet inside the frame; tapping each menu row opens the right flow and screen; the toast screen shows "Sắp có". Compare the screen with the document's layout sketch.
- [ ] **Step 4: Commit** `feat(content): add account-home wireframe for Owner`.

### Task 5: Thiết lập quán — rooms, floors, availability, booking tags

**Files:**

- Modify: `src/content/karaoke-owner/karaoke-room-management.ts`, `src/content/karaoke-owner/karaoke-floors.ts`
- Create: `src/content/karaoke-owner/karaoke-room-availability.ts`, `src/content/karaoke-owner/booking-tagging.ts`
- Modify: `src/content/index.ts`

**Interfaces:**

- Produces: flows `karaoke-room-availability` (ids `AVL-01…`), `booking-tagging` (ids `TAG-01…`), both `section: 'setup'`; the existing two flows get `section: 'setup'`.

- [ ] **Step 1: Rebuild `karaoke-room-management`** from `karaoke-room-management.md`: every screen of the document with `layout`, keeping existing ids (`ROOM-01…`) and adding missing ones.
- [ ] **Step 2: Rebuild `karaoke-floors`** from `karaoke-floors.md` the same way (`FLR-…`).
- [ ] **Step 3: Create `karaoke-room-availability`** from its document.
- [ ] **Step 4: Create `booking-tagging`** from its document, including the customer order confirmation page as a `WEB_PUBLIC` screen that follows rule D7.
- [ ] **Step 5: Register and verify.** Register the two new flows in `src/content/index.ts` (order: room-management, floors, room-availability, booking-tagging). `check:content` passes. In the browser open each flow, light and dark, 375 px: each screen matches its document section; the public confirmation page shows the globe icon.
- [ ] **Step 6: Commit** `feat(content): rebuild Owner room setup wireframes`.

### Task 6: Nhân sự — onboarding, staff, permissions, manager appointments

**Files:**

- Modify: `src/content/karaoke-owner/karaoke-staff-onboarding.ts`, `karaoke-staff-management.ts`, `karaoke-role-permissions.ts`, `karaoke-staff-permissions.ts`, `karaoke-manager-appointments.ts`; `src/content/index.ts` (order)

**Interfaces:**

- Produces: all five flows `section: 'staff'`; screens missing from the data are added from the documents (`ONB-02`, `ROL-06`, `PRM-06`, `PRM-07`, `PRM-08` where the documents define them); the reworded action text that names `PRM-07` becomes a plain arrow again and the `nextScreen` removed from `ONB-01` (pointing to `ONB-02`) is restored; the two similar cases in `app-release-notifications` belong to the Admin role and stay untouched.

- [ ] **Step 1: Rebuild `karaoke-staff-onboarding`** from its document: invite creation, the public invite page `ONB-PUB` as `WEB_PUBLIC`, a `TRANSITION` screen, then in-app steps; no public screen may `goto` an app screen directly.
- [ ] **Step 2: Rebuild `karaoke-staff-management`.**
- [ ] **Step 3: Rebuild `karaoke-role-permissions` and `karaoke-staff-permissions`.**
- [ ] **Step 4: Rebuild `karaoke-manager-appointments`** (18 screens): keep `PUB-01`, `PUB-03` as `WEB_PUBLIC` and `PUB-02` as `TRANSITION`; the existing `PUB-01` custom mockup stays unless a `layout` replaces it (a `layout` takes priority).
- [ ] **Step 5: Verify.** Set the order in `index.ts` (onboarding, management, role permissions, staff permissions, manager appointments); `check:content` passes with D7 satisfied; in the browser open each flow in light and dark at 375 px and compare every screen with its document; the sidebar shows public and transition icons only on the screens listed in the spec.
- [ ] **Step 6: Commit** `feat(content): rebuild Owner staff and permission wireframes`.

### Task 7: Chi nhánh và gói — branch creation, owner subscription management

**Files:**

- Modify: `src/content/karaoke-owner/karaoke-branch-creation.ts`
- Create: `src/content/karaoke-owner/subscriptions-owner-management.ts` (ids `SUB-…`, check that no id collides with `blink-admin/subscriptions` — ids only need to be unique inside a flow)
- Modify: `src/content/index.ts`

**Interfaces:**

- Produces: both flows `section: 'branch-plan'`.

- [ ] **Step 1: Rebuild `karaoke-branch-creation`** (`BR-…`) from its document.
- [ ] **Step 1b: Plan choice in branch creation.** The plan step of `karaoke-branch-creation` lists the five plans of the catalog with price per month, price when bought for a year, staff limit and Max360, and the year purchase offers whole-year or monthly payment.
- [ ] **Step 2: Create `subscriptions-owner-management`** from its document: current plan with its catalog figures, request upgrade or renewal (choose a plan; choose month or year; for a year choose whole-year or monthly payment with the amount of each payment), withdraw request, schedule cancel at end of term, states for a facility that has ended its partnership, and the note that payment is collected outside the app.
- [ ] **Step 3: Verify.** `check:content`; browser check as above; the plan-tag text on `account-home` hero uses plan names from the catalog (BASIC, Pro, Pro Max, Pro Ultra, Pro Ultra +).
- [ ] **Step 4: Commit** `feat(content): rebuild Owner branch and plan wireframes`.

### Task 8: Thu ngân, Báo cáo, Khởi đầu

**Files:**

- Modify: `src/content/karaoke-owner/cashier-terminal-authentication.ts`, `karaoke-partner-registration.ts`
- Create: `src/content/karaoke-owner/karaoke-operations-reporting.ts` (ids `RPT-…`)
- Modify: `src/content/index.ts`

**Interfaces:**

- Produces: sections `cashier`, `report`, `start` respectively.

- [ ] **Step 1: Rebuild `cashier-terminal-authentication`** (`CSH-…`) from its document.
- [ ] **Step 2: Create `karaoke-operations-reporting`** from its document (it states no public link or app switch).
- [ ] **Step 3: Rebuild `karaoke-partner-registration`** (`REG-…`) from its document, including the plan choice screen (`REG-01`) with the five plans, yearly half price and the whole-year or monthly payment option.
- [ ] **Step 4: Verify.** `check:content`; browser check; confirm the 15 Owner flows now exist and every Owner flow id equals a document name under `docs/wireframes/karaoke-owner/`.
- [ ] **Step 5: Commit** `feat(content): rebuild Owner cashier, report and registration wireframes`.

### Task 9: Sections, final order and documentation

**Files:**

- Modify: `src/features/navigation/Sidebar.tsx`, `src/content/index.ts`, `CLAUDE.md`

**Interfaces:**

- Consumes: `SECTIONS`, `Flow.section`.

- [ ] **Step 1: Sidebar sub-groups.** Inside the Owner role group, group flows by `section` in `SECTIONS` order with a small sub-heading; flows without `section` (other roles) are listed as today.
- [ ] **Step 2: Final catalog order** is role order, then `SECTIONS` order, then the order given in Tasks 4–8; make `index.ts` match.
- [ ] **Step 3: Update `CLAUDE.md`:** blocks and `layout`, `goto` syntax, access derivation and rule D7, `section`, how to add an icon or block type, the 15 Owner flows, and remove the gaps this plan closes.
- [ ] **Step 4: Final verification.** `build`, `lint`, `check:content`. Negative checks from the spec: a wrong `goto`, icon name, block type, and a public screen pointing straight at an app screen each fail. Walk every Owner flow in light and dark at 375 px and desktop width. Produce, for the final message, the list of public-link and transition screens per Owner flow, and the questions found while following the documents.
- [ ] **Step 5: Commit** `feat(navigation): group Owner flows into sections and document the block model`.
