import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { WireframeInitiative, WireframeScreenSpec } from '../types/wireframe';
import { WIREFRAME_INITIATIVES } from '../data/wireframe-registry';
import type { DeviceType } from '../design-system';

interface WireframeContextValue {
  initiatives: WireframeInitiative[];
  activeInitiative: WireframeInitiative;
  activeScreen: WireframeScreenSpec;
  selectInitiative: (initiativeId: string) => void;
  selectScreen: (screenId: string) => void;
  deviceType: DeviceType;
  setDeviceType: (device: DeviceType) => void;
  isAutoDevice: boolean;
  setIsAutoDevice: (auto: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isSpecOpen: boolean;
  setIsSpecOpen: (open: boolean) => void;
  toggleSpec: () => void;
  viewMode: 'wireframes' | 'design-system';
  setViewMode: (mode: 'wireframes' | 'design-system') => void;
}

const WireframeContext = createContext<WireframeContextValue | undefined>(undefined);

export const WireframeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>('karaoke-manager-appointments');
  const [selectedScreenId, setSelectedScreenId] = useState<string>('OWN-01');
  const [manualDeviceType, setManualDeviceType] = useState<DeviceType>('mobile');
  const [isAutoDevice, setIsAutoDevice] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Responsive sidebar & spec panel initial states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const [isSpecOpen, setIsSpecOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return true;
  });

  const [viewMode, setViewMode] = useState<'wireframes' | 'design-system'>('wireframes');

  // Handle screen resize to adapt layout automatically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setIsSidebarOpen(false);
      }
      if (width < 1280) {
        setIsSpecOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleSpec = () => {
    setIsSpecOpen((prev) => !prev);
  };

  // Find active initiative
  const activeInitiative = useMemo(() => {
    return (
      WIREFRAME_INITIATIVES.find((i) => i.id === selectedInitiativeId) ||
      WIREFRAME_INITIATIVES[0]
    );
  }, [selectedInitiativeId]);

  // Find active screen
  const activeScreen = useMemo(() => {
    return (
      activeInitiative.screens.find((s) => s.id === selectedScreenId) ||
      activeInitiative.screens[0]
    );
  }, [activeInitiative, selectedScreenId]);

  // Automatically determine device type based on wireframe environment if auto mode is on
  const deviceType: DeviceType = useMemo(() => {
    if (!isAutoDevice) return manualDeviceType;
    if (activeScreen.environment === 'ADMIN_UI') return 'admin';
    if (activeScreen.environment === 'WEB_PUBLIC' || activeScreen.environment === 'TRANSITION') return 'browser';
    return 'mobile';
  }, [isAutoDevice, manualDeviceType, activeScreen.environment]);

  const selectInitiative = (initiativeId: string) => {
    setSelectedInitiativeId(initiativeId);
    const targetInit = WIREFRAME_INITIATIVES.find((i) => i.id === initiativeId);
    if (targetInit && targetInit.screens.length > 0) {
      setSelectedScreenId(targetInit.screens[0].id);
    }
  };

  const selectScreen = (screenId: string) => {
    setSelectedScreenId(screenId);
    // On small screens, close sidebar when a screen is selected to view the canvas
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleSetDeviceType = (dev: DeviceType) => {
    setIsAutoDevice(false);
    setManualDeviceType(dev);
  };

  return (
    <WireframeContext.Provider
      value={{
        initiatives: WIREFRAME_INITIATIVES,
        activeInitiative,
        activeScreen,
        selectInitiative,
        selectScreen,
        deviceType,
        setDeviceType: handleSetDeviceType,
        isAutoDevice,
        setIsAutoDevice,
        theme,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isSpecOpen,
        setIsSpecOpen,
        toggleSpec,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </WireframeContext.Provider>
  );
};

export const useWireframe = (): WireframeContextValue => {
  const context = useContext(WireframeContext);
  if (!context) {
    throw new Error('useWireframe must be used within a WireframeProvider');
  }
  return context;
};
