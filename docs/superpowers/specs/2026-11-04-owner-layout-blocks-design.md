# Owner Karaoke wireframes as layout blocks

**Status:** design approved in conversation on 2026-11-04; written spec awaiting review.
**Scope:** the Owner Karaoke role only. Other roles keep today's generic mockup.
**Builds on:** `2026-11-04-wireframe-clean-architecture-design.md` (feature folders, `content/`, `domain/`).

## Goal

Render every Owner Karaoke screen as a real wireframe (layout, components, tap targets) built from the
design system, using the content of the 15 documents in `docs/wireframes/karaoke-owner/`. Every
screen must state whether it is a **public link page** or an **in-app screen**, visibly and
checkably.

## Current state (evidence)

- 10 of the 15 Owner documents are in the catalog (about 63 screens); `account-home`, `booking-tagging`,
  `karaoke-operations-reporting`, `karaoke-room-availability` and `subscriptions-owner-management`
  are not.
- Screens that the documents describe but the data lacks: `ONB-02`, `PRM-07`, `ROL-06` and
  others; four action texts say "chưa có trong bản wireframe này".
- The viewer draws a generic card list from text fields, so layouts such as a menu with a branch
  picker sheet cannot be shown.
- Today's public-versus-app information is only the `environment` badge. In the data, the public
  screens are `PUB-01`, `PUB-03` and `ONB-PUB` (`WEB_PUBLIC`) and `PUB-02` (`TRANSITION`); every
  other Owner screen is `FLUTTER_APP`. `booking-tagging.md` also names a public customer
  confirmation page that has no screen yet.

## Decisions

| #   | Decision                                                                                                     |
| --- | ------------------------------------------------------------------------------------------------------------ |
| D1  | A screen may carry `layout: Block[]`. Without it, the generic mockup is used.                                |
| D2  | Blocks are drawn by one renderer with the design-system components added earlier.                            |
| D3  | `goto` on a block may name a screen of the same flow or `flow-id/screen-id` of another flow.                 |
| D4  | Owner flows match the 15 documents one to one; flow id equals the document name.                             |
| D5  | The Owner sidebar has sub-groups (`section`) that follow the account-home menu.                              |
| D6  | Public versus app is derived from `environment` and shown everywhere a screen is listed or drawn.            |
| D7  | A public-link screen must not `goto` an in-app screen directly; the step goes through a `TRANSITION` screen. |

## Public link versus app

`domain/environments.ts` gains, for each environment, an `access` value and a Vietnamese label:

| Environment                | `access`      | Label shown to the reader                   |
| -------------------------- | ------------- | ------------------------------------------- |
| `WEB_PUBLIC`               | `public-link` | Link công khai — mở được khi chưa đăng nhập |
| `TRANSITION`               | `transition`  | Chuyển tiếp — từ link sang ứng dụng         |
| `FLUTTER_APP`, `REACT_PWA` | `app`         | Trong ứng dụng — cần đăng nhập              |
| `ADMIN_UI`                 | `app`         | Trang quản trị Blink                        |

Where it shows:

- **Sidebar:** each screen row shows a globe icon for `public-link` and an arrow icon for
  `transition`; in-app rows show nothing extra. A flow row shows "n link công khai" when it has any.
- **Viewer:** the environment badge stays; the address bar already differs (public link address
  versus app address).
- **Inspector:** a new row "Truy cập" with the label above.
- **Layouts:** `appBar` of a `public-link` screen draws a browser-style header (no app navigation); a
  `transition` screen shows the "Mở ứng dụng / Tiếp tục trên web" choice.

Validation (`check:content`):

- every Owner screen has an explicit `environment`;
- a `WEB_PUBLIC` screen's `goto` and `nextScreen` ids point only to `WEB_PUBLIC` or `TRANSITION`
  screens of the same flow (D7);
- a `TRANSITION` screen may point to in-app screens.

The Owner public and transition screens known today, to be kept and completed: manager-appointment
invite page (`PUB-01`), choose-how-to-continue (`PUB-02`, transition), no-app fallback (`PUB-03`);
staff-invite page (`ONB-PUB`); customer order confirmation from `booking-tagging.md` (new).

## Plan catalog used by the wireframes

Given by the product owner on 2026-11-04. Every screen that shows plans, prices or staff limits must
use these figures (registration plan choice, branch creation plan choice, account-home plan tag,
Owner subscription management).

| Plan        | Price per month | Price per month when bought for a year | Staff                                                                                                                                                        | Max360 |
| ----------- | --------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| BASIC       | Miễn phí        | Miễn phí                               | 5                                                                                                                                                            | Không  |
| Pro         | 5.000.000đ      | 2.500.000đ                             | 10                                                                                                                                                           | Có     |
| Pro Max     | 10.000.000đ     | 5.000.000đ                             | 30                                                                                                                                                           | Có     |
| Pro Ultra   | 20.000.000đ     | 10.000.000đ                            | 99                                                                                                                                                           | Có     |
| Pro Ultra + | 20.000.000đ     | 10.000.000đ                            | Không giới hạn cứng: 99 người đã gồm trong giá; từ người thứ 100 trở đi 99.000đ mỗi người mỗi tháng, tính vào cuối mỗi tháng và không chặn việc thêm nhân sự | Có     |

Buying for a year costs half the monthly price for each of the 12 months (for example Pro: 12 ×
2.500.000đ = 30.000.000đ). When buying for a year the Owner can choose to pay the whole year at once or
pay monthly (12 monthly payments). Screens that offer this choice show both options and the amount
of each payment.

