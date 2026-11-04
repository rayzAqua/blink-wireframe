import type { Flow } from '../../domain/types.ts';

export const karaokeStaffManagement: Flow = {
  id: 'karaoke-staff-management',
  title: 'Quản trị nhân sự Karaoke',
  role: 'karaoke-owner',
  summary:
    'Thống kê 3 nhóm nhân sự, chi tiết hồ sơ công việc, xem hồ sơ danh tính bảo mật (ghi Audit), đổi vị trí theo cấp bậc và đổi trạng thái.',
  actors: ['Owner', 'Manager', 'Vice Manager'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'STF-01',
      title: 'Danh sách nhân sự & 3 số liệu',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Quản lý cơ sở → Nhân sự',
      objective:
        'Hiển thị tách biệt 3 số liệu: Đang làm việc, Đang tạm dừng, Đã nghỉ việc; tìm kiếm và lọc vị trí.',
      visibleData: [
        '3 số liệu thống kê',
        'Mã nhân sự dạng 01',
        'Biệt danh',
        'Vị trí',
        'Trạng thái',
        'Ngày bắt đầu',
      ],
      primaryAction: 'Chọn nhân sự → STF-02',
      nextScreen: 'STF-02',
    },
    {
      id: 'STF-02',
      title: 'Chi tiết hồ sơ nhân sự',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'STF-01',
      objective:
        'Tab Hồ sơ công việc, Tab Hồ sơ danh tính (có phân quyền) và Tab Lịch sử làm việc an toàn.',
      visibleData: [
        'Ảnh công việc, biệt danh, mã, vị trí',
        'Hồ sơ danh tính',
        'Lịch sử thay đổi',
      ],
      primaryAction: 'Sửa hồ sơ → STF-03',
      secondaryActions: [
        'Xem danh tính → STF-04',
        'Đổi vị trí → STF-05',
        'Đổi trạng thái → STF-06',
      ],
      nextScreen: 'STF-03',
    },
    {
      id: 'STF-03',
      title: 'Sửa hồ sơ công việc',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'STF-02',
      objective:
        'Chỉnh sửa biệt danh và ảnh đại diện công việc (ảnh danh tính không dùng thay ảnh công việc).',
      visibleData: ['Biệt danh công việc', 'Ảnh đại diện công việc'],
      primaryAction: 'Lưu thay đổi',
      secondaryActions: ['Hủy → STF-02'],
      nextScreen: 'STF-02',
    },
    {
      id: 'STF-04',
      title: 'Xem hồ sơ danh tính bảo mật',
      environment: 'FLUTTER_APP',
      actor: 'Người có quyền nhạy cảm',
      entryPoint: 'STF-02',
      objective:
        'Xem CCCD, ảnh chân dung qua URL thời hạn ngắn; mỗi lần xem tự động ghi vết Admin Audit.',
      visibleData: [
        'CCCD che bớt',
        'Ảnh chân dung',
        'Yêu cầu lý do nếu nhân sự đã nghỉ việc',
      ],
      primaryAction: 'Mở dữ liệu',
      secondaryActions: ['Đóng → STF-02'],
      nextScreen: 'STF-02',
      auditNote: 'Ghi Audit mỗi lần mở xem dữ liệu nhạy cảm.',
    },
    {
      id: 'STF-05',
      title: 'Đổi vị trí công việc',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'STF-02',
      objective:
        'Đổi vai trò nhân sự theo đúng cấp bậc quản lý (không tự sửa mình, không sửa cấp trên, không bổ nhiệm Manager tại đây).',
      visibleData: ['Vị trí hiện tại', 'Danh sách vị trí hợp lệ'],
      userInput: ['Chọn vị trí mới', 'Lý do bắt buộc'],
      primaryAction: 'Xác nhận đổi vị trí',
      secondaryActions: ['Hủy → STF-02'],
      nextScreen: 'STF-02',
    },
    {
      id: 'STF-06',
      title: 'Tạm dừng, Kích hoạt hoặc Kết thúc',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'STF-02',
      objective:
        'Đổi trạng thái làm việc; bắt buộc nhập lý do (1 - 500 ký tự) cho mọi hành động.',
      visibleData: [
        'Hành động (Tạm dừng / Kích hoạt lại / Kết thúc)',
        'Lý do trước đó',
        'Hậu quả thao tác',
      ],
      userInput: ['Lý do bắt buộc (1 - 500 ký tự)'],
      primaryAction: 'Xác nhận thao tác',
      secondaryActions: ['Hủy → STF-02'],
      nextScreen: 'STF-02',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-management.md',
};
