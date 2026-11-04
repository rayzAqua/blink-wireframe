import type { Flow } from '../../domain/types.ts';

export const karaokeBranchCreation: Flow = {
  id: 'karaoke-branch-creation',
  title: 'Tạo chi nhánh Karaoke',
  role: 'karaoke-owner',
  summary:
    'Dành cho Owner của chuỗi Karaoke tạo thêm chi nhánh cùng cấp, chọn gói độc lập và cấu hình vận hành riêng.',
  actors: ['Owner của chuỗi Karaoke'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'BR-01',
      title: 'Danh sách chi nhánh cùng cấp',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Cơ sở của tôi → Tạo chi nhánh',
      objective:
        'Hiển thị danh sách các chi nhánh thuộc chuỗi; khởi tạo thêm chi nhánh mới.',
      visibleData: [
        'Tên chuỗi cơ sở',
        'Danh sách các chi nhánh ngang hàng',
        'Trạng thái hoạt động',
      ],
      primaryAction: 'Tạo chi nhánh → BR-02',
      nextScreen: 'BR-02',
    },
    {
      id: 'BR-02',
      title: 'Thông tin chi nhánh mới',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'BR-01',
      objective: 'Nhập tên chi nhánh, địa chỉ, hotline riêng và giờ hoạt động.',
      visibleData: [
        'Tên chi nhánh',
        'Địa chỉ',
        'Hotline tùy chọn',
        'Giờ mở/đóng cửa',
      ],
      primaryAction: 'Tiếp tục → BR-03',
      secondaryActions: ['Hủy → BR-01'],
      nextScreen: 'BR-03',
    },
    {
      id: 'BR-03',
      title: 'Chọn gói riêng cho chi nhánh',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'BR-02',
      objective:
        'Chọn gói nhân sự và thời hạn đang mở bán (không tự động thừa kế từ chi nhánh khác).',
      visibleData: ['Gói, thời hạn, giới hạn nhân sự, giá cuối'],
      primaryAction: 'Chọn gói → BR-04',
      secondaryActions: ['Quay lại → BR-02'],
      nextScreen: 'BR-04',
    },
    {
      id: 'BR-04',
      title: 'Logo, tầng và phòng tùy chọn',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'BR-03',
      objective:
        'Cấu hình hình ảnh, số tầng và phòng ban đầu hoặc bỏ qua để thiết lập sau.',
      visibleData: ['Logo/ảnh bìa', 'Cấu trúc tầng & phòng'],
      primaryAction: 'Tiếp tục → BR-05',
      secondaryActions: ['Bỏ qua → BR-05'],
      nextScreen: 'BR-05',
    },
    {
      id: 'BR-05',
      title: 'Tóm tắt & xác nhận tạo chi nhánh',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'BR-04',
      objective:
        'Xác nhận toàn bộ cấu hình chi nhánh mới; nút gửi bị khóa tránh gửi lặp.',
      visibleData: ['Tóm tắt chi nhánh, gói, hình ảnh, tầng phòng'],
      primaryAction: 'Tạo chi nhánh → BR-06',
      nextScreen: 'BR-06',
    },
    {
      id: 'BR-06',
      title: 'Chi nhánh hoạt động & chờ hậu kiểm',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'BR-05',
      objective:
        'Chi nhánh xuất hiện ngang hàng trong danh sách cơ sở, hiển thị nút vào quản trị.',
      visibleData: [
        'Tên chi nhánh mới',
        'Trạng thái: Đang hoạt động — chờ Blink hậu kiểm',
      ],
      primaryAction: 'Vào quản lý chi nhánh',
      nextScreen: 'Trang quản lý chi nhánh',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-branch-creation.md',
};
