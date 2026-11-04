import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './BottomSheet.css';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Stay inside the nearest positioned parent (for example a device frame) instead of the whole window. */
  inline?: boolean;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  inline = false,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`bottom-sheet-backdrop ${inline ? 'bottom-sheet-backdrop--inline' : ''}`}
      onClick={onClose}
    >
      <div
        className={`bottom-sheet ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className="bottom-sheet__handle" />
        {title && (
          <div className="bottom-sheet__header">
            <h3 className="bottom-sheet__title">{title}</h3>
            <button type="button" className="bottom-sheet__close" onClick={onClose} aria-label="Đóng">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="bottom-sheet__body">{children}</div>
        {footer && <div className="bottom-sheet__footer">{footer}</div>}
      </div>
    </div>
  );
};
