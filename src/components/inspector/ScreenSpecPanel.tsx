import React from 'react';
import {
  FileText,
  User,
  LogIn,
  Eye,
  Keyboard,
  ArrowRightCircle,
  AlertCircle,
  ShieldAlert,
  FolderGit2,
} from 'lucide-react';
import { useWireframe } from '../../context/WireframeContext';
import { Badge } from '../../design-system';
import './ScreenSpecPanel.css';

export const ScreenSpecPanel: React.FC = () => {
  const { activeInitiative, activeScreen, isSpecOpen } = useWireframe();

  if (!isSpecOpen) return null;

  const getEnvBadge = (env: string) => {
    switch (env) {
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

  return (
    <aside className="spec-panel">
      <div className="spec-panel__header">
        <div className="spec-panel__title">
          <FileText size={16} style={{ color: 'var(--color-primary)' }} />
          <span>Thông Số Wireframe</span>
        </div>
        <span className="spec-pill">{activeScreen.id}</span>
      </div>

      <div className="spec-panel__content">
        {/* Screen Title & Environment */}
        <div className="spec-block">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
              {activeScreen.id}
            </span>
            {getEnvBadge(activeScreen.environment)}
          </div>
          <h3 style={{ fontSize: '1.05rem', lineHeight: 1.25 }}>{activeScreen.title}</h3>
        </div>

        {/* Actor */}
        <div className="spec-block">
          <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={12} />
            Người Thao Tác
          </div>
          <div className="spec-block__value" style={{ fontWeight: 600 }}>
            {activeScreen.actor}
          </div>
        </div>

        {/* Entry Point */}
        <div className="spec-block">
          <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LogIn size={12} />
            Điểm Vào Luồng
          </div>
          <div className="spec-block__value" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {activeScreen.entryPoint}
          </div>
        </div>

        {/* Objective */}
        <div className="spec-block">
          <div className="spec-block__label">Mục Đích Màn Hình</div>
          <div className="spec-block__value" style={{ fontSize: '13px' }}>
            {activeScreen.objective}
          </div>
        </div>

        {/* Visible Data */}
        {activeScreen.visibleData && activeScreen.visibleData.length > 0 && (
          <div className="spec-block">
            <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} />
              Dữ Liệu Nhìn Thấy
            </div>
            <ul className="spec-list">
              {activeScreen.visibleData.map((item, idx) => (
                <li key={idx} className="spec-list__item">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* User Input */}
        {activeScreen.userInput && activeScreen.userInput.length > 0 && (
          <div className="spec-block">
            <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Keyboard size={12} />
              Dữ Liệu Người Dùng Nhập
            </div>
            <ul className="spec-list">
              {activeScreen.userInput.map((item, idx) => (
                <li key={idx} className="spec-list__item" style={{ color: 'var(--color-primary-700)', fontWeight: 500 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions & Next */}
        <div className="spec-block">
          <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowRightCircle size={12} />
            Thao Tác & Điều Hướng
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            <div>
              <strong style={{ color: 'var(--color-primary)' }}>Chính:</strong> {activeScreen.primaryAction}
            </div>
            {activeScreen.secondaryActions && activeScreen.secondaryActions.map((sec, idx) => (
              <div key={idx} style={{ color: 'var(--color-text-muted)' }}>
                <strong>Phụ:</strong> {sec}
              </div>
            ))}
          </div>
        </div>

        {/* Errors & Outcomes */}
        {activeScreen.errorsOrOutcomes && activeScreen.errorsOrOutcomes.length > 0 && (
          <div className="spec-block">
            <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-warning)' }}>
              <AlertCircle size={12} />
              Xử Lý Lỗi & Kết Quả
            </div>
            <ul className="spec-list">
              {activeScreen.errorsOrOutcomes.map((item, idx) => (
                <li key={idx} className="spec-list__item" style={{ color: 'var(--color-text-muted)' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Audit Note */}
        {activeScreen.auditNote && (
          <div className="spec-block" style={{ padding: '8px', background: 'var(--color-primary-subtle)', borderRadius: '6px' }}>
            <div className="spec-block__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}>
              <ShieldAlert size={12} />
              Admin Audit
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-primary-800)', marginTop: '2px' }}>
              {activeScreen.auditNote}
            </div>
          </div>
        )}

        {/* Initiative Source Link */}
        <div className="spec-block" style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-text-subtle)' }}>
            <FolderGit2 size={13} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeInitiative.folderPath}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
