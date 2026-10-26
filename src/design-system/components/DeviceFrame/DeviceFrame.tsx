import React from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Lock,
  ChevronLeft,
  ChevronRight,
  Share,
  RotateCw,
  Copy,
} from 'lucide-react';
import './DeviceFrame.css';

export type DeviceType = 'mobile' | 'browser' | 'admin' | 'none';

export interface DeviceFrameProps {
  type?: DeviceType;
  title?: string;
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  type = 'mobile',
  title = 'Nexlink Blink',
  url = 'https://blink.nexlink.vn/branch/invite',
  children,
  className = '',
}) => {
  if (type === 'none') {
    return <div className={`device-container ${className}`}>{children}</div>;
  }

  // 1. Mobile Native App Frame (📱 FLUTTER APP)
  if (type === 'mobile') {
    return (
      <div className={`device-container ${className}`}>
        <div className="device-phone">
          {/* Dynamic Island */}
          <div className="device-phone__notch">
            <div className="device-phone__camera" />
          </div>

          {/* Status Bar */}
          <div className="device-phone__status-bar">
            <span>9:41</span>
            <div className="device-phone__status-icons">
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={16} />
            </div>
          </div>

          {/* Native Screen Content */}
          <div className="device-phone__screen">{children}</div>

          {/* Home Indicator */}
          <div className="device-phone__home-bar">
            <div className="device-phone__home-indicator" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Mobile Web Browser Frame (🌐 WEB CÔNG KHAI / 🖥️ REACT PWA trên Mobile)
  if (type === 'browser') {
    return (
      <div className={`device-container ${className}`}>
        <div className="device-phone">
          {/* Dynamic Island */}
          <div className="device-phone__notch">
            <div className="device-phone__camera" />
          </div>

          {/* Status Bar */}
          <div className="device-phone__status-bar">
            <span>9:41</span>
            <div className="device-phone__status-icons">
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={16} />
            </div>
          </div>

          {/* Mobile Browser URL Bar */}
          <div className="device-mobile-browser__top-bar">
            <div className="device-mobile-browser__url-pill">
              <Lock size={12} />
              <span className="device-mobile-browser__url-text">{url}</span>
            </div>
            <div className="device-mobile-browser__action-icon" title="Tải lại trang">
              <RotateCw size={14} />
            </div>
          </div>

          {/* Web Content */}
          <div className="device-phone__screen">{children}</div>

          {/* Mobile Browser Bottom Navigation Toolbar */}
          <div className="device-mobile-browser__bottom-bar">
            <button type="button" className="device-mobile-browser__nav-btn" aria-label="Quay lại">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="device-mobile-browser__nav-btn" aria-label="Tiến tới">
              <ChevronRight size={18} />
            </button>
            <button type="button" className="device-mobile-browser__nav-btn" aria-label="Chia sẻ">
              <Share size={16} />
            </button>
            <button type="button" className="device-mobile-browser__nav-btn" aria-label="Sao chép link">
              <Copy size={16} />
            </button>
          </div>

          {/* Home Indicator */}
          <div className="device-phone__home-bar">
            <div className="device-phone__home-indicator" />
          </div>
        </div>
      </div>
    );
  }

  // 3. Desktop Frame (🖥️ ADMIN UI dành riêng cho Blink Admin)
  return (
    <div className={`device-container ${className}`}>
      <div className="device-frame--admin">
        <div className="device-admin__header">
          <div className="device-admin__dots">
            <div className="device-admin__dot device-admin__dot--red" />
            <div className="device-admin__dot device-admin__dot--yellow" />
            <div className="device-admin__dot device-admin__dot--green" />
          </div>

          <div className="device-admin__url-bar">
            <Lock size={12} />
            <span>{url}</span>
          </div>

          <span className="device-admin__title">
            {title}
          </span>
        </div>

        <div className="device-admin__screen">{children}</div>
      </div>
    </div>
  );
};
