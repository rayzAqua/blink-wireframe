import type { Flow } from '../../domain/types.ts';

export const authAdminSettings: Flow = {
  id: 'auth-admin-settings',
  title: 'Cấu hình luồng xác thực Auth',
  role: 'blink-admin',
  summary:
    'Blink Admin cấu hình 3 chính sách xác thực động: Yêu cầu đồng ý điều khoản, Yêu cầu bổ sung SĐT mạng xã hội cũ, Cho phép login email cũ.',
  actors: ['Blink Admin'],
  environments: ['ADMIN_UI'],
  screens: [
    {
      id: 'AUTH-01',
      title: 'Danh sách 3 chính sách Auth',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Cấu hình hệ thống → Luồng xác thực',
      objective:
        'Xem 3 thẻ chính sách xác thực, trạng thái đang thực sự có hiệu lực, mức sẵn sàng và người cập nhật gần nhất.',
      visibleData: [
        '3 thẻ chính sách',
        'Giá trị Admin chọn',
        'Trạng thái hiệu lực thực tế',
        'Banner an toàn nếu config động bị tắt',
      ],
      primaryAction: 'Chọn một chính sách → AUTH-02',
      nextScreen: 'AUTH-02',
    },
    {
      id: 'AUTH-02',
      title: 'Chi tiết & Bật/Tắt chính sách',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'AUTH-01',
      objective:
        'Xem tác động khi bật/tắt; chính sách bị chặn nếu điều kiện tiên quyết (như văn bản pháp lý hoặc SMS OTP) chưa sẵn sàng.',
      visibleData: [
        'Tên chính sách',
        'Tác động người dùng',
        'Lý do chưa thể áp dụng nếu bị chặn',
      ],
      primaryAction: 'Bật hoặc tắt → AUTH-03',
      secondaryActions: ['Quay lại → AUTH-01'],
      nextScreen: 'AUTH-03',
    },
    {
      id: 'AUTH-03',
      title: 'Xác nhận thay đổi chính sách Auth',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'AUTH-02',
      objective:
        'Hiển thị giá trị hiện tại và mới; bắt buộc nhập lý do từ 5 đến 500 ký tự; lưu vết vào Admin Audit.',
      visibleData: ['Giá trị hiện tại & mới', 'Ảnh hưởng tới người dùng'],
      userInput: ['Lý do bắt buộc (5 - 500 ký tự)'],
      primaryAction: 'Xác nhận thay đổi → AUTH-04',
      secondaryActions: ['Hủy → AUTH-02'],
      nextScreen: 'AUTH-04',
    },
    {
      id: 'AUTH-04',
      title: 'Kết quả cập nhật chính sách',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'AUTH-03',
      objective:
        'Trở về chi tiết với trạng thái mới; hiển thị thông báo đã lưu hoặc hướng dẫn nếu chưa đủ điều kiện.',
      visibleData: ['Thông báo kết quả', 'Trạng thái mới'],
      primaryAction: 'Về danh sách chính sách',
      nextScreen: 'AUTH-01',
    },
  ],
  source: 'docs/wireframes/blink-admin/auth-admin-settings.md',
};
