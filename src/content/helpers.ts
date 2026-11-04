import type { IconName } from '../domain/icons.ts';
import type { Block, ButtonSpec, EnvironmentId } from '../domain/types.ts';

/** Fields shared by every Owner screen shown inside the app. */
export const inApp = (actor = 'Owner Karaoke') => ({
  environment: 'FLUTTER_APP' as EnvironmentId,
  actor,
});

export const bar = (
  title: string,
  back = true,
  actions?: IconName[],
): Block => ({
  type: 'appBar',
  title,
  back,
  actions,
});

export const buttons = (...items: ButtonSpec[]): Block => ({
  type: 'actions',
  buttons: items,
});
