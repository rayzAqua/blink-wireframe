import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner hoặc người có quyền cấu hình phòng';

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'AVL-01',
    title: 'Danh sách và sơ đồ phòng',
    entryPoint: 'Thiết lập quán → Phòng và giá',
    objective:
      'Xem ba trạng thái Trống, Đã đặt, Đang hát và nhãn riêng cho phòng ngừng nhận đặt.',
    visibleData: [
      'Ba trạng thái Trống, Đã đặt, Đang hát',
      'Nhãn "Ngừng nhận đặt mới" ở phòng đã tắt nhận đặt',
      'Giải thích "Tầng đang đóng" cho phòng trên tầng đóng',
    ],
    primaryAction: 'Chọn phòng → AVL-02',
    nextScreen: 'AVL-02',
    errorsOrOutcomes: [
      'Người không có quyền chỉ xem trạng thái, không thấy nút điều chỉnh',
    ],
    layout: [
      bar('Phòng', true, ['search']),
      {
        type: 'cardList',
        items: [
          {
            icon: 'door-open',
            title: 'Phòng 101',
            subtitle: 'Tầng 1',
            badge: 'Trống',
            tone: 'success',
            goto: 'AVL-02',
          },
          {
            icon: 'door-closed',
            title: 'Phòng 102',
            subtitle: 'Tầng 1',
            badge: 'Đang hát',
            tone: 'info',
            goto: 'AVL-02',
          },
          {
            icon: 'door-closed',
            title: 'Phòng 103',
            subtitle: 'Tầng 1 · Ngừng nhận đặt mới',
            badge: 'Đã đặt',
            tone: 'warning',
            goto: 'AVL-02',
          },
          {
            icon: 'layers',
            title: 'Phòng 201',
            subtitle: 'Tầng 2 đang đóng',
            badge: 'Trống',
            tone: 'neutral',
            goto: 'AVL-02',
          },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'AVL-02',
    title: 'Chi tiết phòng — Nhận đặt mới',
    entryPoint: 'Chọn một phòng ở danh sách',
    objective:
      'Bật hoặc tắt việc nhận đặt mới của một phòng. Người không có quyền không thấy công tắc.',
    visibleData: [
      'Tên phòng, trạng thái, tầng',
      'Công tắc Nhận đặt mới (chỉ người có quyền)',
    ],
    primaryAction: 'Tắt Nhận đặt mới → AVL-03',
    secondaryActions: ['Mở nhận đặt → AVL-05'],
    nextScreen: 'AVL-03',
    layout: [
      bar('Phòng 101'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Trạng thái', value: 'Trống' },
          { label: 'Tầng', value: 'Tầng 1' },
        ],
      },
      {
        type: 'field',
        kind: 'switch',
        label: 'Nhận đặt mới',
        checked: true,
        helper: 'Tắt để phòng không nhận đơn mới.',
      },
      buttons(
        { label: 'Ngừng nhận đặt', variant: 'danger', goto: 'AVL-03' },
        { label: 'Mở nhận đặt', variant: 'secondary', goto: 'AVL-05' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'AVL-03',
    title: 'Xác nhận ngừng nhận đặt',
    entryPoint: 'AVL-02 → Ngừng nhận đặt',
    objective:
      'Xác nhận ngừng nhận đơn mới; đơn đã đặt và khách đang dùng vẫn được giữ.',
    visibleData: [
      'Tên phòng và tên cơ sở',
      'Nội dung "Phòng sẽ không nhận đơn mới. Các đơn đã đặt và khách đang sử dụng vẫn được giữ."',
    ],
    primaryAction: 'Ngừng nhận đặt → AVL-04',
    secondaryActions: ['Quay lại → AVL-02'],
    nextScreen: 'AVL-04',
    errorsOrOutcomes: ['Trong lúc gửi, khoá nút để chống bấm lặp'],
    layout: [
      bar('Phòng 101'),
      {
        type: 'modal',
        title: 'Ngừng nhận đặt phòng 101?',
        blocks: [
          {
            type: 'text',
            text: 'Karaoke Blink Sài Gòn · Phòng 101',
            muted: true,
          },
          {
            type: 'text',
            text: 'Phòng sẽ không nhận đơn mới. Các đơn đã đặt và khách đang sử dụng vẫn được giữ.',
          },
        ],
        buttons: [
          { label: 'Ngừng nhận đặt', variant: 'danger', goto: 'AVL-04' },
          { label: 'Quay lại', variant: 'secondary', goto: 'AVL-02' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'AVL-04',
    title: 'Phòng đã ngừng nhận đặt',
    entryPoint: 'Xác nhận ngừng nhận đặt thành công',
    objective:
      'Chi tiết và sơ đồ phòng cập nhật nhãn; trạng thái phòng không nhảy sang Trống và không báo đơn bị huỷ.',
    visibleData: [
      'Nhãn "Ngừng nhận đặt mới"',
      'Đơn cũ và khách đang hát vẫn hiển thị',
    ],
    primaryAction: 'Về danh sách → AVL-01',
    nextScreen: 'AVL-01',
    layout: [
      bar('Phòng 101'),
      {
        type: 'alert',
        variant: 'success',
        text: 'Phòng 101 đã ngừng nhận đặt mới. Các đơn đã đặt vẫn được giữ.',
      },
      {
        type: 'keyValue',
        rows: [{ label: 'Trạng thái', value: 'Trống · Ngừng nhận đặt mới' }],
      },
      buttons({ label: 'Về danh sách', goto: 'AVL-01' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'AVL-05',
    title: 'Xác nhận nhận đặt trở lại',
    entryPoint: 'AVL-02 → Mở nhận đặt',
    objective:
      'Cho phòng nhận đơn trở lại theo lịch và điều kiện hiện tại. Nếu tầng đóng, báo rõ phòng chưa nhận được đơn mới.',
    visibleData: ['Xác nhận mở nhận đặt', 'Ghi chú tầng đang đóng'],
    primaryAction: 'Mở nhận đặt → AVL-01',
    secondaryActions: ['Quay lại → AVL-02'],
    nextScreen: 'AVL-01',
    errorsOrOutcomes: ['Không tự mở tầng hoặc cơ sở'],
    layout: [
      bar('Phòng 201'),
      {
        type: 'modal',
        title: 'Mở nhận đặt phòng 201?',
        blocks: [
          {
            type: 'alert',
            variant: 'warning',
            text: 'Phòng đã bật nhận đặt, nhưng tầng đang đóng nên chưa nhận được đơn mới.',
          },
        ],
        buttons: [
          { label: 'Mở nhận đặt', goto: 'AVL-01' },
          { label: 'Quay lại', variant: 'secondary', goto: 'AVL-02' },
        ],
      },
    ],
  },
  {
    ...inApp('Người tạo hoặc đổi đơn'),
    id: 'AVL-06',
    title: 'Chọn phòng đang ngừng nhận đặt',
    entryPoint: 'Tạo, đổi lịch hoặc chuyển phòng gặp phòng vừa đóng',
    objective:
      'Báo phòng không nhận đặt mới, giữ dữ liệu đã nhập và cho chọn phòng khác hoặc quay lại. Bộ chọn phòng không đưa phòng đã đóng vào danh sách.',
    visibleData: [
      'Thông báo không nhận đặt mới',
      'Dữ liệu đã nhập được giữ',
      'Lựa chọn phòng khác',
    ],
    primaryAction: 'Chọn phòng khác',
    secondaryActions: ['Quay lại → AVL-01'],
    errorsOrOutcomes: ['Không tạo đơn thay thế tự động'],
    layout: [
      bar('Đổi phòng'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Phòng 103 không nhận đặt mới',
        text: 'Dữ liệu bạn nhập được giữ lại. Hãy chọn phòng khác.',
      },
      {
        type: 'field',
        kind: 'select',
        label: 'Phòng',
        value: 'Phòng 101',
        options: ['Phòng 101', 'Phòng 102'],
      },
      buttons(
        { label: 'Chọn phòng này' },
        { label: 'Quay lại', variant: 'secondary', goto: 'AVL-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'AVL-07',
    title: 'Lỗi có thể phục hồi',
    entryPoint: 'Người khác vừa đổi, mất kết nối hoặc mất quyền',
    objective:
      'Báo lỗi đúng tình huống và không tuyên bố thành công khi chưa chắc.',
    visibleData: [
      '"Thông tin phòng đã thay đổi. Vui lòng tải lại."',
      'Mất kết nối: tải lại trạng thái trước khi thử lại',
      '"Bạn không có quyền truy cập." (không lộ mã quyền)',
    ],
    primaryAction: 'Tải lại → AVL-01',
    nextScreen: 'AVL-01',
    layout: [
      bar('Phòng 101'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Thông tin phòng đã thay đổi. Vui lòng tải lại.',
        actionLabel: 'Tải lại',
        goto: 'AVL-01',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Mất kết nối',
        text: 'Chưa xác nhận được thay đổi. Tải lại trạng thái trước khi thử lại.',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
    ],
  },
];

export const karaokeRoomAvailability: Flow = {
  id: 'karaoke-room-availability',
  title: 'Đóng mở nhận đặt phòng',
  role: 'karaoke-owner',
  section: 'setup',
  summary:
    'Ngừng hoặc mở lại việc nhận đặt mới của từng phòng mà không ảnh hưởng đơn đã đặt và khách đang hát.',
  actors: ['Owner', 'Manager hoặc người có quyền cấu hình phòng'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-room-availability.md',
};
