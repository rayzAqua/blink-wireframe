import React from 'react';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded';

export interface AvatarProps {
  src?: string;
  /** Used for the image alt text and to build the initials fallback. */
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Small status dot in the bottom-right corner. */
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

function initialsOf(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}) => (
  <span className={`avatar avatar--${size} avatar--${shape} ${className}`}>
    {src ? (
      <img className="avatar__image" src={src} alt={name ?? ''} />
    ) : (
      <span className="avatar__initials" aria-label={name}>{initialsOf(name)}</span>
    )}
    {status && <span className={`avatar__status avatar__status--${status}`} />}
  </span>
);
