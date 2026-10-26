import React, { useState } from 'react';
import {
  Phone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useWireframe } from '../../context/WireframeContext';
import {
  DeviceFrame,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Modal,
} from '../../design-system';
import './WireframeScreenViewer.css';

export const WireframeScreenViewer: React.FC = () => {
  const { activeInitiative, activeScreen, deviceType, selectScreen } = useWireframe();

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleInputChange = (field: string, val: string) => {
    setInputValues((prev) => ({ ...prev, [field]: val }));
  };

  const getEnvBadge = () => {
    switch (activeScreen.environment) {
      case 'FLUTTER_APP':
        return <Badge variant="env-flutter" withDot>📱 FLUTTER APP</Badge>;
      case 'REACT_PWA':
        return <Badge variant="env-react" withDot>🖥️ REACT PWA</Badge>;
      case 'WEB_PUBLIC':
        return <Badge variant="env-public" withDot>🌐 WEB CÔNG KHAI</Badge>;
      case 'ADMIN_UI':
        return <Badge variant="env-admin" withDot>🖥️ ADMIN UI</Badge>;
      default:
        return <Badge variant="env-transition" withDot>↗️ CHUYỂN TIẾP</Badge>;
    }
  };

  // Determine URL to display in Browser/Admin frame
  const getSimulatedUrl = () => {
    if (activeScreen.environment === 'ADMIN_UI') {
      return `https://admin.blink.nexlink.vn/${activeInitiative.id}`;
    }
    if (activeScreen.environment === 'WEB_PUBLIC') {
      return `blink.nexlink.vn/invite/branch-karaoke#token-3days`;
    }
    return `blink.nexlink.vn/${activeInitiative.id}/${activeScreen.id.toLowerCase()}`;
  };

  // --------------------------------------------------------------------------
  // RENDER DYNAMIC MOCKUP BASED ON SCREEN SPECIFICATION
  // --------------------------------------------------------------------------
  const renderScreenMockup = () => {
    // SPECIAL CASE 1: PUB-01 (Xem lời mời từ đường link công khai)
    if (activeScreen.id === 'PUB-01') {
      return (
        <div className="mockup-content">
          <div className="mockup-header-nav">
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>🌐 Web Công Khai</span>
            <Badge variant="warning" withDot>Thời hạn 3 ngày</Badge>
          </div>

          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, #d81467 100%)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 12px',
              fontSize: '26px',
              fontWeight: 'bold',
              boxShadow: 'var(--shadow-primary)',
            }}>
              K
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Lời Mời Quản Lý Chi Nhánh</h3>
            <p style={{ fontSize: '0.875rem' }}>Cơ sở: <strong>Karaoke Blink Sài Gòn</strong></p>
          </div>

          <Card variant="glass" highlightPrimary>
            <CardBody className="mockup-data-card">
              <div className="mockup-data-row">
                <span className="mockup-data-label">Vị trí:</span>
                <span className="mockup-data-value" style={{ color: 'var(--color-primary)' }}>Quản lý chi nhánh</span>
              </div>
              <div className="mockup-data-row">
                <span className="mockup-data-label">Người gửi:</span>
                <span className="mockup-data-value">Nguyễn Văn Owner</span>
              </div>
              <div className="mockup-data-row">
                <span className="mockup-data-label">Địa chỉ:</span>
                <span className="mockup-data-value">123 Nguyễn Thị Minh Khai, Q.1</span>
              </div>
              <div className="mockup-data-row">
                <span className="mockup-data-label">Số điện thoại mời:</span>
                <span className="mockup-data-value">0912 ••• 678</span>
              </div>
              <div className="mockup-data-row">
                <span className="mockup-data-label">Thời hạn:</span>
                <span className="mockup-data-value" style={{ color: 'var(--color-warning)' }}>Còn 2 ngày 23 giờ</span>
              </div>
            </CardBody>
          </Card>

          <div className="mockup-actions">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => selectScreen('PUB-02')}
              rightIcon={<ExternalLink size={16} />}
            >
              Mở ứng dụng Blink
            </Button>
            <Button
              variant="outline"
              fullWidth
              size="md"
              onClick={() => selectScreen('PUB-02')}
            >
              Tiếp tục trên web
            </Button>
          </div>

          <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--color-text-subtle)' }}>
            Không hiển thị nhân sự, doanh thu hoặc cấu hình vận hành nội bộ.
          </p>
        </div>
      );
    }

    // SPECIAL CASE 2: DESKTOP ADMIN UI SCREENS (SUB-01, AUD-01, etc.)
    if (activeScreen.environment === 'ADMIN_UI') {
      return (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge variant="env-admin">🖥️ ADMIN UI</Badge>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  Mã: {activeScreen.id}
                </span>
              </div>
              <h2 style={{ fontSize: '1.4rem', marginTop: '6px' }}>{activeScreen.title}</h2>
              <p style={{ fontSize: '0.85rem' }}>{activeScreen.objective}</p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (activeScreen.nextScreen) selectScreen(activeScreen.nextScreen);
              }}
            >
              {activeScreen.primaryAction}
            </Button>
          </div>

          {/* Admin Sample Data Table / Grid */}
          <Card>
            <CardHeader>
              <h4>Danh Sách Dữ Liệu Quản Trị Hệ Thống</h4>
              <Badge variant="primary">{activeInitiative.title}</Badge>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeScreen.visibleData.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{item}</span>
                    <Badge variant="success">Hoạt động</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }

    // STANDARD MOBILE APP WIREFRAME MOCKUP (OWN-01, REG-01, STF-01, etc.)
    return (
      <div className="mockup-content">
        {/* Screen Top Bar */}
        <div className="mockup-header-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
              {activeScreen.id}
            </span>
          </div>
          {getEnvBadge()}
        </div>

        {/* Title & Context */}
        <div className="mockup-hero">
          <h3 style={{ fontSize: '1.15rem' }}>{activeScreen.title}</h3>
          <p style={{ fontSize: '0.8rem' }}>{activeScreen.objective}</p>
        </div>

        {/* User Input Section (if required for this screen) */}
        {activeScreen.userInput && activeScreen.userInput.length > 0 && (
          <Card highlightPrimary>
            <CardBody style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                Dữ Liệu Người Dùng Nhập
              </span>

              {activeScreen.userInput.map((field, idx) => {
                const isPhone = field.toLowerCase().includes('số điện thoại') || field.toLowerCase().includes('sđt');
                const isReason = field.toLowerCase().includes('lý do');

                if (isPhone) {
                  return (
                    <Input
                      key={idx}
                      label={field}
                      required
                      prefix={<Phone size={16} />}
                      placeholder="0912 345 678"
                      value={inputValues[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      helperText="Lời mời có hiệu lực 3 ngày và người nhận phải xác minh đúng số."
                    />
                  );
                }

                if (isReason) {
                  return (
                    <Textarea
                      key={idx}
                      label={field}
                      required
                      placeholder="Nhập lý do bắt buộc (1 - 500 ký tự)..."
                      value={inputValues[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  );
                }

                return (
                  <Input
                    key={idx}
                    label={field}
                    placeholder={`Nhập ${field.toLowerCase()}...`}
                    value={inputValues[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                );
              })}
            </CardBody>
          </Card>
        )}

        {/* Visible Information Card */}
        {activeScreen.visibleData && activeScreen.visibleData.length > 0 && (
          <Card variant="glass">
            <CardBody className="mockup-data-card" style={{ padding: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Thông Tin Hiển Thị
              </span>
              {activeScreen.visibleData.map((data, idx) => (
                <div key={idx} className="mockup-data-row">
                  <span className="mockup-data-label">{data}:</span>
                  <span className="mockup-data-value">
                    {idx === 0 ? 'Karaoke Blink Sài Gòn' : idx === 1 ? '123 Nguyễn Thị Minh Khai' : 'Hợp lệ'}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>
        )}

        {/* Actions Footer */}
        <div className="mockup-actions">
          <Button
            variant="primary"
            fullWidth
            size="md"
            onClick={() => {
              if (activeScreen.nextScreen) {
                selectScreen(activeScreen.nextScreen);
              } else {
                setActiveModal('confirm');
              }
            }}
          >
            {activeScreen.primaryAction}
          </Button>

          {activeScreen.secondaryActions && activeScreen.secondaryActions.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {activeScreen.secondaryActions.map((sec, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    if (sec.includes('→')) {
                      const nextId = sec.split('→')[1]?.trim();
                      if (nextId) selectScreen(nextId);
                    }
                  }}
                >
                  {sec}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="screen-viewer">
      {/* Viewer Top Toolbar */}
      <div className="screen-viewer__toolbar">
        <div className="screen-viewer__title-area">
          <span className="screen-viewer__badge">{activeScreen.id}</span>
          <div>
            <h2 className="screen-viewer__screen-title">{activeScreen.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <span>Actor: <strong>{activeScreen.actor}</strong></span>
              <span>•</span>
              <span>Điểm vào: {activeScreen.entryPoint}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getEnvBadge()}
        </div>
      </div>

      {/* Device Frame Simulator Canvas */}
      <DeviceFrame
        type={deviceType}
        title={`${activeScreen.id} • ${activeScreen.title}`}
        url={getSimulatedUrl()}
      >
        {renderScreenMockup()}
      </DeviceFrame>

      {/* Confirmation Modal */}
      <Modal
        isOpen={activeModal === 'confirm'}
        onClose={() => setActiveModal(null)}
        title={`Xác nhận thao tác [${activeScreen.id}]`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setActiveModal(null)}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert(`Thao tác [${activeScreen.primaryAction}] đã được thực hiện an toàn!`);
                setActiveModal(null);
              }}
              leftIcon={<CheckCircle2 size={16} />}
            >
              Xác nhận
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
          Hệ thống sẽ thực hiện hành động: <strong>{activeScreen.primaryAction}</strong> theo đúng quy tắc nghiệp vụ wireframe.
        </p>
      </Modal>
    </main>
  );
};
