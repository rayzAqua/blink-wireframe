import React from 'react';
import {
  Smartphone,
  Layers,
  Building2,
  Moon,
  Sun,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from 'lucide-react';
import { useWireframe } from '../../context/WireframeContext';
import { Button, SegmentedControl } from '../../design-system';
import type { DeviceType } from '../../design-system';
import logoImg from '../../assets/logo_image.png';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const {
    activeInitiative,
    activeScreen,
    deviceType,
    setDeviceType,
    isAutoDevice,
    setIsAutoDevice,
    theme,
    toggleTheme,
    isSpecOpen,
    setIsSpecOpen,
    viewMode,
    setViewMode,
  } = useWireframe();

  const handleDeviceChange = (val: string) => {
    if (val === 'auto') {
      setIsAutoDevice(true);
    } else {
      setDeviceType(val as DeviceType);
    }
  };

  const currentSegmentValue = isAutoDevice ? 'auto' : deviceType;

  return (
    <header className="app-header">
      {/* Brand & Breadcrumb */}
      <div className="app-header__left">
        <div className="app-header__brand">
          <img src={logoImg} alt="Nexlink Blink Logo" className="app-header__logo" />
          <div className="app-header__title-box">
            <span className="app-header__title">Nexlink Blink</span>
            <div className="app-header__breadcrumb">
              <span>{activeInitiative.categoryLabel}</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{activeInitiative.title}</span>
              <span>/</span>
              <code>{activeScreen.id}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Device Mode Switcher */}
      <div className="app-header__center">
        <SegmentedControl
          value={currentSegmentValue}
          onChange={handleDeviceChange}
          options={[
            {
              value: 'auto',
              label: 'Tự động',
              icon: <Sparkles size={13} style={{ color: 'var(--color-primary)' }} />,
            },
            {
              value: 'mobile',
              label: 'Mobile App',
              icon: <Smartphone size={13} />,
            },
            {
              value: 'browser',
              label: 'Mobile Web',
              icon: <Layers size={13} />,
            },
            {
              value: 'admin',
              label: 'Desktop Admin',
              icon: <Building2 size={13} />,
            },
          ]}
        />
      </div>

      {/* Right Controls: View Mode, Spec Panel Toggle & Theme Toggle */}
      <div className="app-header__right">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setViewMode(viewMode === 'wireframes' ? 'design-system' : 'wireframes')}
        >
          {viewMode === 'wireframes' ? '🎨 Design Tokens' : '📋 Wireframe Viewer'}
        </Button>

        {viewMode === 'wireframes' && (
          <Button
            variant={isSpecOpen ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsSpecOpen(!isSpecOpen)}
            leftIcon={isSpecOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
          >
            {isSpecOpen ? 'Ẩn Specs' : 'Hiện Specs'}
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={toggleTheme}
          aria-label="Đổi giao diện sáng/tối"
          leftIcon={theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        >
          {theme === 'light' ? 'Tối' : 'Sáng'}
        </Button>
      </div>
    </header>
  );
};
