import React, { useEffect } from 'react';
import './Toast.css';

export type ToastVariant = 'neutral' | 'success' | 'warning' | 'danger';

export interface ToastProps {
  isOpen: boolean;
  message: React.ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before the toast closes itself. Use 0 to keep it open. */
  duration?: number;
  onClose: () => void;
  /** Position inside the nearest positioned parent (for example a device frame). */
  inline?: boolean;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  variant = 'neutral',
  duration = 2500,
  onClose,
  inline = false,
  className = '',
}) => {
  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`toast toast--${variant} ${inline ? 'toast--inline' : ''} ${className}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
