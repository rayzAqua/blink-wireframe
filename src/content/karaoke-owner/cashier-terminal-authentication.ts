import type { Flow } from '../../domain/types.ts';

export const cashierTerminalAuthentication: Flow = {
  id: 'cashier-terminal-authentication',
  title: 'Quản lý thông tin đăng nhập Thu ngân',
  role: 'karaoke-owner',
  summary:
    'Quản lý mật khẩu credential thu ngân của cơ sở: xem mật khẩu che ••••-••••-••••, xác minh xem lại tạm thời, đặt lại và vô hiệu hóa.',
  actors: ['Owner', 'Manager', 'Vice Manager (chỉ xem)'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'CSH-01',
      title: 'Tổng quan thông tin Thu ngân',
      environment: 'FLUTTER_APP',
      actor: 'Cấp quản lý',
      entryPoint: 'Quản lý cơ sở → Thu ngân → Thông tin đăng nhập',
      objective:
        'Hiển thị cơ sở, trạng thái (Đang hoạt động / Đã vô hiệu hóa), mật khẩu che dạng ••••-••••-•••• và ngày thay đổi gần nhất.',
      visibleData: [
        'Tên cơ sở',
        'Trạng thái',
        'Mật khẩu đã che dạng ••••-••••-••••',
        'Ngày thay đổi gần nhất',
      ],
      primaryAction: 'Xem lại mật khẩu → CSH-02',
      secondaryActions: ['Đặt lại mật khẩu → CSH-03', 'Vô hiệu hóa → CSH-04'],
      nextScreen: 'CSH-02',
    },
    {
      id: 'CSH-02',
      title: 'Xác minh & Xem lại mật khẩu',
      environment: 'FLUTTER_APP',
      actor: 'Người có quyền xem',
      entryPoint: 'CSH-01',
      objective:
        'Yêu cầu xác minh lại tài khoản quản lý (Proof 1 lần); hiển thị mật khẩu rõ trong thời gian ngắn rồi tự động che lại.',
      visibleData: [
        'Form xác minh tài khoản quản lý',
        'Mật khẩu rõ kèm nút sao chép',
        'Đồng hồ đếm ngược tự che',
      ],
      primaryAction: 'Xác minh và xem',
      secondaryActions: ['Hủy → CSH-01'],
      nextScreen: 'CSH-01',
    },
    {
      id: 'CSH-03',
      title: 'Đặt lại mật khẩu Thu ngân',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'CSH-01',
      objective:
        'Cảnh báo mật khẩu cũ và phiên đăng nhập terminal sẽ mất hiệu lực; Backend tự sinh mật khẩu mới ngẫu nhiên an toàn.',
      visibleData: [
        'Cảnh báo thu hồi phiên terminal',
        'Xác minh tài khoản quản lý',
      ],
      primaryAction: 'Xác minh và đặt lại',
      secondaryActions: ['Hủy → CSH-01'],
      nextScreen: 'CSH-01',
    },
    {
      id: 'CSH-04',
      title: 'Vô hiệu hóa tài khoản Thu ngân',
      environment: 'FLUTTER_APP',
      actor: 'Owner / Manager',
      entryPoint: 'CSH-01',
      objective:
        'Tạm dừng toàn bộ quyền đăng nhập thu ngân của cơ sở; thu hồi các phiên đang lưu.',
      visibleData: ['Cảnh báo vô hiệu hóa', 'Xác minh tài khoản quản lý'],
      primaryAction: 'Xác minh và vô hiệu hóa',
      secondaryActions: ['Giữ hoạt động → CSH-01'],
      nextScreen: 'CSH-01',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/cashier-terminal-authentication.md',
};
