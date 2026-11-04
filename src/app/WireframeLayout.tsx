import React from 'react';
import { AppHeader } from './header/AppHeader';
import { Sidebar } from '../features/navigation';
import { WireframeScreenViewer } from '../features/viewer';
import { ScreenSpecPanel } from '../features/inspector';
import { useWireframe } from '../features/workspace';
import './WireframeLayout.css';

export const WireframeLayout: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useWireframe();

  return (
    <div className="wireframe-layout">
      <AppHeader />
      <div className="wireframe-layout__body">
        {/* Mobile backdrop for drawer sidebar */}
        <div
          className={`wireframe-layout__backdrop ${isSidebarOpen ? 'wireframe-layout__backdrop--visible' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Đóng thanh điều hướng"
        />
        <Sidebar />
        <WireframeScreenViewer />
        <ScreenSpecPanel />
      </div>
    </div>
  );
};
