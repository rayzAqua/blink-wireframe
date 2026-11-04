import type React from 'react';
import { PublicInviteMockup } from './PublicInviteMockup';
import type { MockupProps } from './types';

/** Hand-built mockups, keyed by screen id. Screens not listed use the generic mockup. */
export const CUSTOM_MOCKUPS: Record<string, React.ComponentType<MockupProps>> = {
  'PUB-01': PublicInviteMockup,
};
