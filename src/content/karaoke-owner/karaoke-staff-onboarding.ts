import type { Flow } from '../../domain/types.ts';

export const karaokeStaffOnboarding: Flow = {
  id: 'karaoke-staff-onboarding',
  title: 'Mời & đăng ký nhân sự Karaoke',
  role: 'karaoke-owner',
  summary:
    'Tạo lời mời cho Phó quản lý, Booking, Lễ tân, Phục vụ phòng qua link công khai, xác minh số điện thoại và hoàn tất hồ sơ.',
  actors: ['Owner', 'Manager', 'Vice Manager', 'Nhân sự được mời'],
  environments: ['FLUTTER_APP', 'REACT_PWA', 'WEB_PUBLIC'],
  screens: [
    {
      id: 'ONB-01',
      title: 'Tạo lời mời nhân sự',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Quản lý cơ sở → Nhân sự → Lời mời',
      objective:
        'Chọn vị trí (Phó quản lý, Booking, Lễ tân, Phục vụ), nhập SĐT nếu cần và kiểm tra số chỗ còn lại trong gói.',
      visibleData: [
        'Chi nhánh',
        'Vị trí mời',
        'SĐT (bắt buộc với Phó QL, tùy chọn với vị trí khác)',
        'Số chỗ còn trong gói',
      ],
      primaryAction: 'Tạo lời mời & Lấy link',
    },
    {
      id: 'ONB-PUB',
      title: 'Xem lời mời nhân sự qua web link',
      environment: 'WEB_PUBLIC',
      actor: 'Người mở link',
      entryPoint: 'Mở link nhân sự trên Mobile Browser',
      objective:
        'Xem thông tin cơ sở, vị trí tuyển dụng, người gửi lời mời và chọn vào ứng dụng.',
      visibleData: [
        'Tên cơ sở',
        'Vị trí được mời',
        'Tên người gửi',
        'Hạn 3 ngày',
        'SĐT che bớt nếu có',
      ],
      primaryAction: 'Mở ứng dụng Blink',
      secondaryActions: ['Tiếp tục trên web'],
      nextScreen: 'Xác minh trong app',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-onboarding.md',
};
