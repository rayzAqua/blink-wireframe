import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const floorsList: Block[] = [
  { type: 'heading', text: 'Tầng 1' },
  {
    type: 'cardList',
    items: [
      {
        icon: 'layers',
        title: 'Tầng 1',
        subtitle: '4 phòng',
        badge: 'Đang mở',
        tone: 'success',
      },
    ],
  },
  { type: 'heading', text: 'Tầng 2' },
  {
    type: 'cardList',
    items: [
      {
        icon: 'layers',
        title: 'Tầng 2',
        subtitle: '3 phòng',
        badge: 'Đã đóng',
        tone: 'warning',
        goto: 'FLR-04',
      },
    ],
  },
];

const screens: Screen[] = [
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-01',
    title: 'Danh sách tầng',
    entryPoint: 'Thiết lập quán → Tầng',
    objective:
      'Xem các nhóm tầng, trạng thái mở hoặc đóng và số phòng; đi tới thiết lập hoặc đóng, mở tầng.',
    visibleData: [
      'Mỗi tầng: số tầng, trạng thái (nhãn và chữ), số phòng',
      'Mở nhóm để xem phòng của tầng',
    ],
    primaryAction: 'Thay đổi tầng → FLR-02',
    secondaryActions: [
      'Đóng hoặc mở tầng → FLR-04',
      'Xem cơ sở không dùng tầng → FLR-05',
    ],
    nextScreen: 'FLR-02',
    errorsOrOutcomes: ['Không có tầng hoặc phòng: hiển thị hướng dẫn phù hợp'],
    layout: [
      bar('Tầng'),
      ...floorsList,
      buttons(
        { label: 'Thay đổi tầng', goto: 'FLR-02' },
        { label: 'Đóng hoặc mở tầng', variant: 'secondary', goto: 'FLR-04' },
      ),
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-02',
    title: 'Thiết lập số tầng và phân phòng',
    entryPoint: 'Nút Thiết lập tầng hoặc Thay đổi tầng',
    objective:
      'Nhập số tầng và phân toàn bộ phòng vào các tầng. Phòng chưa chọn nằm tạm trong nhóm "Chưa xếp tầng" cho tới khi xếp hết.',
    visibleData: [
      'Số tầng (tối đa 100)',
      'Tầng 1, Tầng 2... liên tiếp',
      'Nhóm tạm "Chưa xếp tầng"',
      'Nút lưu bị khoá khi nhóm này còn phòng',
    ],
    userInput: ['Số tầng', 'Tầng của từng phòng'],
    primaryAction: 'Kiểm tra → FLR-03',
    secondaryActions: ['Huỷ → FLR-01'],
    nextScreen: 'FLR-03',
    errorsOrOutcomes: [
      'Tăng số tầng: tầng mới liên tiếp và để trống',
      'Giảm số tầng: chỉ bỏ các tầng cao nhất; tầng còn phòng thì phải chuyển hết phòng trước',
      'Còn phòng chưa xếp: khoá nút lưu',
    ],
    layout: [
      bar('Thiết lập tầng'),
      { type: 'field', kind: 'input', label: 'Số tầng', value: '2' },
      { type: 'heading', text: 'Chưa xếp tầng' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'door-open',
            title: 'Phòng 301',
            subtitle: 'Chọn tầng cho phòng này',
            badge: 'Chưa xếp',
            tone: 'warning',
          },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Còn 1 phòng chưa xếp tầng. Xếp hết phòng để tiếp tục.',
      },
      buttons(
        { label: 'Kiểm tra', goto: 'FLR-03' },
        { label: 'Huỷ', variant: 'secondary', goto: 'FLR-01' },
      ),
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-03',
    title: 'Xác nhận thay đổi cấu trúc tầng',
    entryPoint: 'FLR-02 → Kiểm tra',
    objective:
      'Tóm tắt việc tăng, giảm hoặc tắt tầng và các phòng bị ảnh hưởng trước khi lưu.',
    visibleData: [
      'Tóm tắt tăng, giảm, tắt tầng',
      'Danh sách phòng bị ảnh hưởng',
    ],
    primaryAction: 'Lưu cấu hình → FLR-01',
    secondaryActions: ['Quay lại → FLR-02', 'Tắt cơ chế tầng → FLR-06'],
    nextScreen: 'FLR-01',
    errorsOrOutcomes: [
      'Tầng còn phòng hoặc dữ liệu vừa đổi: tải lại hoặc sắp xếp lại',
      'Một yêu cầu thất bại giữ nguyên cấu trúc cũ',
    ],
    layout: [
      bar('Xác nhận thay đổi tầng'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Số tầng', value: '2 → 3' },
          { label: 'Phòng bị ảnh hưởng', value: '1 phòng' },
        ],
      },
      { type: 'text', text: 'Phòng 301 sẽ nằm ở Tầng 3.' },
      buttons(
        { label: 'Lưu cấu hình', goto: 'FLR-01' },
        { label: 'Quay lại', variant: 'secondary', goto: 'FLR-02' },
      ),
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-04',
    title: 'Đóng hoặc mở lại tầng',
    entryPoint: 'Tầng đang mở có Đóng tầng; tầng đã đóng có Mở lại',
    objective:
      'Xác nhận đóng hoặc mở lại một tầng và nói rõ ảnh hưởng tới đơn hiện có.',
    visibleData: [
      'Không nhận đặt phòng mới ở tầng đóng',
      'Đơn đã đặt vẫn được giữ',
      'Phòng đang hát vẫn tiếp tục',
      'Tầng và phòng vẫn hiện trong màn quản lý',
    ],
    primaryAction: 'Xác nhận → FLR-01',
    secondaryActions: ['Giữ nguyên → FLR-01'],
    nextScreen: 'FLR-01',
    errorsOrOutcomes: ['Thiếu quyền hoặc tầng vừa đổi: giữ trạng thái cũ'],
    layout: [
      bar('Tầng'),
      ...floorsList,
      {
        type: 'modal',
        title: 'Đóng Tầng 1?',
        blocks: [
          {
            type: 'text',
            text: 'Không nhận đặt phòng mới ở tầng này. Đơn đã đặt vẫn được giữ, phòng đang hát vẫn tiếp tục. Tầng và phòng vẫn hiện trong màn quản lý.',
            muted: true,
          },
        ],
        buttons: [
          { label: 'Đóng tầng', variant: 'danger', goto: 'FLR-01' },
          { label: 'Giữ nguyên', variant: 'secondary', goto: 'FLR-01' },
        ],
      },
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-05',
    title: 'Cơ sở không dùng tầng',
    entryPoint: 'Cơ sở chưa bật cơ chế tầng',
    objective:
      'Giải thích cơ sở đang dùng danh sách phòng phẳng và cho thiết lập tầng nếu có quyền.',
    visibleData: [
      'Danh sách phòng phẳng',
      'Hành động Thiết lập tầng nếu có quyền',
    ],
    primaryAction: 'Thiết lập tầng → FLR-02',
    nextScreen: 'FLR-02',
    errorsOrOutcomes: ['Không có phòng: vẫn cho tạo tầng trống'],
    layout: [
      bar('Tầng'),
      {
        type: 'alert',
        variant: 'info',
        text: 'Cơ sở đang dùng danh sách phòng phẳng, chưa chia tầng.',
      },
      {
        type: 'cardList',
        items: [
          { icon: 'door-open', title: 'Phòng 01' },
          { icon: 'door-open', title: 'Phòng 02' },
        ],
      },
      buttons({ label: 'Thiết lập tầng', goto: 'FLR-02' }),
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-06',
    title: 'Tắt cơ chế tầng',
    entryPoint: 'Cấu hình tầng → Tắt cơ chế tầng',
    objective:
      'Xác nhận quay về danh sách phòng phẳng; phòng, đơn đã đặt và phòng đang sử dụng không bị ảnh hưởng.',
    visibleData: [
      'Toàn bộ phòng vẫn được giữ',
      'Liên kết tầng bị gỡ',
      'Giao diện trở lại danh sách phẳng',
      'Đơn đã đặt và phòng đang sử dụng không bị huỷ',
    ],
    primaryAction: 'Tắt cơ chế tầng → FLR-05',
    secondaryActions: ['Giữ cơ chế tầng → FLR-01'],
    nextScreen: 'FLR-05',
    layout: [
      bar('Tầng'),
      ...floorsList,
      {
        type: 'modal',
        title: 'Tắt cơ chế tầng?',
        blocks: [
          {
            type: 'text',
            text: 'Toàn bộ phòng vẫn được giữ, liên kết tầng bị gỡ và danh sách trở về dạng phẳng. Đơn đã đặt và phòng đang sử dụng không bị huỷ.',
            muted: true,
          },
        ],
        buttons: [
          { label: 'Tắt cơ chế tầng', variant: 'danger', goto: 'FLR-05' },
          { label: 'Giữ cơ chế tầng', variant: 'secondary', goto: 'FLR-01' },
        ],
      },
    ],
  },
  {
    ...inApp('Owner, Manager hoặc Vice Manager có quyền'),
    id: 'FLR-07',
    title: 'Lỗi khi đổi cấu trúc tầng',
    entryPoint: 'Giảm tầng còn phòng, dữ liệu vừa đổi hoặc thiếu quyền',
    objective:
      'Báo rõ lỗi: tầng nào còn bao nhiêu phòng cần chuyển, cấu trúc đã đổi cần tải lại, hoặc thiếu quyền.',
    visibleData: [
      'Tầng và số phòng cần chuyển',
      'Yêu cầu tải lại',
      'Thông báo chung khi thiếu quyền',
    ],
    primaryAction: 'Tải lại → FLR-01',
    nextScreen: 'FLR-01',
    layout: [
      bar('Tầng'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Tầng 3 còn 2 phòng',
        text: 'Chuyển hết phòng sang tầng khác rồi giảm số tầng.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Cấu trúc tầng đã thay đổi, vui lòng tải lại',
        actionLabel: 'Tải lại',
        goto: 'FLR-01',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
    ],
  },
];

export const karaokeFloors: Flow = {
  id: 'karaoke-floors',
  title: 'Quản trị tầng Karaoke',
  role: 'karaoke-owner',
  section: 'setup',
  summary:
    'Thiết lập tầng lần đầu, tăng giảm số tầng, tắt cơ chế tầng, đóng mở từng tầng và chuyển phòng giữa các tầng.',
  actors: ['Owner', 'Manager hoặc Vice Manager có quyền'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-floors.md',
};
