import type { Flow } from '../../domain/types.ts';

export const appReleaseNotifications: Flow = {
  id: 'app-release-notifications',
  title: 'Cập nhật phiên bản & bảo trì ứng dụng',
  role: 'blink-admin',
  summary:
    'Blink Admin tạo phiên bản & lên lịch bảo trì trên Admin UI; ứng dụng người dùng hiển thị popup chặn hoặc khuyến nghị cập nhật.',
  actors: ['Blink Admin', 'Người dùng ứng dụng Blink'],
  environments: ['ADMIN_UI', 'FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'REL-01',
      title: 'Admin — Quản lý phiên bản app',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Quản trị hệ thống → Phiên bản ứng dụng',
      objective:
        'Quản lý ngưỡng phiên bản khuyến nghị/bắt buộc cập nhật theo từng nền tảng iOS, Android, Web.',
      visibleData: [
        'Nền tảng, phiên bản, build mới nhất, ngưỡng khuyến nghị/bắt buộc, trạng thái',
      ],
      primaryAction:
        'Tạo bản phát hành mới (màn REL-02 chưa có trong bản wireframe này)',
    },
    {
      id: 'MNT-01',
      title: 'Admin — Quản lý lịch bảo trì',
      environment: 'ADMIN_UI',
      actor: 'Blink Admin',
      entryPoint: 'Quản trị hệ thống → Lịch bảo trì',
      objective:
        'Tạo và công bố lịch bảo trì toàn hệ thống; không cho phép giờ bắt đầu muộn hơn giờ kết thúc.',
      visibleData: [
        'Tiêu đề, nội dung bảo trì, thời gian bắt đầu & kết thúc, trạng thái',
      ],
      primaryAction: 'Tạo lịch bảo trì mới',
    },
    {
      id: 'APP-01',
      title: 'Ứng dụng — Cập nhật bắt buộc',
      environment: 'FLUTTER_APP',
      actor: 'Người dùng ứng dụng',
      entryPoint: 'Mở ứng dụng khi build hiện tại thấp hơn ngưỡng bắt buộc',
      objective:
        'Màn hình chặn hoàn toàn nghiệp vụ, hiển thị nội dung mới và nút "Cập nhật ngay" (không có nút bỏ qua).',
      visibleData: [
        'Phiên bản mới',
        'Nội dung nâng cấp chính',
        'Nút Cập nhật ngay',
      ],
      primaryAction: 'Cập nhật ngay',
      nextScreen: 'Mở App Store / Google Play / Tải lại web',
    },
    {
      id: 'APP-05',
      title: 'Ứng dụng — Đang bảo trì hệ thống',
      environment: 'FLUTTER_APP',
      actor: 'Người dùng ứng dụng',
      entryPoint: 'Mở ứng dụng trong khung giờ hệ thống đang bảo trì',
      objective:
        'Chặn nghiệp vụ, hiển thị nội dung bảo trì và thời gian dự kiến hoạt động lại; có nút "Kiểm tra lại".',
      visibleData: [
        'Tiêu đề bảo trì',
        'Thời gian dự kiến xong',
        'Nút Kiểm tra lại',
      ],
      primaryAction: 'Kiểm tra lại',
      nextScreen: 'Tải lại trạng thái',
    },
  ],
  source: 'docs/wireframes/blink-admin/app-release-notifications.md',
};
