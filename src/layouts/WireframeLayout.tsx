import React from 'react';
import { AppHeader } from '../components/header/AppHeader';
import { Sidebar } from '../components/navigation/Sidebar';
import { WireframeScreenViewer } from '../components/viewer/WireframeScreenViewer';
import { ScreenSpecPanel } from '../components/inspector/ScreenSpecPanel';
import { useWireframe } from '../context/WireframeContext';
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
