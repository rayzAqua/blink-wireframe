import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const manage = {
  environment: 'REACT_PWA' as const,
  actor: 'Owner hoặc Manager',
};

const screens: Screen[] = [
  {
    ...manage,
    id: 'TAG-01',
    title: 'Quản lý nhãn đơn',
    entryPoint: 'Thiết lập quán → Nhãn đơn',
    objective:
      'Xem nhãn của cơ sở: tên, icon, màu và thứ tự. Mặc định là nhãn đang dùng, có lựa chọn xem nhãn đã ngừng dùng.',
    visibleData: [
      'Tên, icon, màu, thứ tự của từng nhãn',
      'Lựa chọn xem nhãn đã ngừng dùng',
      'Vice Manager chỉ thấy khi được cấp quyền; Booking, TableHost, Lễ tân không thấy',
    ],
    primaryAction: 'Tạo nhãn → TAG-02',
    secondaryActions: ['Chọn nhãn → TAG-03'],
    nextScreen: 'TAG-02',
    layout: [
      bar('Nhãn đơn'),
      { type: 'tabs', items: ['Đang dùng', 'Đã ngừng dùng'], active: 0 },
      {
        type: 'cardList',
        items: [
          {
            icon: 'tag',
            title: 'Khách quen',
            subtitle: 'Màu xanh · thứ tự 1',
            badge: 'Đang dùng',
            tone: 'success',
            goto: 'TAG-03',
          },
          {
            icon: 'tag',
            title: 'Sinh nhật',
            subtitle: 'Màu hồng · thứ tự 2',
            badge: 'Đang dùng',
            tone: 'success',
            goto: 'TAG-03',
          },
        ],
      },
      buttons({ label: 'Tạo nhãn', goto: 'TAG-02' }),
    ],
  },
  {
    ...manage,
    id: 'TAG-02',
    title: 'Tạo hoặc sửa nhãn',
    entryPoint: 'Tạo nhãn hoặc Sửa nhãn',
    objective:
      'Nhập tên, chọn icon, màu và thứ tự. Lỗi báo ngay tại form và giữ nguyên dữ liệu.',
    visibleData: ['Tên nhãn', 'Icon', 'Màu', 'Thứ tự'],
    userInput: ['Tên nhãn', 'Icon', 'Màu', 'Thứ tự'],
    primaryAction: 'Lưu → TAG-01',
    secondaryActions: ['Huỷ → TAG-01'],
    nextScreen: 'TAG-01',
    errorsOrOutcomes: [
      'Tên trống, quá dài, màu không hợp lệ hoặc trùng tên (kể cả nhãn đã ngừng dùng): báo tại form, không tự kích hoạt lại',
    ],
    layout: [
      bar('Tạo nhãn'),
      {
        type: 'field',
        kind: 'input',
        label: 'Tên nhãn',
        value: 'Khách quen',
        error: 'Tên nhãn đã tồn tại (kể cả nhãn đã ngừng dùng).',
      },
      {
        type: 'field',
        kind: 'select',
        label: 'Icon',
        value: 'Thẻ',
        options: ['Thẻ', 'Ngôi sao', 'Quà'],
      },
      {
        type: 'field',
        kind: 'select',
        label: 'Màu',
        value: 'Xanh',
        options: ['Xanh', 'Hồng', 'Vàng'],
      },
      { type: 'field', kind: 'input', label: 'Thứ tự', value: '1' },
      buttons(
        { label: 'Lưu', goto: 'TAG-01' },
        { label: 'Huỷ', variant: 'secondary', goto: 'TAG-01' },
      ),
    ],
  },
  {
    ...manage,
    id: 'TAG-03',
    title: 'Chi tiết nhãn',
    entryPoint: 'Chọn một nhãn ở danh sách',
    objective:
      'Sửa nhãn hoặc ngừng dùng, kích hoạt lại. Thông tin mới hiện ngay trên đơn đang phục vụ và đơn trong lịch sử.',
    visibleData: [
      'Thông tin nhãn',
      'Hành động Ngừng sử dụng hoặc Kích hoạt lại',
    ],
    primaryAction: 'Sửa nhãn → TAG-02',
    secondaryActions: ['Ngừng sử dụng → TAG-01'],
    nextScreen: 'TAG-02',
    errorsOrOutcomes: [
      'Ngừng dùng không làm mất nhãn trên đơn cũ; nhãn không còn được chọn cho đơn khác',
      'Người khác vừa sửa: báo dữ liệu đã thay đổi và tải lại trước khi lưu',
    ],
    layout: [
      bar('Khách quen'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Icon', value: 'Thẻ' },
          { label: 'Màu', value: 'Xanh' },
          { label: 'Thứ tự', value: '1' },
          { label: 'Trạng thái', value: 'Đang dùng' },
        ],
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Ngừng sử dụng không làm mất nhãn trên đơn cũ.',
      },
      buttons(
        { label: 'Sửa nhãn', goto: 'TAG-02' },
        { label: 'Ngừng sử dụng', variant: 'danger', goto: 'TAG-01' },
      ),
    ],
  },
  {
    ...inApp('Nhân sự có quyền gắn nhãn'),
    id: 'TAG-04',
    title: 'Chọn nhãn cho đơn',
    entryPoint: 'Danh sách đơn, chi tiết đơn hoặc tạo đơn',
    objective:
      'Chọn một nhãn hoặc Bỏ nhãn cho đơn. Nhãn chỉ để nhận biết, không đổi loại đơn.',
    visibleData: [
      'Mỗi lựa chọn có icon, tên, màu',
      'Chọn một nhãn hoặc Bỏ nhãn',
    ],
    primaryAction: 'Chọn nhãn → TAG-05',
    nextScreen: 'TAG-05',
    errorsOrOutcomes: [
      'Booking chỉ sửa nhãn đơn do lần làm việc hiện tại của mình tạo',
      'TableHost chỉ sửa khi khách đang dùng phòng và mình tạo hoặc mở phòng',
      'Lễ tân chỉ xem nhãn; đơn đã kết thúc hoặc đã huỷ chỉ hiển thị nhãn',
    ],
    layout: [
      bar('Đơn #1024'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Phòng', value: 'Phòng 101' },
          { label: 'Nguồn đơn', value: 'Đặt trước' },
        ],
      },
      {
        type: 'bottomSheet',
        title: 'Chọn nhãn',
        blocks: [
          {
            type: 'listGroup',
            rows: [
              { icon: 'tag', title: 'Khách quen', goto: 'TAG-05' },
              { icon: 'tag', title: 'Sinh nhật', goto: 'TAG-05' },
              { icon: 'x', title: 'Bỏ nhãn', goto: 'TAG-05' },
            ],
          },
        ],
      },
    ],
  },
  {
    ...inApp('Nhân sự có quyền xem đơn'),
    id: 'TAG-05',
    title: 'Danh sách đơn có nhãn',
    entryPoint: 'Sau khi gắn nhãn, hoặc mở danh sách đơn',
    objective:
      'Xem nhãn trên danh sách và chi tiết; lọc theo một nhãn hoặc chỉ xem đơn chưa có nhãn, không chọn cả hai cùng lúc.',
    visibleData: [
      'Nhãn trên từng đơn',
      'Bộ lọc theo một nhãn hoặc đơn chưa có nhãn',
      'Lịch sử gắn và gỡ nhãn theo lịch sử đơn hiện có',
    ],
    primaryAction: 'Chọn nhãn cho đơn → TAG-04',
    nextScreen: 'TAG-04',
    errorsOrOutcomes: ['Không mở màn hình Admin Audit cho nhân sự cơ sở'],
    layout: [
      bar('Đơn', true, ['search']),
      {
        type: 'tabs',
        items: ['Tất cả', 'Khách quen', 'Chưa có nhãn'],
        active: 1,
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'tag',
            title: 'Đơn #1024 · Phòng 101',
            subtitle: 'Khách quen',
            badge: 'Đã xác nhận',
            tone: 'success',
            goto: 'TAG-04',
          },
          {
            icon: 'tag',
            title: 'Đơn #1025 · Phòng 102',
            subtitle: 'Sinh nhật',
            badge: 'Đang hát',
            tone: 'info',
            goto: 'TAG-04',
          },
        ],
      },
    ],
  },
  {
    ...inApp('Nhân sự có quyền gắn nhãn'),
    id: 'TAG-06',
    title: 'Lỗi khi gắn hoặc quản lý nhãn',
    entryPoint: 'Nhãn vừa ngừng dùng, đơn vừa đổi hoặc mất quyền',
    objective:
      'Báo nhãn không còn sử dụng, đơn đã thay đổi hoặc mất quyền, rồi tải lại; không tự ghi đè.',
    visibleData: [
      '"Nhãn không còn sử dụng" và tải lại bộ chọn, giữ nhãn đang gắn',
      'Đơn đã thay đổi hoặc kết thúc: tải lại chi tiết',
      'Mất quyền: báo không có quyền và cập nhật thao tác hiển thị',
    ],
    primaryAction: 'Tải lại → TAG-05',
    nextScreen: 'TAG-05',
    layout: [
      bar('Đơn #1024'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Nhãn không còn sử dụng',
        text: 'Nhãn đang gắn được giữ nguyên. Tải lại danh sách nhãn.',
        actionLabel: 'Tải lại',
        goto: 'TAG-05',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Đơn vừa thay đổi',
        text: 'Tải lại chi tiết đơn trước khi sửa tiếp.',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: 'Khách đặt phòng',
    id: 'TAG-07',
    title: 'Trang xác nhận đơn của khách',
    entryPoint: 'Khách mở link xác nhận đặt phòng',
    objective:
      'Khách xem nội dung đặt phòng và xác nhận. Trang không hiển thị nhãn nội bộ.',
    visibleData: ['Nội dung đặt phòng hiện tại', 'Không có nhãn nội bộ'],
    primaryAction: 'Xác nhận đặt phòng → TAG-08',
    nextScreen: 'TAG-08',
    layout: [
      bar('Karaoke Blink Sài Gòn', false),
      { type: 'heading', text: 'Xác nhận đặt phòng' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Phòng', value: 'Phòng 101' },
          { label: 'Giờ hẹn', value: '19:00 hôm nay' },
          { label: 'Số khách', value: '8' },
        ],
      },
      buttons({ label: 'Xác nhận đặt phòng', goto: 'TAG-08' }),
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: 'Khách đặt phòng',
    id: 'TAG-08',
    title: 'Kết quả xác nhận của khách',
    entryPoint: 'Khách bấm xác nhận',
    objective: 'Khách nhận kết quả xác nhận thông thường.',
    visibleData: ['Thông báo đã xác nhận đặt phòng'],
    primaryAction: 'Đóng trang',
    layout: [
      bar('Karaoke Blink Sài Gòn', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Đã xác nhận đặt phòng',
        text: 'Phòng 101 được giữ cho bạn lúc 19:00 hôm nay.',
      },
    ],
  },
];

export const bookingTagging: Flow = {
  id: 'booking-tagging',
  title: 'Gắn nhãn đơn',
  role: 'karaoke-owner',
  section: 'setup',
  summary:
    'Quản lý nhãn của cơ sở, gắn nhãn cho đơn và lọc đơn theo nhãn; kèm trang xác nhận đơn công khai của khách không hiển thị nhãn nội bộ.',
  actors: ['Owner', 'Manager', 'Nhân sự có quyền gắn nhãn', 'Khách đặt phòng'],
  environments: ['REACT_PWA', 'FLUTTER_APP', 'WEB_PUBLIC'],
  screens,
  source: 'docs/wireframes/karaoke-owner/booking-tagging.md',
};
