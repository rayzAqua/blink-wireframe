import type { Flow } from '../../domain/types.ts';

export const karaokeRoomManagement: Flow = {
  id: 'karaoke-room-management',
  title: 'Quản trị phòng Karaoke',
  role: 'karaoke-owner',
  summary:
    'Quản trị danh sách/lưới phòng, thông tin chi tiết, hồ sơ giá, quản lý ảnh 360 độ và đưa phòng khỏi vận hành.',
  actors: ['Owner', 'Manager', 'Nhân sự có quyền phòng'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'ROOM-01',
      title: 'Danh sách phòng & bộ lọc',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Quản lý cơ sở → Phòng',
      objective:
        'Xem danh sách/lưới phòng theo tầng hoặc phẳng, tìm kiếm từ khóa, lọc trạng thái và xem giá hiện tại.',
      visibleData: [
        'Ảnh đại diện phòng',
        'Tên phòng',
        'Sức chứa',
        'Trạng thái',
        'Giá tại thời điểm xem',
      ],
      primaryAction: 'Tạo phòng → ROOM-02',
      secondaryActions: ['Chọn phòng → ROOM-03'],
      nextScreen: 'ROOM-03',
    },
    {
      id: 'ROOM-02',
      title: 'Tạo phòng mới',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'ROOM-01',
      objective:
        'Nhập tên phòng bắt buộc, sức chứa tùy chọn, thứ tự ưu tiên, tầng (nếu có dùng tầng) và bảng giá.',
      visibleData: [
        'Tên phòng',
        'Sức chứa',
        'Độ ưu tiên',
        'Chọn tầng',
        'Ảnh & bảng giá',
      ],
      primaryAction: 'Tạo → ROOM-03',
      secondaryActions: ['Hủy → ROOM-01'],
      nextScreen: 'ROOM-03',
    },
    {
      id: 'ROOM-03',
      title: 'Chi tiết & chỉnh sửa phòng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'ROOM-01',
      objective:
        'Xem hồ sơ phòng gồm 4 phần: thông tin phòng, ảnh, giá hiện tại & lịch sử giá, và lịch sử trạng thái.',
      visibleData: [
        'Thông tin phòng',
        'Ảnh',
        'Giá và lịch sử giá',
        'Lịch sử trạng thái',
      ],
      primaryAction: 'Lưu thay đổi tại ROOM-03',
      secondaryActions: ['Quản lý ảnh → ROOM-04', 'Xóa phòng → ROOM-05'],
      nextScreen: 'ROOM-04',
    },
    {
      id: 'ROOM-04',
      title: 'Quản lý ảnh & ảnh 360 độ',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'ROOM-03',
      objective:
        'Tải ảnh mới, xem trước ảnh 360 độ, kéo thả sắp xếp thứ tự và xóa ảnh.',
      visibleData: ['Danh sách ảnh', 'Xem trước ảnh 360', 'Trạng thái xử lý'],
      primaryAction: 'Thêm/Sắp xếp/Xóa ảnh → ROOM-03',
      secondaryActions: ['Quay lại → ROOM-03'],
      nextScreen: 'ROOM-03',
    },
    {
      id: 'ROOM-05',
      title: 'Xóa phòng khỏi vận hành',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'ROOM-03',
      objective:
        'Xác nhận đưa phòng khỏi vận hành nhưng vẫn bảo lưu lịch sử đơn và trạng thái cũ.',
      visibleData: [
        'Tên phòng',
        'Cảnh báo bảo lưu lịch sử',
        'Trạng thái hiện tại',
      ],
      primaryAction: 'Xác nhận xóa → ROOM-01',
      secondaryActions: ['Giữ phòng → ROOM-03'],
      nextScreen: 'ROOM-01',
      errorsOrOutcomes: [
        'Phòng Đã đặt hoặc Đang hát: Backend từ chối xóa, yêu cầu hoàn tất nghiệp vụ trước',
      ],
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-room-management.md',
};
