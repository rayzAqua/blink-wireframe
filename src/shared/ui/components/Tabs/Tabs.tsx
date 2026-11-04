import React from 'react';
import './Tabs.css';

export interface TabItem<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Small count shown after the label, for example a number of items. */
  count?: number;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  fullWidth = false,
  className = '',
}: TabsProps<T>) {
  return (
    <div className={`tabs ${fullWidth ? 'tabs--full' : ''} ${className}`} role="tablist">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            className={`tabs__item ${isActive ? 'tabs__item--active' : ''}`}
            onClick={() => onChange(item.value)}
          >
            {item.icon && <span className="tabs__icon">{item.icon}</span>}
            <span>{item.label}</span>
            {item.count !== undefined && <span className="tabs__count">{item.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
