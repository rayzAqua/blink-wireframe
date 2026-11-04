import React from 'react';
import './Progress.css';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  /** Value from 0 to 100. */
  value: number;
  variant?: ProgressVariant;
  label?: React.ReactNode;
  showValue?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'primary',
  label,
  showValue = false,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`progress ${className}`}>
      {(label || showValue) && (
        <div className="progress__meta">
          {label && <span className="progress__label">{label}</span>}
          {showValue && <span className="progress__value">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
      >
        <div className={`progress__bar progress__bar--${variant}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
};
