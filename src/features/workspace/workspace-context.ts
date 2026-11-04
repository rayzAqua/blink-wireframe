import { createContext } from 'react';

export type ViewMode = 'wireframes' | 'design-system';
export type Theme = 'light' | 'dark';

export interface WorkspaceValue {
  theme: Theme;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isSpecOpen: boolean;
  setIsSpecOpen: (open: boolean) => void;
  toggleSpec: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const WorkspaceContext = createContext<WorkspaceValue | undefined>(undefined);
