import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  isInteractive?: boolean;
  highlightPrimary?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  isInteractive = false,
  highlightPrimary = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    isInteractive ? 'card--interactive' : '',
    highlightPrimary ? 'card--primary-highlight' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => <div className={`card__header ${className}`} {...props}>{children}</div>;

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => <div className={`card__body ${className}`} {...props}>{children}</div>;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => <div className={`card__footer ${className}`} {...props}>{children}</div>;
