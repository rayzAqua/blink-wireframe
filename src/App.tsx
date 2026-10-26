import React from 'react';
import { WireframeProvider, useWireframe } from './context/WireframeContext';
import { WireframeLayout } from './layouts/WireframeLayout';
import { AppHeader } from './components/header/AppHeader';
import { DesignSystemShowcase } from './components/showcase/DesignSystemShowcase';
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
