import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  required,
  error,
  helperText,
  prefix,
  suffix,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required">*</span>}
        </label>
      )}
      <div
        className={`input-wrapper ${error ? 'input-wrapper--error' : ''} ${
          disabled ? 'input-wrapper--disabled' : ''
        }`}
      >
        {prefix && <span className="input-addon input-addon--prefix">{prefix}</span>}
        <input
          id={inputId}
          className="input-field"
          disabled={disabled}
          {...props}
        />
        {suffix && <span className="input-addon input-addon--suffix">{suffix}</span>}
      </div>
      {error ? (
        <span className="input-helper input-helper--error">{error}</span>
      ) : helperText ? (
        <span className="input-helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required,
  error,
  helperText,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required">*</span>}
        </label>
      )}
      <div
        className={`input-wrapper ${error ? 'input-wrapper--error' : ''} ${
          disabled ? 'input-wrapper--disabled' : ''
        }`}
      >
        <textarea
          id={inputId}
          className="input-field"
          disabled={disabled}
          {...props}
        />
      </div>
      {error ? (
        <span className="input-helper input-helper--error">{error}</span>
      ) : helperText ? (
        <span className="input-helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  required,
  error,
  helperText,
  options,
  children,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required">*</span>}
        </label>
      )}
      <div
        className={`input-wrapper ${error ? 'input-wrapper--error' : ''} ${
          disabled ? 'input-wrapper--disabled' : ''
        }`}
      >
        <select
          id={inputId}
          className="input-field"
          disabled={disabled}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
      </div>
      {error ? (
        <span className="input-helper input-helper--error">{error}</span>
      ) : helperText ? (
        <span className="input-helper">{helperText}</span>
      ) : null}
    </div>
  );
};
