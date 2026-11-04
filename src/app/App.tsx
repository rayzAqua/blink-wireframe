import React from 'react';
import { WireframeProvider, useWireframe } from '../features/workspace';
import { WireframeLayout } from './WireframeLayout';
import { AppHeader } from './header/AppHeader';
import { DesignSystemShowcase } from '../features/design-system-view';
import './App.css';

const AppContent: React.FC = () => {
  const { viewMode } = useWireframe();

  if (viewMode === 'design-system') {
    return (
      <div className="showcase">
        <AppHeader />
        <DesignSystemShowcase />
      </div>
    );
  }

  return <WireframeLayout />;
};

export function App() {
  return (
    <WireframeProvider>
      <AppContent />
    </WireframeProvider>
  );
}

export default App;
