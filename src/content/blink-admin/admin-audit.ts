import type { Flow } from '../../domain/types.ts';

export const adminAudit: Flow = {
  id: 'admin-audit',
  title: 'Nhật ký hoạt động (Admin Audit)',
  role: 'blink-admin',
  summary:
    'Nhật ký hoạt động toàn nền tảng chỉ dành riêng cho Blink Admin được cấp quyền: xem danh sách sự kiện, lọc người thực hiện và chi tiết an toàn.',
  actors: ['Blink Admin có quyền admin:audit:read'],
  environments: ['ADMIN_UI'],
  screens: [
    {
      id: 'AUD-01',
      title: 'Danh sách sự kiện Audit hệ thống',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Quản trị hệ thống → Nhật ký hoạt động',
      objective:
        'Xem sự kiện mới nhất, người thực hiện, mô tả hành động, loại đối tượng và thời gian; bộ lọc hành động & người thực hiện.',
      visibleData: [
        'Thời gian',
        'Người thực hiện',
        'Mô tả hành động',
        'Loại đối tượng',
        'Định danh đối tượng',
      ],
      primaryAction: 'Xem chi tiết sự kiện → AUD-02',
      nextScreen: 'AUD-02',
    },
    {
      id: 'AUD-02',
      title: 'Chi tiết an toàn sự kiện Audit',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'AUD-01',
      objective:
        'Hiển thị chi tiết an toàn của sự kiện; tuyệt đối không hiển thị secret, password, OTP, token hay URL riêng tư.',
      visibleData: [
        'Người thực hiện',
        'Thời gian',
        'Hành động',
        'Đối tượng',
        'Metadata an toàn',
        'Lý do',
      ],
      primaryAction: 'Đóng chi tiết',
      nextScreen: 'AUD-01',
    },
  ],
  source: 'docs/wireframes/blink-admin/admin-audit.md',
};
