import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const rooms = (grouped: boolean): Screen['layout'] => [
  bar('Phòng', true, ['search']),
  {
    type: 'field',
    kind: 'input',
    label: 'Tìm phòng',
    placeholder: 'Tên phòng, trạng thái hoặc tầng',
  },
  ...(grouped
    ? ([
        { type: 'heading', text: 'Tầng 1 · Đang mở' },
        {
          type: 'cardList',
          items: [
            {
              icon: 'door-open',
              title: 'Phòng 101',
              subtitle: 'Sức chứa 10 · 250.000đ/giờ',
              badge: 'Trống',
              tone: 'success',
              goto: 'ROOM-03',
            },
            {
              icon: 'door-closed',
              title: 'Phòng 102',
              subtitle: 'Sức chứa 12 · 300.000đ/giờ',
              badge: 'Đang hát',
              tone: 'info',
              goto: 'ROOM-03',
            },
          ],
        },
        { type: 'heading', text: 'Tầng 2 · Đã đóng' },
        {
          type: 'cardList',
          items: [
            {
              icon: 'door-open',
              title: 'Phòng 201',
              subtitle: 'Sức chứa 8 · 200.000đ/giờ',
              badge: 'Đã đặt',
              tone: 'warning',
              goto: 'ROOM-03',
            },
          ],
        },
      ] as NonNullable<Screen['layout']>)
    : ([
        {
          type: 'cardList',
          items: [
            {
              icon: 'door-open',
              title: 'Phòng VIP 1',
              subtitle: 'Sức chứa 15 · 400.000đ/giờ',
              badge: 'Trống',
              tone: 'success',
              goto: 'ROOM-03',
            },
            {
              icon: 'door-closed',
              title: 'Phòng 02',
              subtitle: 'Sức chứa 10 · 250.000đ/giờ',
              badge: 'Đang hát',
              tone: 'info',
              goto: 'ROOM-03',
            },
            {
              icon: 'door-open',
              title: 'Phòng 03',
              subtitle: 'Sức chứa 8 · 200.000đ/giờ',
              badge: 'Đã đặt',
              tone: 'warning',
              goto: 'ROOM-03',
            },
          ],
        },
      ] as NonNullable<Screen['layout']>)),
  buttons({ label: 'Tạo phòng', goto: 'ROOM-02' }),
];

const roomForm = (
  title: string,
  confirm: string,
): NonNullable<Screen['layout']> => [
  bar(title),
  { type: 'field', kind: 'input', label: 'Tên phòng', value: 'Phòng 04' },
  { type: 'field', kind: 'input', label: 'Sức chứa (tuỳ chọn)', value: '10' },
  { type: 'field', kind: 'input', label: 'Thứ tự ưu tiên', value: '4' },
  {
    type: 'field',
    kind: 'select',
    label: 'Tầng',
    value: 'Tầng 1',
    options: ['Tầng 1', 'Tầng 2'],
    helper: 'Chỉ hiện khi cơ sở đang dùng tầng.',
  },
  {
    type: 'field',
    kind: 'input',
    label: 'Ảnh phòng (tuỳ chọn)',
    value: '2/5 ảnh',
    helper: 'Mỗi phòng tối đa 5 ảnh.',
  },
  {
    type: 'field',
    kind: 'input',
    label: 'Bảng giá theo khung giờ',
    value: '11:00 – 17:00 · 250.000đ/giờ',
    helper: 'Bảng giá phải phủ đủ 24 giờ từ giờ mở cửa.',
  },
  buttons(
    { label: confirm, goto: 'ROOM-03' },
    { label: 'Huỷ', variant: 'secondary', goto: 'ROOM-01' },
  ),
];

