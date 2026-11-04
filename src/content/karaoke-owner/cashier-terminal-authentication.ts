import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner, Manager hoặc Vice Manager theo quyền';

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'CSH-01',
    title: 'Thông tin đăng nhập Thu ngân',
    entryPoint: 'Quản lý cơ sở → Thu ngân → Thông tin đăng nhập',
    objective:
      'Xem trạng thái tài khoản Thu ngân của cơ sở, mật khẩu đã che và đi tới xem lại, đặt lại hoặc vô hiệu hoá theo quyền.',
    visibleData: [
      'Tên, địa chỉ cơ sở',
      'Trạng thái Đang hoạt động hoặc Đã vô hiệu hoá',
      'Mật khẩu đã che ••••-••••-••••',
      'Thời điểm mật khẩu thay gần nhất',
      'Nút hành động theo quyền',
      'Không dùng QR; người dùng không tự đặt mật khẩu',
    ],
    primaryAction: 'Xem lại → CSH-02',
    secondaryActions: [
      'Đặt lại → CSH-03',
      'Vô hiệu hoá → CSH-04',
      'Lỗi và quyền → CSH-05',
    ],
    nextScreen: 'CSH-02',
    errorsOrOutcomes: [
      'Thiếu quyền: thông báo chung',
      'Chưa có thông tin đăng nhập: liên hệ Blink',
    ],
    layout: [
      bar('Thông tin đăng nhập Thu ngân'),
      {
        type: 'hero',
        title: 'Karaoke Blink Sài Gòn',
        lines: ['123 Nguyễn Thị Minh Khai, Quận 1'],
        status: 'Đang hoạt động',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Mật khẩu', value: '••••-••••-••••' },
          { label: 'Thay gần nhất', value: '01/11/2026 09:15' },
        ],
      },
      buttons(
        { label: 'Xem mật khẩu', goto: 'CSH-02' },
        { label: 'Đặt lại mật khẩu', variant: 'secondary', goto: 'CSH-03' },
        { label: 'Vô hiệu hoá', variant: 'danger', goto: 'CSH-04' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'CSH-02',
    title: 'Xem lại mật khẩu',
    entryPoint: 'CSH-01 → Xem mật khẩu',
    objective:
      'Xác minh lại tài khoản quản lý rồi hiện mật khẩu trong thời gian ngắn và tự che lại.',
    visibleData: [
      'Cảnh báo đây là thao tác xem dữ liệu nhạy cảm',
      'Bước xác minh lại, chỉ dùng một lần',
      'Mật khẩu hiện theo nhóm dễ đọc, nút sao chép, tự che khi hết giờ hoặc rời màn',
    ],
    primaryAction: 'Xác minh và xem → hiện rồi tự che',
    secondaryActions: ['Huỷ → CSH-01'],
    nextScreen: 'CSH-01',
    errorsOrOutcomes: [
      'Xác minh sai, hết hạn hoặc đã dùng: xác minh lại, giữ mật khẩu che',
      'Dữ liệu không tải được: giữ mật khẩu che',
      'Mật khẩu không vào analytics, nhật ký hay ảnh xem trước ứng dụng',
    ],
    layout: [
      bar('Xem mật khẩu'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Thao tác xem dữ liệu nhạy cảm',
        text: 'Bạn cần xác minh lại tài khoản quản lý. Mật khẩu chỉ hiện trong thời gian ngắn.',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Xác minh lại tài khoản quản lý',
        placeholder: 'Nhập mật khẩu của bạn',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Mật khẩu Thu ngân', value: '4821-9376-1054' },
          { label: 'Tự che sau', value: '30 giây' },
        ],
      },
      buttons(
        { label: 'Xác minh và xem' },
        { label: 'Sao chép', variant: 'secondary' },
        { label: 'Huỷ', variant: 'ghost', goto: 'CSH-01' },
      ),
    ],
  },
  {
    ...inApp('Owner hoặc Manager'),
    id: 'CSH-03',
    title: 'Đặt lại mật khẩu',
    entryPoint: 'CSH-01 → Đặt lại mật khẩu',
    objective:
      'Hệ thống tự sinh mật khẩu mới; mật khẩu cũ và các phiên Thu ngân đang lưu mất hiệu lực. Không cho tự chọn mật khẩu.',
    visibleData: [
      'Backend tự sinh mật khẩu mới',
      'Mật khẩu cũ mất hiệu lực',
      'Mọi phiên Terminal đang lưu bị thu hồi',
      'Sau xác minh lại: hiện mật khẩu mới theo cách bảo vệ như màn xem lại',
    ],
    primaryAction: 'Xác minh và đặt lại → CSH-01',
    secondaryActions: ['Huỷ → CSH-01'],
    nextScreen: 'CSH-01',
    errorsOrOutcomes: ['Thất bại: không đổi mật khẩu hay trạng thái'],
    layout: [
      bar('Đặt lại mật khẩu'),
      {
        type: 'modal',
        title: 'Đặt lại mật khẩu Thu ngân?',
        blocks: [
          {
            type: 'text',
            text: 'Hệ thống sẽ tự sinh mật khẩu mới. Mật khẩu cũ mất hiệu lực và mọi phiên Thu ngân đang lưu bị thu hồi.',
            muted: true,
          },
          {
            type: 'field',
            kind: 'input',
            label: 'Xác minh lại tài khoản quản lý',
            placeholder: 'Nhập mật khẩu của bạn',
          },
        ],
        buttons: [
          { label: 'Xác minh và đặt lại', variant: 'danger', goto: 'CSH-01' },
          { label: 'Huỷ', variant: 'secondary', goto: 'CSH-01' },
        ],
      },
    ],
  },
  {
    ...inApp('Owner hoặc Manager'),
    id: 'CSH-04',
    title: 'Vô hiệu hoá tài khoản Thu ngân',
    entryPoint: 'CSH-01 → Vô hiệu hoá',
    objective:
      'Tài khoản Thu ngân của cơ sở không đăng nhập được và các phiên đang lưu bị thu hồi. Sau đó trạng thái chuyển sang Đã vô hiệu hoá; đặt lại mật khẩu sẽ tạo mật khẩu mới và kích hoạt lại.',
    visibleData: [
      'Cảnh báo vô hiệu hoá và thu hồi phiên',
      'Xác minh lại tài khoản quản lý',
    ],
    primaryAction: 'Xác minh và vô hiệu hoá → CSH-06',
    secondaryActions: ['Giữ hoạt động → CSH-01'],
    nextScreen: 'CSH-06',
    errorsOrOutcomes: ['Thất bại: thông tin đăng nhập giữ trạng thái cũ'],
    layout: [
      bar('Vô hiệu hoá Thu ngân'),
      {
        type: 'modal',
        title: 'Vô hiệu hoá tài khoản Thu ngân?',
        blocks: [
          {
            type: 'text',
            text: 'Thu ngân của cơ sở không thể đăng nhập và các phiên đang lưu bị thu hồi.',
            muted: true,
          },
          {
            type: 'field',
            kind: 'input',
            label: 'Xác minh lại tài khoản quản lý',
            placeholder: 'Nhập mật khẩu của bạn',
          },
        ],
        buttons: [
          {
            label: 'Xác minh và vô hiệu hoá',
            variant: 'danger',
            goto: 'CSH-06',
          },
          { label: 'Giữ hoạt động', variant: 'secondary', goto: 'CSH-01' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'CSH-05',
    title: 'Quyền và lỗi',
    entryPoint: 'Thiếu quyền, chưa có thông tin đăng nhập hoặc xác minh sai',
    objective:
      'Owner và Manager có xem, đặt lại, vô hiệu hoá; Vice Manager chỉ xem trạng thái và xem lại (không mặc định đặt lại hay vô hiệu hoá); nhân sự thường không có quyền.',
    visibleData: [
      '"Bạn không có quyền truy cập" (không hiện mã quyền)',
      'Chưa có thông tin đăng nhập: liên hệ Blink, không tạo ngầm từ màn đọc',
      'Mọi lần xem lại, đặt lại, vô hiệu hoá đều được ghi nhật ký an toàn, không ghi mật khẩu',
    ],
    primaryAction: 'Quay lại → CSH-01',
    nextScreen: 'CSH-01',
    layout: [
      bar('Thu ngân'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
      {
        type: 'empty',
        icon: 'key-round',
        title: 'Chưa có thông tin đăng nhập Thu ngân',
        text: 'Vui lòng liên hệ Blink để được cấp.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Xác minh không thành công',
        text: 'Mã xác minh sai, hết hạn hoặc đã dùng. Hãy xác minh lại.',
      },
      buttons({ label: 'Quay lại', goto: 'CSH-01' }),
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager theo quyền'),
    id: 'CSH-06',
    title: 'Tài khoản Thu ngân đã vô hiệu hoá',
    entryPoint: 'Sau khi vô hiệu hoá thành công',
    objective:
      'Màn tổng quan chuyển sang Đã vô hiệu hoá. Đặt lại mật khẩu sẽ tạo mật khẩu mới và kích hoạt lại tài khoản.',
    visibleData: [
      'Trạng thái Đã vô hiệu hoá',
      'Thu ngân của cơ sở không đăng nhập được, các phiên đang lưu đã bị thu hồi',
      'Nút Đặt lại mật khẩu để kích hoạt lại',
    ],
    primaryAction: 'Đặt lại mật khẩu → CSH-03',
    secondaryActions: ['Về tổng quan → CSH-01'],
    nextScreen: 'CSH-03',
    layout: [
      bar('Thông tin đăng nhập Thu ngân'),
      {
        type: 'hero',
        title: 'Karaoke Blink Sài Gòn',
        lines: ['123 Nguyễn Thị Minh Khai, Quận 1'],
        status: 'Đã vô hiệu hoá',
        statusTone: 'neutral',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Thu ngân của cơ sở không đăng nhập được. Đặt lại mật khẩu sẽ tạo mật khẩu mới và kích hoạt lại tài khoản.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Đặt lại mật khẩu', goto: 'CSH-03' },
          { label: 'Về tổng quan', variant: 'secondary', goto: 'CSH-01' },
        ],
      },
    ],
  },
];

export const cashierTerminalAuthentication: Flow = {
  id: 'cashier-terminal-authentication',
  title: 'Quản lý thông tin đăng nhập Thu ngân',
  role: 'karaoke-owner',
  section: 'cashier',
  summary:
    'Xem trạng thái, xem lại, đặt lại hoặc vô hiệu hoá mật khẩu đăng nhập Thu ngân của cơ sở. Không gồm đăng nhập terminal, phiên, gắn ca hay đăng nhập nhanh.',
  actors: ['Owner', 'Manager', 'Vice Manager theo quyền'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/cashier-terminal-authentication.md',
};
