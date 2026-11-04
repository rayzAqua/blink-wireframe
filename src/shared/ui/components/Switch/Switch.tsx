import React from 'react';
import './Switch.css';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => (
  <label className={`switch ${disabled ? 'switch--disabled' : ''} ${className}`}>
    {(label || description) && (
      <span className="switch__text">
        {label && <span className="switch__label">{label}</span>}
        {description && <span className="switch__description">{description}</span>}
      </span>
    )}
    <input
      type="checkbox"
      role="switch"
      className="switch__input"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="switch__track" aria-hidden="true">
      <span className="switch__thumb" />
    </span>
  </label>
);
