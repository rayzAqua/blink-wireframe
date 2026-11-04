import React, { useState } from 'react';
import {
  Palette,
  Layers,
  Send,
  Phone,
  ArrowRight,
  Building2,
  Users,
  Bell,
  Inbox,
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
  ListGroup,
  ListRow,
  Alert,
  Toast,
  Avatar,
  BottomSheet,
  Switch,
  Checkbox,
  RadioGroup,
  Tabs,
  Stepper,
  Progress,
  Skeleton,
  EmptyState,
  Table,
} from '../../shared/ui';
import { useWireframe } from '../workspace';

export const DesignSystemShowcase: React.FC = () => {
  const { setViewMode } = useWireframe();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('month');
  const [tab, setTab] = useState('active');
  const [toastOpen, setToastOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="showcase-content" style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* 1. PALETTE */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">
          <Palette size={24} style={{ color: 'var(--color-primary)' }} />
          Primary Color — Slate #334155 (xám than trung tính)
        </h2>
        <p className="section-desc">
          Màu chủ đạo trung tính để màu trạng thái và màu môi trường nổi bật. Ở chế độ tối, nút chính đảo sang nền sáng.
        </p>

        <div className="color-grid">
          {[
            { name: 'Primary 50', token: '--color-primary-50', hex: '#f8fafc', lightText: false },
            { name: 'Primary 100', token: '--color-primary-100', hex: '#f1f5f9', lightText: false },
            { name: 'Primary 200', token: '--color-primary-200', hex: '#e2e8f0', lightText: false },
            { name: 'Primary 300', token: '--color-primary-300', hex: '#cbd5e1', lightText: false },
            { name: 'Primary 400', token: '--color-primary-400', hex: '#94a3b8', lightText: true },
            { name: 'Primary 500', token: '--color-primary-500', hex: '#475569', lightText: true },
            { name: 'Primary 600', token: '--color-primary-600', hex: '#3d4a5e', lightText: true },
            { name: 'Primary 700 (Core)', token: '--color-primary-700', hex: '#334155', lightText: true, isCore: true },
            { name: 'Primary 800', token: '--color-primary-800', hex: '#1e293b', lightText: true },
            { name: 'Primary 900', token: '--color-primary-900', hex: '#0f172a', lightText: true },
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
              <Badge variant="primary">#334155</Badge>
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

      {/* 5. EXTENDED COMPONENTS */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Thành Phần Bổ Sung</h2>
        <p className="section-desc">
          Các mẫu giao diện thường gặp trong wireframe: dòng menu, thông báo, bảng chọn, điều khiển chọn, điều hướng, tiến trình, trạng thái tải và rỗng, bảng dữ liệu.
        </p>
        <div className="demo-grid">
          <Card>
            <CardHeader><h3>Dòng menu & Avatar</h3></CardHeader>
            <CardBody className="demo-group">
              <div className="demo-row">
                <Avatar name="Nguyễn An" size="sm" />
                <Avatar name="Lê Hiếu" status="online" />
                <Avatar name="Quán Karaoke" shape="rounded" size="lg" status="busy" />
              </div>
              <ListGroup label="Vận hành quán">
                <ListRow icon={<Building2 size={18} />} title="Thiết lập quán hát" onClick={() => setSheetOpen(true)} />
                <ListRow icon={<Users size={18} />} title="Quản lý nhân sự" description="Mời, phân quyền, kết thúc" onClick={() => undefined} />
                <ListRow icon={<Bell size={18} />} title="Quà tặng" trailing={<Badge variant="neutral">Sắp có</Badge>} onClick={() => setToastOpen(true)} />
              </ListGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3>Thông báo</h3></CardHeader>
            <CardBody className="demo-group">
              <Alert variant="warning" title="Blink cần bạn cập nhật thông tin cơ sở" action={<Button size="sm" variant="secondary">Cập nhật hồ sơ</Button>}>
                Hồ sơ cần bổ sung địa chỉ chi nhánh.
              </Alert>
              <Alert variant="danger" title="Cơ sở đang bị hạn chế">Một số thiết lập đang bị khoá.</Alert>
              <Alert variant="success">Đã lưu thay đổi.</Alert>
              <Alert variant="info" onClose={() => undefined}>Lời mời có hiệu lực 3 ngày.</Alert>
              <div className="demo-row">
                <Button variant="secondary" onClick={() => setToastOpen(true)}>Hiện toast "Sắp có"</Button>
                <Button variant="secondary" onClick={() => setSheetOpen(true)}>Mở bottom sheet</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3>Điều khiển chọn</h3></CardHeader>
            <CardBody className="demo-group">
              <Switch checked={switchOn} onChange={setSwitchOn} label="Nhận đặt phòng" description="Phòng sẽ hiện trong danh sách chọn phòng" />
              <Checkbox checked={checked} onChange={setChecked} label="Cho phép mở phòng khi chờ xác nhận" />
              <RadioGroup
                name="plan-term"
                value={radio}
                onChange={setRadio}
                options={[
                  { value: 'month', label: 'Theo tháng' },
                  { value: 'year', label: 'Theo năm', description: 'Có thể trả góp 12 kỳ' },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3>Điều hướng & Tiến trình</h3></CardHeader>
            <CardBody className="demo-group">
              <Tabs
                value={tab}
                onChange={setTab}
                items={[
                  { value: 'active', label: 'Đang làm', count: 8 },
                  { value: 'paused', label: 'Tạm dừng', count: 1 },
                  { value: 'ended', label: 'Đã nghỉ' },
                ]}
              />
              <Stepper current={1} steps={[{ label: 'Chọn gói' }, { label: 'Thông tin' }, { label: 'Phòng' }, { label: 'Xong' }]} />
              <Progress label="Nhân sự đã dùng" value={60} showValue />
              <Skeleton variant="text" lines={3} />
            </CardBody>
          </Card>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Card>
            <CardHeader><h3>Bảng dữ liệu & Trạng thái rỗng</h3></CardHeader>
            <CardBody className="demo-group">
              <Table
                rowKey={(r) => r.code}
                columns={[
                  { key: 'code', header: 'Mã' },
                  { key: 'name', header: 'Nhân sự' },
                  { key: 'role', header: 'Vai trò' },
                  { key: 'status', header: 'Trạng thái', render: (r) => <Badge variant={r.status === 'Đang làm' ? 'success' : 'neutral'}>{r.status}</Badge> },
                ]}
                rows={[
                  { code: 'NV-001', name: 'Nguyễn An', role: 'Manager', status: 'Đang làm' },
                  { code: 'NV-002', name: 'Lê Hiếu', role: 'Booking', status: 'Tạm dừng' },
                ]}
              />
              <EmptyState
                icon={<Inbox size={28} />}
                title="Chưa có nhân sự"
                description="Mời nhân sự đầu tiên để bắt đầu vận hành chi nhánh."
                action={<Button size="sm">Mời nhân sự</Button>}
              />
            </CardBody>
          </Card>
        </div>
      </section>

      <Toast isOpen={toastOpen} message="Sắp có" onClose={() => setToastOpen(false)} />
      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Chọn chi nhánh">
        <ListGroup>
          <ListRow icon={<Avatar name="Chi nhánh 1" shape="rounded" size="sm" />} title="Chi nhánh Quận 1" description="Đang hoạt động" onClick={() => setSheetOpen(false)} />
          <ListRow icon={<Avatar name="Chi nhánh 2" shape="rounded" size="sm" />} title="Chi nhánh Quận 7" trailing={<Badge variant="warning">Hạn chế</Badge>} onClick={() => setSheetOpen(false)} />
        </ListGroup>
      </BottomSheet>

      {/* 6. BACK TO WIREFRAME VIEWER CALLOUT */}
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
