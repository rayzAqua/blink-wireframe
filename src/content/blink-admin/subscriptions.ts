import type { Flow } from '../../domain/types.ts';

export const subscriptions: Flow = {
  id: 'subscriptions',
  title: 'Quản lý danh mục gói (Subscriptions)',
  role: 'blink-admin',
  summary:
    'Màn hình Desktop dành riêng cho Blink Admin để tạo, kích hoạt, tạm ngừng, lưu trữ gói nhân sự và quản lý các mốc thời hạn & giá.',
  actors: ['Blink Admin'],
  environments: ['ADMIN_UI'],
  screens: [
    {
      id: 'SUB-01',
      title: 'Danh mục gói dịch vụ',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Quản trị hệ thống → Danh mục gói',
      objective:
        'Xem danh sách gói, bộ lọc trạng thái (Bản nháp, Đang cung cấp, Tạm ngừng, Lưu trữ), loại gói, tìm kiếm tên/mã.',
      visibleData: [
        'Tên & mã gói',
        'Loại gói',
        'Trạng thái',
        'Giới hạn nhân sự',
        'Các thời hạn đang bán',
        'Thời gian cập nhật',
      ],
      primaryAction: 'Tạo gói mới → SUB-02',
      secondaryActions: ['Chọn một gói để xem/sửa → SUB-02'],
      nextScreen: 'SUB-02',
    },
    {
      id: 'SUB-02',
      title: 'Tạo / Chỉnh sửa gói dịch vụ',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'SUB-01',
      objective:
        'Nhập thông tin chung (tên, mã không sửa sau kích hoạt, mô tả, giới hạn nhân sự) và bảng thời hạn & giá (1, 3, 12 tháng).',
      visibleData: [
        'Thông tin chung',
        'Giới hạn nhân sự',
        'Bảng thời hạn & giá (giá niêm yết, % giảm, giá cuối)',
      ],
      primaryAction: 'Lưu bản nháp',
      secondaryActions: [
        'Kích hoạt / Tạm ngừng / Lưu trữ → SUB-03',
        'Hủy → SUB-01',
      ],
      nextScreen: 'SUB-03',
    },
    {
      id: 'SUB-03',
      title: 'Xác nhận thay đổi trạng thái gói',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'SUB-02',
      objective:
        'Xác nhận hành động (Kích hoạt, Tạm ngừng, Lưu trữ); kiểm tra điều kiện hợp lệ và yêu cầu lý do.',
      visibleData: ['Trạng thái hiện tại & mới', 'Tác động tới đăng ký mới'],
      userInput: ['Lý do thao tác'],
      primaryAction: 'Xác nhận → SUB-04',
      secondaryActions: ['Quay lại → SUB-02'],
      nextScreen: 'SUB-04',
    },
    {
      id: 'SUB-04',
      title: 'Kết quả cập nhật gói',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'SUB-03',
      objective:
        'Hiển thị trạng thái và phiên bản mới của gói dịch vụ sau khi lưu thành công.',
      visibleData: ['Trạng thái mới', 'Phiên bản gói'],
      primaryAction: 'Về danh sách → SUB-01',
      secondaryActions: ['Tiếp tục chỉnh → SUB-02'],
      nextScreen: 'SUB-01',
    },
  ],
  source: 'docs/wireframes/blink-admin/subscriptions.md',
};
