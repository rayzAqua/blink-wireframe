import type { AccessKind, EnvironmentId, Flow, Screen } from './types.ts';

export type DeviceKind = 'mobile' | 'browser' | 'admin';

export type EnvironmentBadgeVariant =
  'env-flutter' | 'env-react' | 'env-public' | 'env-admin' | 'env-transition';

export interface EnvironmentConfig {
  id: EnvironmentId;
  label: string;
  badgeVariant: EnvironmentBadgeVariant;
  deviceKind: DeviceKind;
  access: AccessKind;
  accessLabel: string;
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
    access: 'app',
    accessLabel: 'Trong ứng dụng — cần đăng nhập',
    simulatedUrl: appUrl,
  },
  REACT_PWA: {
    id: 'REACT_PWA',
    label: '🖥️ REACT PWA',
    badgeVariant: 'env-react',
    deviceKind: 'mobile',
    access: 'app',
    accessLabel: 'Trong ứng dụng — cần đăng nhập',
    simulatedUrl: appUrl,
  },
  WEB_PUBLIC: {
    id: 'WEB_PUBLIC',
    label: '🌐 WEB CÔNG KHAI',
    badgeVariant: 'env-public',
    deviceKind: 'browser',
    access: 'public-link',
    accessLabel: 'Link công khai — mở được khi chưa đăng nhập',
    simulatedUrl: () => 'blink.nexlink.vn/invite/branch-karaoke#token-3days',
  },
  TRANSITION: {
    id: 'TRANSITION',
    label: '↗️ CHUYỂN TIẾP',
    badgeVariant: 'env-transition',
    deviceKind: 'browser',
    access: 'transition',
    accessLabel: 'Chuyển tiếp — từ link sang ứng dụng',
    simulatedUrl: appUrl,
  },
  ADMIN_UI: {
    id: 'ADMIN_UI',
    label: '🖥️ ADMIN UI',
    badgeVariant: 'env-admin',
    deviceKind: 'admin',
    access: 'app',
    accessLabel: 'Trang quản trị Blink',
    simulatedUrl: (flow) => `https://admin.blink.nexlink.vn/${flow.id}`,
  },
};
