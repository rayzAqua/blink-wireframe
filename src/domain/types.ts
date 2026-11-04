export type EnvironmentId =
  'FLUTTER_APP' | 'REACT_PWA' | 'WEB_PUBLIC' | 'TRANSITION' | 'ADMIN_UI';

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
}

export interface Flow {
  id: string;
  title: string;
  role: RoleId;
  summary: string;
  actors: string[];
  environments: EnvironmentId[];
  screens: Screen[];
  /** Path of the matching document under docs/wireframes/. */
  source: string;
}
