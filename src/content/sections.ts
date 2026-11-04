import type { SectionId } from '../domain/types.ts';

/** Sub-groups of a role in the sidebar, in display order. */
export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'start', label: 'Khởi đầu' },
  { id: 'account', label: 'Tài khoản và cơ sở' },
  { id: 'setup', label: 'Thiết lập quán' },
  { id: 'staff', label: 'Nhân sự' },
  { id: 'branch-plan', label: 'Chi nhánh và gói' },
  { id: 'cashier', label: 'Thu ngân' },
  { id: 'report', label: 'Báo cáo' },
];