The yearly discount is a catalog value entered by Admin and is currently 50%, which is why the yearly
price is half. The figures above are the current catalog values; the Owner screens only display the plan,
the discounted price and the payment options, and never let the Owner edit a discount.

How buying works in the app (checked against `docs/product/system-business-rules.md` on backend `main`,
and consistent with the product owner's description):

- Paying by month costs the monthly price each month. Buying for a year costs the monthly price after
  the yearly discount, 12 times; the Owner either pays the year at once or pays 12 monthly instalments of
  the same amount (instalments exist only for 12-month purchases; any remainder goes to the first
  instalment; the first instalment is due immediately and benefits start with it).
- The app has no payment: the Owner **sends a request** (register, renew, upgrade), Blink Admin collects the
  money outside the system and confirms it. Screens say "Gửi yêu cầu", not "Thanh toán", and show the
  request states (chờ xử lý, đã duyệt, bị từ chối, đã rút). A missed instalment puts the plan in the grace
  period (7 days by default) and then the facility falls back to BASIC.
- In the production environment a plan with a price above zero cannot be chosen at registration yet
  because there is no payment module; only BASIC (free) can. The registration plan screen follows its
  document on how paid plans are shown.
- The Owner can schedule cancellation at the end of the term; the facility then returns to BASIC.

## Blocks

`domain/types.ts` adds `Block`, a union discriminated by `type`. Any block that is tappable accepts
an optional `goto`.

- Structure: `appBar` (title, back, actions), `hero` (cover, logo, title, verified tick, plan tag,
  address lines, status chip), `heading`, `text`, `keyValue`, `listGroup` (label, rows with icon,
  title, description, badge, chevron, tone, goto).
- Forms: `field` (input, textarea, select, switch, checkbox, radio, with label, value,
  placeholder, helper, error), `tabs`, `stepper`, `progress`.
- Lists: `cardList`, `table`.
- States: `alert` (variant, title, text, action), `empty`, `skeleton`.
- Actions: `actions` (primary, secondary, danger buttons with goto).
- Overlays (drawn open): `bottomSheet`, `modal`, `toast`, each holding blocks.

Icons are names from an allow-list in `features/viewer/blocks/icons.ts` that maps to `lucide-react`.
Unknown block types or icon names are validation errors.

## Structure changes

- `features/viewer/blocks/`: `BlocksRenderer.tsx`, one component per block type, `icons.ts`.
- `WireframeScreenViewer` renders `screen.layout` through `BlocksRenderer` when present, then the
  custom mockup map, then the generic mockup.
- `domain/validate.ts` validates blocks (type, icon name, `goto` targets) and rule D7.
- `Flow` gains optional `section`; the Owner sidebar groups by `section` inside the role group, in this
  order: Khởi đầu, Tài khoản và cơ sở, Thiết lập quán, Nhân sự, Chi nhánh và gói, Thu ngân, Báo cáo.

## Owner flows after restructure

15 flows, id equal to the document name:

| Section            | Flow ids                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Khởi đầu           | karaoke-partner-registration                                                                                                          |
| Tài khoản và cơ sở | account-home                                                                                                                          |
| Thiết lập quán     | karaoke-room-management, karaoke-floors, karaoke-room-availability, booking-tagging                                                   |
| Nhân sự            | karaoke-staff-onboarding, karaoke-staff-management, karaoke-role-permissions, karaoke-staff-permissions, karaoke-manager-appointments |
| Chi nhánh và gói   | karaoke-branch-creation, subscriptions-owner-management                                                                               |
| Thu ngân           | cashier-terminal-authentication                                                                                                       |
| Báo cáo            | karaoke-operations-reporting                                                                                                          |

Each flow lists every screen of its document. Screen ids follow the document. The four neutralised
references are replaced by real screens and their reworded action text is restored to a plain arrow.

## Content rules

- Text on screens is Vietnamese, user-facing: no API routes, database names or raw backend status
  names.
- Every screen follows the "Nội dung hiển thị", "Thao tác" and "Lỗi" parts of its document; screens
  mentioned only in a flow diagram are still drawn with the content the document gives.
- A screen with an empty, loading, no-permission or restricted-facility variant that the document
  describes gets its own screen id or an `alert` block, as the document states it.

## Out of scope

- Other roles; reading markdown automatically; a bottom navigation bar for the whole app; URL
  routing; test framework.
- Changing the backend documents. Where a document is unclear, the screen follows the document and
  the question goes in the final report.

## Verification

1. `npm run build`, `npm run lint` (one existing warning) and `npm run check:content` pass.
2. Each Owner flow is opened in the browser, light and dark, at 375 px and desktop width, and each screen
   is compared with its document.
3. Public-link and transition screens are listed per flow in the final report, and the sidebar
   icons match that list.
4. A deliberately wrong `goto`, icon name, block type, and a public screen pointing straight at an
   in-app screen each fail `check:content`.

## Migration order

1. Types, validator rules, environment `access`, block renderer and icons; sidebar and inspector
   show access. Build one pilot flow: `account-home`.
2. Convert Owner flows in groups: Thiết lập quán; Nhân sự; Chi nhánh và gói; Thu ngân, Báo cáo and
   Khởi đầu.
3. Add `section` and the sidebar sub-groups; remove the leftover generic text from converted
   flows; update `CLAUDE.md`.

## Risks

- About 100 screens is a lot of content; the plan splits it into groups with a check after each.
- A document may be ambiguous; mitigated by following the document and reporting the question.
- Rule D7 may flag existing links; each flagged link is reviewed against its document before
  changing it.
