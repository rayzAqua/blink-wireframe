import type { IconName } from './icons.ts';

export type EnvironmentId =
  'FLUTTER_APP' | 'REACT_PWA' | 'WEB_PUBLIC' | 'TRANSITION' | 'ADMIN_UI';

export type SectionId =
  | 'start'
  | 'account'
  | 'setup'
  | 'staff'
  | 'branch-plan'
  | 'cashier'
  | 'report';

export type AccessKind = 'public-link' | 'transition' | 'app';
export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type RoleId = 'karaoke-owner' | 'blink-admin';

export interface Role {
  id: RoleId;
  label: string;
}

export interface Screen {
  id: string;
  title: string;
  environment: EnvironmentId;
  actor: string;
  entryPoint: string;
  objective: string;
  visibleData: string[];
  userInput?: string[];
  primaryAction: string;
  secondaryActions?: string[];
  nextScreen?: string;
  errorsOrOutcomes?: string[];
  auditNote?: string;
  /** Drawn as a real wireframe when present; otherwise the generic mockup is used. */
  layout?: Block[];
}

export interface Flow {
  id: string;
  title: string;
  role: RoleId;
  section?: SectionId;
  summary: string;
  actors: string[];
  environments: EnvironmentId[];
  screens: Screen[];
  /** Path of the matching document under docs/wireframes/. */
  source: string;
}

export interface ListRowSpec {
  icon?: IconName;
  title: string;
  description?: string;
  badge?: string;
  chevron?: boolean;
  tone?: 'danger';
  disabled?: boolean;
  goto?: string;
}

export interface ButtonSpec {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  goto?: string;
}

/**
 * One piece of a screen layout. `goto` is a screen id of the same flow, or `flow-id/screen-id`
 * for a screen of another flow.
 */
export type Block =
  | { type: 'appBar'; title: string; back?: boolean; actions?: IconName[] }
  | {
      type: 'hero';
      title: string;
      verified?: boolean;
      planTag?: string;
      lines?: string[];
      status?: string;
      /** Colour of the status chip; defaults to success. */
      statusTone?: Tone;
      cover?: boolean;
      logo?: boolean;
      goto?: string;
    }
  | {
      type: 'profile';
      name: string;
      subtitle?: string;
      verified?: boolean;
      goto?: string;
    }
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string; muted?: boolean }
  | { type: 'keyValue'; rows: { label: string; value: string }[] }
  | { type: 'listGroup'; label?: string; rows: ListRowSpec[] }
  | {
      type: 'field';
      kind: 'input' | 'textarea' | 'select' | 'switch' | 'checkbox' | 'radio';
      label: string;
      value?: string;
      placeholder?: string;
      helper?: string;
      error?: string;
      options?: string[];
      checked?: boolean;
    }
  | { type: 'tabs'; items: string[]; active: number }
  | { type: 'stepper'; steps: string[]; current: number }
  | { type: 'progress'; label?: string; value: number }
  | {
      type: 'cardList';
      items: {
        title: string;
        subtitle?: string;
        badge?: string;
        tone?: Tone;
        icon?: IconName;
        goto?: string;
      }[];
    }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | {
      type: 'alert';
      variant: Tone;
      title?: string;
      text?: string;
      actionLabel?: string;
      goto?: string;
    }
  | {
      type: 'empty';
      icon?: IconName;
      title: string;
      text?: string;
      actionLabel?: string;
      goto?: string;
    }
  | { type: 'skeleton'; lines?: number }
  | { type: 'actions'; buttons: ButtonSpec[] }
  | { type: 'bottomSheet'; title: string; blocks: Block[] }
  | { type: 'modal'; title: string; blocks: Block[]; buttons?: ButtonSpec[] }
  | { type: 'toast'; text: string };
