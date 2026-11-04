import type React from 'react';
import type { MockupProps } from './types';

/** Hand-built mockups, keyed by screen id. Screens not listed use their layout or the generic mockup. */
export const CUSTOM_MOCKUPS: Record<string, React.ComponentType<MockupProps>> = {};