const screens: Screen[] = [
  {
    ...inApp(),
    id: 'ROOM-01',
    title: 'Danh sách phòng và bộ lọc',
    entryPoint: 'Thiết lập quán → Phòng và giá',
    objective:
      'Xem danh sách phòng của cơ sở không dùng tầng, tìm theo từ khoá, trạng thái và tầng.',
    visibleData: [
      'Ảnh đại diện, tên, sức chứa, trạng thái, giá tại thời điểm đang xem',
      'Ô tìm kiếm, bộ lọc, phân trang',
    ],
    primaryAction: 'Tạo phòng → ROOM-02',
    secondaryActions: ['Chọn phòng → ROOM-03'],
    nextScreen: 'ROOM-03',
    errorsOrOutcomes: ['Danh sách trống: gợi ý tạo phòng', 'Lỗi tải: thử lại'],
    layout: rooms(false),
  },
  {
    ...inApp(),
    id: 'ROOM-02',
    title: 'Tạo phòng mới',
    entryPoint: 'Nút Tạo phòng ở danh sách',
    objective:
      'Nhập thông tin phòng mới: tên, sức chứa, thứ tự, tầng, ảnh và bảng giá.',
    visibleData: [
      'Tên phòng (bắt buộc)',
      'Sức chứa (tuỳ chọn)',
      'Thứ tự ưu tiên',
      'Tầng (bắt buộc khi cơ sở dùng tầng)',
      'Ảnh phòng (tuỳ chọn, tối đa 5 ảnh mỗi phòng)',
      'Bảng giá theo khung giờ',
    ],
    userInput: ['Tên phòng', 'Sức chứa', 'Thứ tự', 'Tầng', 'Ảnh', 'Bảng giá'],
    primaryAction: 'Tạo → ROOM-03',
    secondaryActions: ['Huỷ → ROOM-01'],
    nextScreen: 'ROOM-03',
    errorsOrOutcomes: [
      'Lỗi hiện sát trường nhập',
      'Cấu trúc tầng đổi trong lúc nhập: tải lại danh sách tầng, giữ dữ liệu giữ được',
    ],
    layout: roomForm('Tạo phòng mới', 'Tạo phòng'),
  },
  {
    ...inApp(),
    id: 'ROOM-03',
    title: 'Chi tiết và chỉnh sửa phòng',
    entryPoint: 'Chọn một phòng ở danh sách',
    objective:
      'Xem và sửa thông tin phòng, ảnh, giá hiện tại và lịch sử trạng thái.',
    visibleData: [
      'Thông tin phòng',
      'Ảnh',
      'Giá hiện tại và lịch sử giá',
      'Lịch sử trạng thái',
    ],
    userInput: ['Tên phòng', 'Sức chứa', 'Thứ tự', 'Tầng'],
    primaryAction: 'Lưu thay đổi tại ROOM-03',
    secondaryActions: ['Quản lý ảnh → ROOM-04', 'Xoá phòng → ROOM-05'],
    nextScreen: 'ROOM-04',
    errorsOrOutcomes: [
      'Tên chỉ gồm khoảng trắng: không cho lưu',
      'Dữ liệu vừa đổi: tải lại',
      'Thiếu quyền: thông báo chung',
    ],
    layout: [
      bar('Phòng 101'),
      { type: 'heading', text: 'Thông tin phòng' },
      { type: 'field', kind: 'input', label: 'Tên phòng', value: 'Phòng 101' },
      { type: 'field', kind: 'input', label: 'Sức chứa', value: '10' },
      {
        type: 'field',
        kind: 'select',
        label: 'Tầng',
        value: 'Tầng 1',
        options: ['Tầng 1', 'Tầng 2'],
      },
      { type: 'heading', text: 'Giá hiện tại' },
      {
        type: 'keyValue',
        rows: [
          { label: '11:00 – 17:00', value: '250.000đ/giờ' },
          { label: '17:00 – 11:00', value: '350.000đ/giờ' },
        ],
      },
      { type: 'heading', text: 'Lịch sử trạng thái' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Hôm nay 19:00', value: 'Đang hát' },
          { label: 'Hôm nay 16:30', value: 'Trống' },
        ],
      },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'image',
            title: 'Quản lý ảnh',
            description: '3/5 ảnh',
            goto: 'ROOM-04',
          },
          {
            icon: 'trash',
            title: 'Xoá phòng',
            tone: 'danger',
            goto: 'ROOM-05',
          },
        ],
      },
      buttons({ label: 'Lưu thay đổi' }),
    ],
  },
  {
    ...inApp(),
    id: 'ROOM-04',
    title: 'Quản lý ảnh phòng',
    entryPoint: 'Chi tiết phòng → Quản lý ảnh',
    objective: 'Thêm, sắp xếp, xem trước (kể cả ảnh 360 độ) và xoá ảnh phòng.',
    visibleData: [
      'Danh sách ảnh và trạng thái xử lý',
      'Thứ tự ảnh',
      'Xem trước ảnh thường hoặc 360 độ',
      'Số ảnh đã có trên tối đa 5 ảnh mỗi phòng (ví dụ 3/5)',
    ],
    primaryAction: 'Thêm ảnh rồi quay lại → ROOM-03',
    secondaryActions: ['Quay lại → ROOM-03'],
    nextScreen: 'ROOM-03',
    errorsOrOutcomes: [
      'Ảnh lỗi hoặc chưa sẵn sàng: thay ảnh hoặc thử lại',
      'Xoá ảnh qua hộp xác nhận',
      'Đủ 5 ảnh: khoá nút Thêm ảnh và báo giới hạn; xoá một ảnh mới thêm được ảnh khác',
      'Chọn quá 5 ảnh cùng lúc: chỉ nhận 5 ảnh đầu và báo "Mỗi phòng tối đa 5 ảnh"',
    ],
    layout: [
      bar('Ảnh phòng 101'),
      { type: 'keyValue', rows: [{ label: 'Số ảnh', value: '3/5' }] },
      {
        type: 'cardList',
        items: [
          {
            icon: 'image',
            title: 'Ảnh chính',
            subtitle: 'Thứ tự 1',
            badge: 'Sẵn sàng',
            tone: 'success',
          },
          {
            icon: 'image',
            title: 'Ảnh 360 độ',
            subtitle: 'Thứ tự 2',
            badge: 'Đang xử lý',
            tone: 'info',
          },
          {
            icon: 'image',
            title: 'Ảnh cận cảnh',
            subtitle: 'Thứ tự 3',
            badge: 'Lỗi',
            tone: 'danger',
          },
        ],
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Một ảnh không xử lý được',
        text: 'Thay ảnh khác hoặc thử tải lại.',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Mỗi phòng tối đa 5 ảnh. Khi đủ 5 ảnh, xoá một ảnh để thêm ảnh khác.',
      },
      buttons(
        { label: 'Thêm ảnh (3/5)' },
        { label: 'Xong', variant: 'secondary', goto: 'ROOM-03' },
      ),
    ],
  },
  {
    ...inApp(),
    id: 'ROOM-05',
    title: 'Xoá phòng khỏi vận hành',
    entryPoint: 'Chi tiết phòng → Xoá phòng',
    objective:
      'Xác nhận đưa phòng khỏi vận hành nhưng vẫn giữ lịch sử. Không dùng chữ "Đóng phòng".',
    visibleData: ['Hộp xác nhận giải thích xoá khỏi vận hành, giữ lịch sử'],
    primaryAction: 'Xác nhận xoá → ROOM-01',
    secondaryActions: ['Giữ phòng → ROOM-03'],
    nextScreen: 'ROOM-01',
    errorsOrOutcomes: [
      'Phòng Đã đặt hoặc Đang hát: không xoá được, báo cần kết thúc nghiệp vụ hiện tại trước',
    ],
    layout: [
      bar('Phòng 101'),
      { type: 'text', text: 'Phòng 101 · Sức chứa 10 · Tầng 1' },
      {
        type: 'modal',
        title: 'Xoá phòng 101 khỏi vận hành?',
        blocks: [
          {
            type: 'text',
            text: 'Phòng sẽ không còn trong vận hành nhưng lịch sử đặt phòng vẫn được giữ.',
            muted: true,
          },
        ],
        buttons: [
          { label: 'Xác nhận xoá', variant: 'danger', goto: 'ROOM-01' },
          { label: 'Giữ phòng', variant: 'secondary', goto: 'ROOM-03' },
        ],
      },
    ],
  },
  {
    ...inApp(),
    id: 'ROOM-06',
    title: 'Danh sách phòng theo tầng',
    entryPoint: 'Thiết lập quán → Phòng và giá, khi cơ sở dùng tầng',
    objective:
      'Xem phòng nhóm theo Tầng 1, Tầng 2, kèm nhãn tầng mở hoặc đóng.',
    visibleData: [
      'Nhóm theo tầng, nhãn mở/đóng',
      'Tên, sức chứa, trạng thái, giá',
      'Bộ lọc từ khoá, trạng thái, tầng và phân trang',
    ],
    primaryAction: 'Tạo phòng → ROOM-02',
    secondaryActions: ['Chọn phòng → ROOM-03'],
    nextScreen: 'ROOM-03',
    layout: rooms(true),
  },
  {
    ...inApp(),
    id: 'ROOM-07',
    title: 'Chưa có phòng',
    entryPoint: 'Cơ sở chưa tạo phòng nào',
    objective: 'Gợi ý tạo phòng đầu tiên.',
    visibleData: ['Thông báo trạng thái trống', 'Nút Tạo phòng'],
    primaryAction: 'Tạo phòng → ROOM-02',
    nextScreen: 'ROOM-02',
    layout: [
      bar('Phòng'),
      {
        type: 'empty',
        icon: 'door-open',
        title: 'Chưa có phòng',
        text: 'Tạo phòng đầu tiên để bắt đầu nhận đặt.',
        actionLabel: 'Tạo phòng',
        goto: 'ROOM-02',
      },
    ],
  },
  {
    ...inApp(),
    id: 'ROOM-08',
    title: 'Không có quyền hoặc dữ liệu đã đổi',
    entryPoint: 'Thiếu quyền, hoặc giá, tầng vừa được thay ở máy khác',
    objective:
      'Thông báo chung khi thiếu quyền; yêu cầu tải lại khi dữ liệu vừa thay đổi. Không lộ mã quyền.',
    visibleData: [
      'Thông báo "Bạn không có quyền truy cập"',
      'Yêu cầu tải lại trước khi gửi lại',
    ],
    primaryAction: 'Tải lại → ROOM-01',
    nextScreen: 'ROOM-01',
    layout: [
      bar('Phòng'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Bảng giá vừa được thay ở thiết bị khác',
        text: 'Tải lại để xem bản mới nhất rồi lưu lại.',
        actionLabel: 'Tải lại',
        goto: 'ROOM-01',
      },
    ],
  },
];

export const karaokeRoomManagement: Flow = {
  id: 'karaoke-room-management',
  title: 'Quản trị phòng Karaoke',
  role: 'karaoke-owner',
  section: 'setup',
  summary:
    'Danh sách, tạo, sửa, quản lý ảnh và xoá phòng của cơ sở Karaoke, gồm hai chế độ hiển thị có tầng và không tầng.',
  actors: ['Owner', 'Manager hoặc nhân sự có quyền phòng'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-room-management.md',
};
