import React from 'react';
import './Radio.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  onChange?: () => void;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  description,
  disabled,
  className = '',
  ...props
}) => (
  <label className={`radio ${disabled ? 'radio--disabled' : ''} ${className}`}>
    <input type="radio" className="radio__input" disabled={disabled} {...props} />
    <span className="radio__circle" aria-hidden="true" />
    {(label || description) && (
      <span className="radio__text">
        {label && <span className="radio__label">{label}</span>}
        {description && <span className="radio__description">{description}</span>}
      </span>
    )}
  </label>
);

export interface RadioOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  name: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function RadioGroup<T extends string = string>({
  name,
  options,
  value,
  onChange,
  className = '',
}: RadioGroupProps<T>) {
  return (
    <div className={`radio-group ${className}`} role="radiogroup">
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          disabled={opt.disabled}
          checked={opt.value === value}
          onChange={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
