import type { Flow } from '../../domain/types.ts';

export const authPolicyRollout: Flow = {
  id: 'auth-policy-rollout',
  title: 'Quản lý điều khoản & chính sách (Legal)',
  role: 'blink-admin',
  summary:
    'Blink Admin quản lý vòng đời phiên bản Điều khoản sử dụng và Chính sách quyền riêng tư (Bản nháp, Đã công bố, Ngừng áp dụng).',
  actors: ['Blink Admin'],
  environments: ['ADMIN_UI'],
  screens: [
    {
      id: 'LEGAL-01',
      title: 'Danh sách chính sách pháp lý',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Cấu hình hệ thống → Điều khoản và chính sách',
      objective:
        'Xem phiên bản đang hiệu lực của Điều khoản sử dụng & Chính sách quyền riêng tư; cảnh báo nếu thiếu bản hiệu lực.',
      visibleData: [
        'Từng loại chính sách',
        'Phiên bản đang hiệu lực',
        'Trạng thái sẵn sàng cho đăng ký',
      ],
      primaryAction: 'Mở chi tiết chính sách → LEGAL-02',
      nextScreen: 'LEGAL-02',
    },
    {
      id: 'LEGAL-02',
      title: 'Lịch sử phiên bản',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'LEGAL-01',
      objective:
        'Xem lịch sử các phiên bản: Bản nháp, Đã công bố, Đã ngừng áp dụng; thời điểm bắt đầu hiệu lực.',
      visibleData: [
        'Phiên bản, ngôn ngữ, tiêu đề, thời điểm hiệu lực, trạng thái',
      ],
      primaryAction: 'Tạo bản nháp mới → LEGAL-03',
      secondaryActions: [
        'Mở bản nháp sửa → LEGAL-03',
        'Ngừng áp dụng → LEGAL-05',
      ],
      nextScreen: 'LEGAL-03',
    },
    {
      id: 'LEGAL-03',
      title: 'Tạo / Sửa bản nháp điều khoản',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'LEGAL-02',
      objective:
        'Nhập số phiên bản, ngôn ngữ, tiêu đề, URL văn bản đã duyệt, mã checksum kiểm tra nội dung và thời điểm hiệu lực.',
      visibleData: ['Form thông tin phiên bản', 'Thời điểm hiệu lực'],
      userInput: [
        'Phiên bản',
        'Ngôn ngữ',
        'Tiêu đề',
        'Đường dẫn văn bản',
        'Lý do',
      ],
      primaryAction: 'Lưu bản nháp',
      secondaryActions: ['Công bố phiên bản → LEGAL-04'],
      nextScreen: 'LEGAL-04',
    },
    {
      id: 'LEGAL-04',
      title: 'Xác nhận công bố phiên bản',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'LEGAL-03',
      objective:
        'Cảnh báo văn bản công bố không được sửa trực tiếp; bắt buộc nhập lý do; phiên bản xuất hiện khi đến mốc hiệu lực.',
      visibleData: ['Tóm tắt phiên bản', 'Cảnh báo không thể sửa trực tiếp'],
      userInput: ['Lý do công bố (bắt buộc)'],
      primaryAction: 'Công bố phiên bản',
      secondaryActions: ['Hủy → LEGAL-03'],
      nextScreen: 'LEGAL-02',
    },
    {
      id: 'LEGAL-05',
      title: 'Xác nhận ngừng áp dụng',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'LEGAL-02',
      objective:
        'Ngừng áp dụng một phiên bản đã công bố; chặn nếu là phiên bản bắt buộc cuối cùng đang phục vụ đăng ký.',
      visibleData: ['Cảnh báo ngừng áp dụng'],
      userInput: ['Lý do bắt buộc'],
      primaryAction: 'Ngừng áp dụng',
      secondaryActions: ['Hủy → LEGAL-02'],
      nextScreen: 'LEGAL-02',
    },
  ],
  source: 'docs/wireframes/blink-admin/auth-policy-rollout.md',
};
