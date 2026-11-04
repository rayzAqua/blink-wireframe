import { isIconName } from './icons.ts';
import type { Block, Flow, Role, Screen } from './types.ts';

export interface ContentError {
  flowId: string;
  screenId?: string;
  message: string;
}

const ID_PATTERN = '[A-Z]{2,6}-[A-Z0-9]+';
const ARROW_TARGET = new RegExp(`→\\s*(${ID_PATTERN})`, 'g');
const NEXT_TARGET = new RegExp(`(?:([a-z0-9-]+)/)?(${ID_PATTERN})`, 'g');

const BLOCK_TYPES = new Set([
  'appBar',
  'profile',
  'hero',
  'heading',
  'text',
  'keyValue',
  'listGroup',
  'field',
  'tabs',
  'stepper',
  'progress',
  'cardList',
  'table',
  'alert',
  'empty',
  'skeleton',
  'actions',
  'bottomSheet',
  'modal',
  'toast',
]);

type Add = (flowId: string, message: string, screenId?: string) => void;

/** Targets named in a nextScreen value: `ID` (same flow) or `flow-id/ID` (another flow). */
function nextScreenTargets(value?: string): string[] {
  const targets: string[] = [];
  for (const m of value?.matchAll(NEXT_TARGET) ?? [])
    targets.push(m[1] ? `${m[1]}/${m[2]}` : m[2]);
  return targets;
}

const isBlank = (value: string | undefined): boolean =>
  value === undefined || value.trim() === '';

export function validateCatalog(flows: Flow[], roles: Role[]): ContentError[] {
  const errors: ContentError[] = [];
  const add = (flowId: string, message: string, screenId?: string) =>
    errors.push({ flowId, screenId, message });

  if (flows.length === 0) {
    add('(catalog)', 'catalog is empty');
    return errors;
  }

  const roleIds = new Set(roles.map((r) => r.id));
  const flowIds = new Set<string>();
  const flowsById = new Map(flows.map((f) => [f.id, f]));

  for (const flow of flows) {
    if (flowIds.has(flow.id)) add(flow.id, 'duplicate flow id');
    flowIds.add(flow.id);

    if (!roleIds.has(flow.role)) add(flow.id, `unknown role "${flow.role}"`);
    for (const field of ['id', 'title', 'summary', 'source'] as const) {
      if (isBlank(flow[field])) add(flow.id, `empty ${field}`);
    }
    if (flow.screens.length === 0) {
      add(flow.id, 'flow has no screens');
      continue;
    }

    const screenIds = new Set<string>();
    for (const screen of flow.screens) {
      if (screenIds.has(screen.id))
        add(flow.id, 'duplicate screen id', screen.id);
      screenIds.add(screen.id);
    }

    for (const screen of flow.screens) {
      checkScreen(flow, screen, screenIds, flowsById, add);
      checkLayout(flow, screen, flowsById, add);
      checkPublicExits(flow, screen, flowsById, add);
    }
  }
  return errors;
}

function checkScreen(
  flow: Flow,
  screen: Screen,
  screenIds: Set<string>,
  flowsById: Map<string, Flow>,
  add: Add,
): void {
  for (const field of [
    'id',
    'title',
    'actor',
    'entryPoint',
    'objective',
    'primaryAction',
  ] as const) {
    if (isBlank(screen[field])) add(flow.id, `empty ${field}`, screen.id);
  }
  if (screen.visibleData.length === 0)
    add(flow.id, 'empty visibleData', screen.id);

  // nextScreen is a screen id (or `flow-id/screen-id`), or free text naming a destination outside
  // the flow (for example "Trang chủ cơ sở"). Every id-shaped token in it must exist, so
  // "REC-02 hoặc REC-04" is checked too.
  for (const target of nextScreenTargets(screen.nextScreen)) {
    if (!resolveTarget(flow, target, flowsById)) {
      add(
        flow.id,
        `nextScreen "${screen.nextScreen}" refers to missing screen ${target}`,
        screen.id,
      );
    }
  }

  const actions = [screen.primaryAction, ...(screen.secondaryActions ?? [])];
  for (const text of actions) {
    for (const match of text.matchAll(ARROW_TARGET)) {
      if (!screenIds.has(match[1])) {
        add(
          flow.id,
          `action "${text}" points to missing screen ${match[1]}`,
          screen.id,
        );
      }
    }
  }
}

