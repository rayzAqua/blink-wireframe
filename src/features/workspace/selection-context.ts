import { createContext } from 'react';
import type { Flow, Screen } from '../../domain/types';
import type { DeviceType } from '../../shared/ui';

export interface SelectionValue {
  flows: Flow[];
  activeFlow: Flow;
  activeScreen: Screen;
  /** Opens a flow on the given screen, or on its first screen when none is given. */
  selectFlow: (flowId: string, screenId?: string) => void;
  /** Ignores ids that are not a screen of the active flow. */
  selectScreen: (screenId: string) => void;
  deviceType: DeviceType;
  setDeviceType: (device: DeviceType) => void;
  isAutoDevice: boolean;
  setIsAutoDevice: (auto: boolean) => void;
}

export const SelectionContext = createContext<SelectionValue | undefined>(undefined);
