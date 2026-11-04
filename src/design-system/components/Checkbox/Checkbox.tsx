import React from 'react';
import { Check, Minus } from 'lucide-react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Shows a dash instead of a tick, for a "some selected" state. */
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  indeterminate = false,
  disabled,
  className = '',
  ...props
}) => (
  <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''} ${className}`}>
    <input
      type="checkbox"
      className="checkbox__input"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
    <span className="checkbox__box" aria-hidden="true">
      {indeterminate ? <Minus size={14} strokeWidth={3} /> : <Check size={14} strokeWidth={3} />}
    </span>
    {(label || description) && (
      <span className="checkbox__text">
        {label && <span className="checkbox__label">{label}</span>}
        {description && <span className="checkbox__description">{description}</span>}
      </span>
    )}
  </label>
);