/** Finds the screen a `goto` or `nextScreen` value names: same flow, or `flow-id/screen-id`. */
function resolveTarget(
  flow: Flow,
  target: string,
  flowsById: Map<string, Flow>,
): Screen | undefined {
  const slash = target.indexOf('/');
  const targetFlow =
    slash === -1 ? flow : flowsById.get(target.slice(0, slash));
  const screenId = slash === -1 ? target : target.slice(slash + 1);
  return targetFlow?.screens.find((s) => s.id === screenId);
}

/** Calls `visit` for every block, including blocks nested in sheets and modals. */
function walkBlocks(blocks: Block[], visit: (block: Block) => void): void {
  for (const block of blocks) {
    visit(block);
    if (block.type === 'bottomSheet' || block.type === 'modal')
      walkBlocks(block.blocks, visit);
  }
}

/** Every `goto` and icon name written in one block (not in nested blocks). */
function blockRefs(block: Block): { gotos: string[]; icons: string[] } {
  const gotos: string[] = [];
  const icons: string[] = [];
  const goto = (value?: string) => value && gotos.push(value);
  const icon = (value?: string) => value && icons.push(value);
  switch (block.type) {
    case 'appBar':
      block.actions?.forEach(icon);
      break;
    case 'hero':
    case 'profile':
    case 'alert':
      goto(block.goto);
      break;
    case 'empty':
      icon(block.icon);
      goto(block.goto);
      break;
    case 'listGroup':
      block.rows.forEach((row) => {
        icon(row.icon);
        goto(row.goto);
      });
      break;
    case 'cardList':
      block.items.forEach((item) => {
        icon(item.icon);
        goto(item.goto);
      });
      break;
    case 'actions':
      block.buttons.forEach((button) => goto(button.goto));
      break;
    case 'modal':
      block.buttons?.forEach((button) => goto(button.goto));
      break;
    default:
      break;
  }
  return { gotos, icons };
}

function checkLayout(
  flow: Flow,
  screen: Screen,
  flowsById: Map<string, Flow>,
  add: Add,
): void {
  if (!screen.layout) return;
  walkBlocks(screen.layout, (block) => {
    if (!BLOCK_TYPES.has(block.type)) {
      add(flow.id, `unknown block type "${block.type}"`, screen.id);
      return;
    }
    const { gotos, icons } = blockRefs(block);
    for (const name of icons) {
      if (!isIconName(name)) add(flow.id, `unknown icon "${name}"`, screen.id);
    }
    for (const target of gotos) {
      if (!resolveTarget(flow, target, flowsById)) {
        add(flow.id, `goto "${target}" does not exist`, screen.id);
      }
    }
  });
}

/** A public link page may only lead to other public pages or to a transition screen. */
function checkPublicExits(
  flow: Flow,
  screen: Screen,
  flowsById: Map<string, Flow>,
  add: Add,
): void {
  if (screen.environment !== 'WEB_PUBLIC') return;
  const targets: string[] = [];
  targets.push(...nextScreenTargets(screen.nextScreen));
  if (screen.layout) {
    walkBlocks(screen.layout, (block) => {
      if (BLOCK_TYPES.has(block.type)) targets.push(...blockRefs(block).gotos);
    });
  }
  for (const target of targets) {
    const found = resolveTarget(flow, target, flowsById);
    if (
      found &&
      found.environment !== 'WEB_PUBLIC' &&
      found.environment !== 'TRANSITION'
    ) {
      add(
        flow.id,
        `public link screen leads straight to ${found.environment} screen ${found.id}; go through a transition screen`,
        screen.id,
      );
    }
  }
}
