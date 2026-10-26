import React from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'env-flutter'
  | 'env-react'
  | 'env-public'
  | 'env-admin'
  | 'env-transition';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  withDot = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <span className={`badge badge--${variant} ${className}`} {...props}>
      {withDot && <span className="badge__dot" />}
      {icon && <span className="badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
