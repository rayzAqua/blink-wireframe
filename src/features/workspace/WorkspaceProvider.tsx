import React, { useEffect, useMemo, useState } from 'react';
import { WorkspaceContext } from './workspace-context';
import type { Theme, ViewMode, WorkspaceValue } from './workspace-context';

const SIDEBAR_BREAKPOINT = 1024;
const SPEC_BREAKPOINT = 1280;

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [viewMode, setViewMode] = useState<ViewMode>('wireframes');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    () => typeof window === 'undefined' || window.innerWidth >= SIDEBAR_BREAKPOINT,
  );
  const [isSpecOpen, setIsSpecOpen] = useState<boolean>(
    () => typeof window === 'undefined' || window.innerWidth >= SPEC_BREAKPOINT,
  );

  // Close the panels when the window becomes too narrow for them.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < SIDEBAR_BREAKPOINT) setIsSidebarOpen(false);
      if (window.innerWidth < SPEC_BREAKPOINT) setIsSpecOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo<WorkspaceValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
      isSpecOpen,
      setIsSpecOpen,
      toggleSpec: () => setIsSpecOpen((prev) => !prev),
      viewMode,
      setViewMode,
    }),
    [theme, isSidebarOpen, isSpecOpen, viewMode],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};
