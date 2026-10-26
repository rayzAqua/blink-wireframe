import React, { useState } from 'react';
import {
  Palette,
  Layers,
  Send,
  Phone,
  ArrowRight,
} from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
} from '../../design-system';
import { useWireframe } from '../../context/WireframeContext';

export const DesignSystemShowcase: React.FC = () => {
  const { setViewMode } = useWireframe();
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <div className="showcase-content" style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* 1. PALETTE */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">
          <Palette size={24} style={{ color: 'var(--color-primary)' }} />
          Primary Color — #EF227B (Blink Brand)
        </h2>
        <p className="section-desc">
          Thang màu chủ đạo từ sắc độ 50 đến 950 được tinh chỉnh riêng cho nhận diện thương hiệu Blink.
        </p>

        <div className="color-grid">
          {[
            { name: 'Primary 50', token: '--color-primary-50', hex: '#fdf2f7', lightText: false },
            { name: 'Primary 100', token: '--color-primary-100', hex: '#fce7f2', lightText: false },
            { name: 'Primary 200', token: '--color-primary-200', hex: '#fbcfe5', lightText: false },
            { name: 'Primary 300', token: '--color-primary-300', hex: '#f9a8cf', lightText: false },
            { name: 'Primary 400', token: '--color-primary-400', hex: '#f472af', lightText: true },
            { name: 'Primary 500 (Core)', token: '--color-primary-500', hex: '#EF227B', lightText: true, isCore: true },
            { name: 'Primary 600', token: '--color-primary-600', hex: '#d81467', lightText: true },
            { name: 'Primary 700', token: '--color-primary-700', hex: '#b50b52', lightText: true },
            { name: 'Primary 800', token: '--color-primary-800', hex: '#960d45', lightText: true },
            { name: 'Primary 900', token: '--color-primary-900', hex: '#7d103d', lightText: true },
          ].map((item) => (
            <div key={item.name} className="color-card">
              <div
                className="color-swatch"
                style={{
                  backgroundColor: `var(${item.token})`,
                  color: item.lightText ? '#ffffff' : '#0f172a',
                  fontWeight: item.isCore ? 700 : 500,
                }}
              >
                {item.isCore && <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>CORE</span>}
              </div>
              <div className="color-info">
                <span className="color-name">{item.name}</span>
                <span className="color-hex">{item.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ENVIRONMENT BADGES */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">
          <Layers size={24} style={{ color: 'var(--color-primary)' }} />
          Nhãn Môi Trường Hiển Thị (Wireframe Specs)
        </h2>
        <p className="section-desc">
          Các nhãn phân định vị trí hiển thị theo chuẩn tài liệu BBN-059: Flutter App, React PWA, Web Công Khai, Chuyển Tiếp và Admin UI.
        </p>

        <div className="demo-row">
          <Badge variant="env-flutter" withDot>📱 FLUTTER APP</Badge>
          <Badge variant="env-react" withDot>🖥️ REACT PWA</Badge>
          <Badge variant="env-public" withDot>🌐 WEB CÔNG KHAI</Badge>
          <Badge variant="env-transition" withDot>↗️ CHUYỂN TIẾP</Badge>
          <Badge variant="env-admin" withDot>🖥️ ADMIN UI</Badge>
        </div>
      </section>

      {/* 3. SEMANTIC BADGES */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Trạng Thái Nghiệp Vụ (Semantic Badges)</h2>
        <p className="section-desc">
          Ngôn ngữ trạng thái thân thiện theo quy tắc wireframe: Chờ xác nhận, Đang hoàn thiện, Đã hoàn tất, Từ chối, Thu hồi, Hết hạn.
        </p>

        <div className="demo-row">
          <Badge variant="warning" withDot>Chờ xác nhận</Badge>
          <Badge variant="info" withDot>Đang hoàn thiện hồ sơ</Badge>
          <Badge variant="success" withDot>Đã hoàn tất</Badge>
          <Badge variant="danger" withDot>Đã từ chối</Badge>
          <Badge variant="neutral" withDot>Đã thu hồi</Badge>
          <Badge variant="neutral" withDot>Đã hết hạn</Badge>
          <Badge variant="primary" withDot>Đang hoạt động</Badge>
          <Badge variant="warning" withDot>Tạm dừng</Badge>
        </div>
      </section>

      {/* 4. BUTTONS & FORMS */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Thành Phần Giao Diện (UI Controls)</h2>
        <div className="demo-grid">
          <Card highlightPrimary>
            <CardHeader>
              <h3>Nút Thao Tác (Button System)</h3>
              <Badge variant="primary">#EF227B</Badge>
            </CardHeader>
            <CardBody className="demo-group">
              <div className="demo-row">
                <Button variant="primary" leftIcon={<Send size={15} />}>Tạo lời mời</Button>
                <Button variant="secondary">Quay lại</Button>
                <Button variant="outline">Sao chép link</Button>
                <Button variant="danger">Thu hồi</Button>
              </div>

              <div className="demo-row" style={{ marginTop: '12px' }}>
                <Button size="sm">Nhỏ (sm)</Button>
                <Button size="md">Vừa (md)</Button>
                <Button size="lg">Lớn (lg)</Button>
              </div>

              <div style={{ marginTop: '12px' }}>
                <Button
                  variant="primary"
                  fullWidth
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 800);
                  }}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Kiểm tra hiệu ứng loading
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3>Biểu Mẫu & Trường Dữ Liệu</h3>
              <Badge variant="neutral">Form Controls</Badge>
            </CardHeader>
            <CardBody className="demo-group">
              <Input
                label="Số điện thoại người nhận"
                required
                prefix={<Phone size={16} />}
                placeholder="0912 345 678"
                helperText="Lời mời có hiệu lực 3 ngày và yêu cầu xác minh đúng số."
              />

              <Select
                label="Vị trí bổ nhiệm"
                required
                options={[
                  { value: 'manager', label: 'Quản lý chi nhánh (Manager)' },
                  { value: 'vice_manager', label: 'Phó quản lý (Vice Manager)' },
                  { value: 'booking', label: 'Nhân sự Đặt phòng (Booking)' },
                  { value: 'receptionist', label: 'Lễ tân (Receptionist)' },
                ]}
              />

              <Textarea
                label="Lý do thao tác"
                required
                placeholder="Nhập lý do bắt buộc (1 - 500 ký tự)..."
                helperText="Mọi thao tác thay đổi quyền hoặc thu hồi đều bắt buộc lưu lý do an toàn."
              />
            </CardBody>
          </Card>
        </div>
      </section>

      {/* 5. BACK TO WIREFRAME VIEWER CALLOUT */}
      <Card variant="glass" highlightPrimary>
        <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Khám phá 15 Nghiệp vụ Wireframe</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Trải nghiệm tương tác toàn bộ các màn hình được chuẩn hóa bên trong khung thiết bị Mobile App, Mobile Browser và Desktop Admin.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setViewMode('wireframes')}
            rightIcon={<ArrowRight size={18} />}
          >
            Mở Trình Xem Wireframe
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
