import React, { useEffect, useMemo, useState } from 'react';
import { CATALOG } from '../../content';
import { ROLES } from '../../content/roles';
import { ENVIRONMENTS } from '../../domain/environments';
import { validateCatalog } from '../../domain/validate';
import type { DeviceType } from '../../shared/ui';
import { SelectionContext } from './selection-context';
import type { SelectionValue } from './selection-context';
import { useWorkspace } from './useWorkspace';

const SIDEBAR_BREAKPOINT = 1024;

/**
 * Holds the active flow, screen and device. Children are only rendered when the catalog has
 * at least one flow, so consumers can rely on an active flow and screen existing.
 */
export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setIsSidebarOpen } = useWorkspace();
  const first = CATALOG[0];
  const [flowId, setFlowId] = useState<string | undefined>(first?.id);
  const [screenId, setScreenId] = useState<string | undefined>(first?.screens[0]?.id);
  const [manualDevice, setManualDevice] = useState<DeviceType>('mobile');
  const [isAutoDevice, setIsAutoDevice] = useState<boolean>(true);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    for (const e of validateCatalog(CATALOG, ROLES)) {
      console.error(`${e.flowId}${e.screenId ? ` [${e.screenId}]` : ''}: ${e.message}`);
    }
  }, []);

  const activeFlow = useMemo(() => CATALOG.find((f) => f.id === flowId) ?? first, [flowId, first]);
  const activeScreen = useMemo(
    () => activeFlow?.screens.find((s) => s.id === screenId) ?? activeFlow?.screens[0],
    [activeFlow, screenId],
  );

  const value = useMemo<SelectionValue | undefined>(() => {
    if (!activeFlow || !activeScreen) return undefined;
    const autoDevice: DeviceType = ENVIRONMENTS[activeScreen.environment].deviceKind;
    return {
      flows: CATALOG,
      activeFlow,
      activeScreen,
      selectFlow: (id) => {
        const flow = CATALOG.find((f) => f.id === id);
        if (!flow) return;
        setFlowId(flow.id);
        setScreenId(flow.screens[0]?.id);
      },
      selectScreen: (id) => {
        if (!activeFlow.screens.some((s) => s.id === id)) return;
        setScreenId(id);
        if (window.innerWidth < SIDEBAR_BREAKPOINT) setIsSidebarOpen(false);
      },
      deviceType: isAutoDevice ? autoDevice : manualDevice,
      setDeviceType: (device) => {
        setIsAutoDevice(false);
        setManualDevice(device);
      },
      isAutoDevice,
      setIsAutoDevice,
    };
  }, [activeFlow, activeScreen, isAutoDevice, manualDevice, setIsSidebarOpen]);

  if (!value) {
    return <p className="empty-catalog">Chưa có wireframe nào trong danh mục.</p>;
  }
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};
