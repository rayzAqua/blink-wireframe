import type { EnvironmentId, Flow, Screen } from './types.ts';

export type DeviceKind = 'mobile' | 'browser' | 'admin';

export type EnvironmentBadgeVariant =
  'env-flutter' | 'env-react' | 'env-public' | 'env-admin' | 'env-transition';

export interface EnvironmentConfig {
  id: EnvironmentId;
  label: string;
  badgeVariant: EnvironmentBadgeVariant;
  deviceKind: DeviceKind;
  simulatedUrl: (flow: Flow, screen: Screen) => string;
}

const appUrl = (flow: Flow, screen: Screen) =>
  `blink.nexlink.vn/${flow.id}/${screen.id.toLowerCase()}`;

export const ENVIRONMENTS: Record<EnvironmentId, EnvironmentConfig> = {
  FLUTTER_APP: {
    id: 'FLUTTER_APP',
    label: '📱 FLUTTER APP',
    badgeVariant: 'env-flutter',
    deviceKind: 'mobile',
    simulatedUrl: appUrl,
  },
  REACT_PWA: {
    id: 'REACT_PWA',
    label: '🖥️ REACT PWA',
    badgeVariant: 'env-react',
    deviceKind: 'mobile',
    simulatedUrl: appUrl,
  },
  WEB_PUBLIC: {
    id: 'WEB_PUBLIC',
    label: '🌐 WEB CÔNG KHAI',
    badgeVariant: 'env-public',
    deviceKind: 'browser',
    simulatedUrl: () => 'blink.nexlink.vn/invite/branch-karaoke#token-3days',
  },
  TRANSITION: {
    id: 'TRANSITION',
    label: '↗️ CHUYỂN TIẾP',
    badgeVariant: 'env-transition',
    deviceKind: 'browser',
    simulatedUrl: appUrl,
  },
  ADMIN_UI: {
    id: 'ADMIN_UI',
    label: '🖥️ ADMIN UI',
    badgeVariant: 'env-admin',
    deviceKind: 'admin',
    simulatedUrl: (flow) => `https://admin.blink.nexlink.vn/${flow.id}`,
  },
};
