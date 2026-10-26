import React from 'react';
import {
  Smartphone,
  Layers,
  Building2,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeftOpen,
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
    isSidebarOpen,
    toggleSidebar,
    isSpecOpen,
    toggleSpec,
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
        {viewMode === 'wireframes' && (
          <button
            type="button"
            className={`app-header__toggle-btn ${isSidebarOpen ? 'app-header__toggle-btn--active' : ''}`}
            onClick={toggleSidebar}
            title={isSidebarOpen ? 'Thu gọn danh mục luồng' : 'Mở rộng danh mục luồng'}
            aria-label={isSidebarOpen ? 'Thu gọn danh mục luồng' : 'Mở rộng danh mục luồng'}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        )}

        <div className="app-header__brand">
          <img src={logoImg} alt="Nexlink Blink Logo" className="app-header__logo" />
          <div className="app-header__title-box">
            <span className="app-header__title">Nexlink Blink</span>
            {viewMode === 'wireframes' && (
              <div className="app-header__breadcrumb">
                <span className="app-header__bc-category">{activeInitiative.categoryLabel}</span>
                <span className="app-header__bc-sep">/</span>
                <span className="app-header__bc-init">{activeInitiative.title}</span>
                <span className="app-header__bc-sep">/</span>
                <code className="app-header__bc-screen">{activeScreen.id}</code>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Device Mode Switcher */}
      {viewMode === 'wireframes' && (
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
      )}

      {/* Right Controls: View Mode, Spec Panel Toggle & Theme Toggle */}
      <div className="app-header__right">
        <Button
          variant="secondary"
          size="sm"
          className="app-header__btn-viewmode"
          onClick={() => setViewMode(viewMode === 'wireframes' ? 'design-system' : 'wireframes')}
          title="Chuyển chế độ xem Design System / Wireframes"
        >
          <span className="app-header__btn-text">
            {viewMode === 'wireframes' ? '🎨 Tokens' : '📋 Wireframes'}
          </span>
          <span className="app-header__btn-icon-only">
            {viewMode === 'wireframes' ? '🎨' : '📋'}
          </span>
        </Button>

        {viewMode === 'wireframes' && (
          <Button
            variant={isSpecOpen ? 'primary' : 'secondary'}
            size="sm"
            className="app-header__btn-specs"
            onClick={toggleSpec}
            leftIcon={isSpecOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
            title={isSpecOpen ? 'Ẩn thông số màn hình' : 'Hiện thông số màn hình'}
          >
            <span className="app-header__btn-text">
              {isSpecOpen ? 'Ẩn Specs' : 'Hiện Specs'}
            </span>
          </Button>
        )}

        <button
          type="button"
          className="app-header__icon-btn"
          onClick={toggleTheme}
          aria-label="Đổi giao diện sáng/tối"
          title={theme === 'light' ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng'}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
};
