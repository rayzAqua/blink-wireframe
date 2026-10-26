import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    isLoading ? 'btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
