import type { Flow } from '../domain/types.ts';
import { karaokePartnerRegistration } from './karaoke-owner/karaoke-partner-registration.ts';
import { karaokeBranchCreation } from './karaoke-owner/karaoke-branch-creation.ts';
import { karaokeFloors } from './karaoke-owner/karaoke-floors.ts';
import { karaokeRoomManagement } from './karaoke-owner/karaoke-room-management.ts';
import { karaokeManagerAppointments } from './karaoke-owner/karaoke-manager-appointments.ts';
import { karaokeStaffOnboarding } from './karaoke-owner/karaoke-staff-onboarding.ts';
import { karaokeStaffManagement } from './karaoke-owner/karaoke-staff-management.ts';
import { karaokeRolePermissions } from './karaoke-owner/karaoke-role-permissions.ts';
import { karaokeStaffPermissions } from './karaoke-owner/karaoke-staff-permissions.ts';
import { cashierTerminalAuthentication } from './karaoke-owner/cashier-terminal-authentication.ts';
import { subscriptions } from './blink-admin/subscriptions.ts';
import { authAdminSettings } from './blink-admin/auth-admin-settings.ts';
import { authPolicyRollout } from './blink-admin/auth-policy-rollout.ts';
import { appReleaseNotifications } from './blink-admin/app-release-notifications.ts';
import { adminAudit } from './blink-admin/admin-audit.ts';

/** All flows, in sidebar order. */
export const CATALOG: Flow[] = [
  karaokePartnerRegistration,
  karaokeBranchCreation,
  karaokeFloors,
  karaokeRoomManagement,
  karaokeManagerAppointments,
  karaokeStaffOnboarding,
  karaokeStaffManagement,
  karaokeRolePermissions,
  karaokeStaffPermissions,
  cashierTerminalAuthentication,
  subscriptions,
  authAdminSettings,
  authPolicyRollout,
  appReleaseNotifications,
  adminAudit,
];
