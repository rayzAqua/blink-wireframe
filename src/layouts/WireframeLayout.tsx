import React from 'react';
import { AppHeader } from '../components/header/AppHeader';
import { Sidebar } from '../components/navigation/Sidebar';
import { WireframeScreenViewer } from '../components/viewer/WireframeScreenViewer';
import { ScreenSpecPanel } from '../components/inspector/ScreenSpecPanel';
import './WireframeLayout.css';

export const WireframeLayout: React.FC = () => {
  return (
    <div className="wireframe-layout">
      <AppHeader />
      <div className="wireframe-layout__body">
        <Sidebar />
        <WireframeScreenViewer />
        <ScreenSpecPanel />
      </div>
    </div>
  );
};
