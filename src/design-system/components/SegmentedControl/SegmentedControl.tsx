import React from 'react';
import './SegmentedControl.css';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  fullWidth = false,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`segmented-control ${fullWidth ? 'segmented-control--full' : ''} ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`segmented-control__item ${isActive ? 'segmented-control__item--active' : ''}`}
            onClick={() => onChange(opt.value)}
            title={typeof opt.label === 'string' ? opt.label : undefined}
          >
            {opt.icon && <span className="segmented-control__icon">{opt.icon}</span>}
            <span className="segmented-control__label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
