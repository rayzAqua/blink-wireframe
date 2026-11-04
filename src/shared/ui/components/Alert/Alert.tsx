import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps {
  variant?: AlertVariant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  /** Action area, for example a Button. */
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle2 size={18} />,
  warning: <AlertTriangle size={18} />,
  danger: <XCircle size={18} />,
  neutral: <Info size={18} />,
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onClose,
  className = '',
}) => (
  <div className={`alert alert--${variant} ${className}`} role="alert">
    <span className="alert__icon">{icon ?? DEFAULT_ICONS[variant]}</span>
    <div className="alert__content">
      {title && <p className="alert__title">{title}</p>}
      {children && <div className="alert__body">{children}</div>}
      {action && <div className="alert__action">{action}</div>}
    </div>
    {onClose && (
      <button type="button" className="alert__close" onClick={onClose} aria-label="Đóng">
        <X size={16} />
      </button>
    )}
  </div>
);
