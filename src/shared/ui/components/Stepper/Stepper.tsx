import React from 'react';
import { Check } from 'lucide-react';
import './Stepper.css';

export interface StepItem {
  label: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  /** Zero-based index of the current step. Earlier steps are shown as done. */
  current: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, current, className = '' }) => (
  <ol className={`stepper ${className}`}>
    {steps.map((step, index) => {
      const state = index < current ? 'done' : index === current ? 'current' : 'todo';
      return (
        <li
          key={index}
          className={`stepper__step stepper__step--${state}`}
          aria-current={state === 'current' ? 'step' : undefined}
        >
          <span className="stepper__marker">
            {state === 'done' ? <Check size={14} strokeWidth={3} /> : index + 1}
          </span>
          <span className="stepper__text">
            <span className="stepper__label">{step.label}</span>
            {step.description && <span className="stepper__description">{step.description}</span>}
          </span>
        </li>
      );
    })}
  </ol>
);
