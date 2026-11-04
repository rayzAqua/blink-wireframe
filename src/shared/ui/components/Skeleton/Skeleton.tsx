import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  /** Number of text lines, only used by the text variant. */
  lines?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-lines ${className}`} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className="skeleton skeleton--text"
            style={{ width: i === lines - 1 ? '60%' : width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`skeleton skeleton--${variant} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
