import type { Flow } from '../../domain/types.ts';

export const karaokeFloors: Flow = {
  id: 'karaoke-floors',
  title: 'Quản trị tầng Karaoke',
  role: 'karaoke-owner',
  summary:
    'Quản lý hai chế độ hiển thị (danh sách phẳng hoặc phân tầng), thiết lập tầng lần đầu, tăng/giảm tầng và đóng/mở tầng.',
  actors: ['Owner', 'Manager', 'Vice Manager được cấp quyền'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'FLR-01',
      title: 'Danh sách tầng & phòng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Quản lý cơ sở → Tầng và phòng',
      objective:
        'Xem danh sách phòng phẳng hoặc các nhóm tầng kèm trạng thái và số lượng phòng.',
      visibleData: [
        'Nhãn tầng',
        'Trạng thái Mở/Đóng tầng',
        'Số lượng phòng từng tầng',
      ],
      primaryAction: 'Thiết lập/Thay đổi tầng → FLR-02',
      secondaryActions: ['Đóng/Mở tầng → FLR-04'],
      nextScreen: 'FLR-02',
    },
    {
      id: 'FLR-02',
      title: 'Phân phòng vào các tầng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'FLR-01',
      objective:
        'Nhập số lượng tầng và kéo/phân toàn bộ phòng vào các tầng; vùng tạm "Chưa xếp tầng" phải trống trước khi lưu.',
      visibleData: [
        'Số lượng tầng',
        'Nhóm tạm "Chưa xếp tầng"',
        'Các ô tầng 1, tầng 2...',
      ],
      primaryAction: 'Kiểm tra → FLR-03',
      secondaryActions: ['Hủy → FLR-01'],
      nextScreen: 'FLR-03',
      errorsOrOutcomes: ['Còn phòng chưa xếp thì khóa nút lưu'],
    },
    {
      id: 'FLR-03',
      title: 'Xác nhận thay đổi cấu trúc tầng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'FLR-02',
      objective:
        'Tóm tắt số tầng tăng/giảm hoặc tắt cơ chế tầng và danh sách phòng bị tác động.',
      visibleData: ['Số tầng thay đổi', 'Phòng bị ảnh hưởng', 'Cảnh báo'],
      primaryAction: 'Lưu cấu hình → FLR-01',
      secondaryActions: ['Quay lại → FLR-02'],
      nextScreen: 'FLR-01',
    },
    {
      id: 'FLR-04',
      title: 'Xác nhận Đóng / Mở lại tầng',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'FLR-01',
      objective:
        'Đóng tầng (ngừng nhận đơn mới, giữ đơn cũ và phòng đang hát) hoặc mở lại tầng.',
      visibleData: ['Tên tầng', 'Ảnh hưởng tới đơn hiện có', 'Trạng thái'],
      primaryAction: 'Xác nhận thao tác → FLR-01',
      secondaryActions: ['Giữ nguyên → FLR-01'],
      nextScreen: 'FLR-01',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-floors.md',
};
