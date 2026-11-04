import type { Flow } from '../../domain/types.ts';

export const karaokeRolePermissions: Flow = {
  id: 'karaoke-role-permissions',
  title: 'Cấu hình quyền của vai trò tại cơ sở',
  role: 'karaoke-owner',
  summary:
    'Cấu hình quyền cho 5 vai trò (Quản lý, Phó quản lý, Đặt phòng, Lễ tân, Phục vụ) theo 3 trạng thái: Mặc định Blink, Bật thêm, Tắt tại cơ sở.',
  actors: [
    'Owner (tất cả vai trò & khoá quyền)',
    'Manager (chỉ vai trò dưới mình)',
  ],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'ROL-01',
      title: 'Danh sách 5 vai trò cơ sở',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'Cài đặt cơ sở → Phân quyền vai trò',
      objective:
        'Hiển thị 5 vai trò; trạng thái đã tùy chỉnh hay dùng mặc định Blink; số quyền và số nhân sự mang vai trò.',
      visibleData: [
        '5 vai trò',
        'Nhãn Đã tùy chỉnh / Mặc định Blink',
        'Số nhân sự bị ảnh hưởng',
      ],
      primaryAction: 'Chọn vai trò → ROL-02',
      nextScreen: 'ROL-02',
    },
    {
      id: 'ROL-02',
      title: 'Danh sách quyền của vai trò',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'ROL-01',
      objective:
        'Xem chi tiết quyền theo nhóm chức năng; 3 trạng thái (Mặc định Blink, Bật thêm, Tắt); dấu Đã khoá nếu Owner khoá.',
      visibleData: [
        'Nhóm quyền',
        'Trạng thái quyền',
        'Đang dùng hay không',
        'Nhãn Đã khoá',
      ],
      primaryAction: 'Chỉnh quyền → ROL-03',
      secondaryActions: ['Đặt lại về mặc định Blink → ROL-07'],
      nextScreen: 'ROL-03',
    },
    {
      id: 'ROL-03',
      title: 'Chỉnh sửa quyền vai trò',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'ROL-02',
      objective:
        'Đổi trạng thái quyền khi được phép. Owner có tùy chọn "Khoá để cấp dưới không mở lại được" khi tắt quyền.',
      visibleData: [
        'Các lựa chọn hợp lệ',
        'Quyền nhạy cảm có nhãn riêng',
        'Tùy chọn khoá của Owner',
      ],
      primaryAction: 'Tiếp tục → ROL-04',
      secondaryActions: ['Hủy → ROL-02'],
      nextScreen: 'ROL-04',
    },
    {
      id: 'ROL-04',
      title: 'Xác nhận thay đổi & Nhập lý do',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'ROL-03',
      objective:
        'Tóm tắt quyền được bật thêm/bị tắt/khoá; số nhân sự ảnh hưởng; câu "Thay đổi có hiệu lực ngay"; ô nhập Lý do bắt buộc.',
      visibleData: [
        'Tóm tắt quyền thay đổi',
        'Số nhân sự bị ảnh hưởng',
        'Câu hiệu lực ngay',
      ],
      userInput: ['Lý do bắt buộc (1 - 500 ký tự)'],
      primaryAction: 'Lưu thay đổi → ROL-05',
      secondaryActions: ['Quay lại chỉnh → ROL-03'],
      nextScreen: 'ROL-05',
    },
    {
      id: 'ROL-05',
      title: 'Cập nhật vai trò thành công',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'ROL-04 hoặc ROL-07',
      objective:
        'Thông báo thành công số quyền đã điều chỉnh và nhắc nhở áp dụng ngay cho toàn bộ nhân sự mang vai trò.',
      visibleData: ['Thông báo thành công', 'Số quyền cập nhật'],
      primaryAction: 'Xong → Về ROL-02',
      nextScreen: 'ROL-02',
    },
    {
      id: 'ROL-07',
      title: 'Đặt lại về mặc định Blink',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'ROL-02',
      objective:
        'Xóa toàn bộ tùy chỉnh tại cơ sở; quyền bị Owner khoá vẫn giữ nguyên; yêu cầu lý do bắt buộc.',
      visibleData: ['Cảnh báo đặt lại', 'Số nhân sự ảnh hưởng'],
      userInput: ['Lý do bắt buộc (1 - 500 ký tự)'],
      primaryAction: 'Đặt lại → ROL-05',
      secondaryActions: ['Hủy → ROL-02'],
      nextScreen: 'ROL-05',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-role-permissions.md',
};
