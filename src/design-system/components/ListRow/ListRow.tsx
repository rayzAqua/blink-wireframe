import React from 'react';
import { ChevronRight } from 'lucide-react';
import './ListRow.css';

export interface ListRowProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Small element shown before the chevron, for example a Badge. */
  trailing?: React.ReactNode;
  showChevron?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

export const ListRow: React.FC<ListRowProps> = ({
  icon,
  title,
  description,
  trailing,
  showChevron,
  disabled = false,
  danger = false,
  onClick,
  className = '',
  ...props
}) => {
  const interactive = Boolean(onClick);
  const chevron = showChevron ?? interactive;
  const classes = [
    'list-row',
    interactive ? 'list-row--interactive' : '',
    disabled ? 'list-row--disabled' : '',
    danger ? 'list-row--danger' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="list-row__icon">{icon}</span>}
      <span className="list-row__text">
        <span className="list-row__title">{title}</span>
        {description && <span className="list-row__description">{description}</span>}
      </span>
      {trailing && <span className="list-row__trailing">{trailing}</span>}
      {chevron && <ChevronRight size={18} className="list-row__chevron" />}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={classes} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
};

export interface ListGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const ListGroup: React.FC<ListGroupProps> = ({ label, children, className = '' }) => (
  <section className={`list-group ${className}`}>
    {label && <h4 className="list-group__label">{label}</h4>}
    <div className="list-group__items">{children}</div>
  </section>
);
