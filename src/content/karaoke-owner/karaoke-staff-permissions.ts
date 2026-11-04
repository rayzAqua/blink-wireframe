import type { Flow } from '../../domain/types.ts';

export const karaokeStaffPermissions: Flow = {
  id: 'karaoke-staff-permissions',
  title: 'Phân quyền riêng cho nhân sự',
  role: 'karaoke-owner',
  summary:
    'Phân quyền riêng cho từng cá nhân theo 3 trạng thái (Theo vai trò, Cấp thêm, Chặn), Owner có thể khoá quyền chặn, thông báo NTF-01.',
  actors: ['Owner', 'Manager', 'Vice Manager được ủy quyền'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'PRM-01',
      title: 'Lối vào từ hồ sơ nhân sự',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Hồ sơ công việc của nhân sự',
      objective:
        'Hiển thị nút "Phân quyền riêng" cạnh các thao tác khác (không hiện cho chính mình, Owner hoặc người đã nghỉ).',
      visibleData: ['Nút Phân quyền'],
      primaryAction: 'Mở xem quyền → PRM-02',
      nextScreen: 'PRM-02',
    },
    {
      id: 'PRM-02',
      title: 'Xem quyền riêng của nhân sự',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'PRM-01',
      objective:
        'Xem danh sách quyền theo 3 trạng thái: Theo vai trò, Cấp thêm, Chặn; hiển thị số quyền cấp thêm & bị chặn.',
      visibleData: [
        'Tên & vị trí nhân sự',
        'Số quyền cấp thêm / bị chặn',
        'Trạng thái quyền thực tế',
      ],
      primaryAction: 'Chỉnh quyền → PRM-03',
      secondaryActions: [
        'Đặt lại về quyền theo vai trò (màn PRM-07 chưa có trong bản wireframe này)',
      ],
      nextScreen: 'PRM-03',
    },
    {
      id: 'PRM-03',
      title: 'Chỉnh sửa quyền riêng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'PRM-02',
      objective:
        'Chọn Cấp thêm hoặc Chặn; Owner có quyền khoá quyền chặn; Phó QL chỉ chỉnh quyền thông thường mình đang có.',
      visibleData: [
        'Danh sách quyền',
        'Lựa chọn Cấp thêm / Chặn',
        'Quyền nhạy cảm có nhãn riêng',
      ],
      primaryAction: 'Tiếp tục → PRM-04',
      secondaryActions: ['Hủy → PRM-02'],
      nextScreen: 'PRM-04',
    },
    {
      id: 'PRM-04',
      title: 'Xác nhận thay đổi quyền riêng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'PRM-03',
      objective:
        'Tóm tắt các quyền thay đổi, nhắc "Thay đổi có hiệu lực ngay ở thao tác tiếp theo"; nhập lý do bắt buộc.',
      visibleData: ['Tóm tắt quyền thay đổi', 'Câu nhắc hiệu lực ngay'],
      userInput: ['Lý do bắt buộc (1 - 500 ký tự)'],
      primaryAction: 'Lưu thay đổi → PRM-05',
      secondaryActions: ['Quay lại chỉnh → PRM-03'],
      nextScreen: 'PRM-05',
    },
    {
      id: 'PRM-05',
      title: 'Đã cập nhật quyền riêng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'PRM-04',
      objective:
        'Thông báo thành công và trạng thái gửi thông báo NTF-01 tới nhân sự.',
      visibleData: [
        'Số quyền cấp thêm/chặn',
        'Trạng thái gửi thông báo NTF-01',
      ],
      primaryAction: 'Xong → Về PRM-02',
      nextScreen: 'PRM-02',
    },
    {
      id: 'NTF-01',
      title: 'Thông báo nhân sự bị đổi quyền',
      environment: 'FLUTTER_APP',
      actor: 'Nhân sự bị đổi quyền',
      entryPoint: 'Thông báo trong app Flutter / React PWA',
      objective:
        'Thông báo gọn: "Quyền làm việc của bạn tại [Tên cơ sở] đã được thay đổi.", không lộ lý do hay danh sách kỹ thuật.',
      visibleData: ['Thông báo thân thiện', 'Nút vào màn hình làm việc'],
      primaryAction: 'Mở cơ sở làm việc',
      nextScreen: 'Trang cơ sở',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-permissions.md',
};
