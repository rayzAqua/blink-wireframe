import type { Flow, Role, Screen } from './types.ts';

export interface ContentError {
  flowId: string;
  screenId?: string;
  message: string;
}

const ARROW_TARGET = /→\s*([A-Z]{2,4}-\d{2})/g;

const SCREEN_ID = /^[A-Z]{2,4}-[A-Z0-9]+$/;

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
      checkScreen(flow, screen, screenIds, add);
    }
  }
  return errors;
}

function checkScreen(
  flow: Flow,
  screen: Screen,
  screenIds: Set<string>,
  add: (flowId: string, message: string, screenId?: string) => void,
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

  // nextScreen is either a screen id of this flow or free text for a destination outside
  // the flow (for example "Trang chủ cơ sở"). Only a value shaped like an id must exist.
  if (
    screen.nextScreen !== undefined &&
    SCREEN_ID.test(screen.nextScreen) &&
    !screenIds.has(screen.nextScreen)
  ) {
    add(flow.id, `nextScreen "${screen.nextScreen}" does not exist`, screen.id);
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
