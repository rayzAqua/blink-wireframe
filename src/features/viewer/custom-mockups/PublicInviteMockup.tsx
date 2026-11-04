import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge, Button, Card, CardBody } from '../../../shared/ui';
import type { MockupProps } from './types';

/** Public invitation page shown to someone who opens an invitation link (screen PUB-01). */
export const PublicInviteMockup: React.FC<MockupProps> = ({ selectScreen }) => (
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
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-active) 100%)',
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
