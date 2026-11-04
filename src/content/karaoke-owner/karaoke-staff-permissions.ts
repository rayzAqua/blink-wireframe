import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner, Quản lý hoặc Phó quản lý được ủy quyền';

const staffCard: Block = {
  type: 'hero',
  title: 'An Booking',
  logo: true,
  lines: ['Booking · Karaoke Blink Sài Gòn'],
  status: 'Đang làm',
};

const permissionList: Block = {
  type: 'listGroup',
  label: 'Nhóm Đơn đặt phòng',
  rows: [
    {
      icon: 'calendar',
      title: 'Tạo đơn đặt trước',
      description: 'Theo vai trò · đang dùng',
    },
    {
      icon: 'calendar',
      title: 'Huỷ đơn đặt phòng',
      description: 'Chặn · không dùng',
      badge: 'Chặn',
    },
    {
      icon: 'lock',
      title: 'Xem hồ sơ danh tính',
      description:
        'Quyền nhạy cảm · Cấp thêm nhưng bị tắt ở cấp vai trò, chưa dùng được',
      badge: 'Chưa dùng được',
    },
  ],
};

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'PRM-01',
    title: 'Lối vào từ hồ sơ nhân sự',
    entryPoint: 'Hồ sơ công việc của một nhân sự',
    objective:
      'Nút Phân quyền cạnh các thao tác nhân sự khác. Nút hiện nhưng chỉ cho xem nếu người xem không có quyền chỉnh.',
    visibleData: [
      'Nút Phân quyền',
      'Không hiện khi nhân sự là chính người xem, là Owner hoặc đã nghỉ việc',
    ],
    primaryAction: 'Phân quyền → PRM-02',
    nextScreen: 'PRM-02',
    layout: [
      bar('An Booking'),
      staffCard,
      {
        type: 'listGroup',
        rows: [
          { icon: 'pencil', title: 'Sửa hồ sơ công việc' },
          { icon: 'user-cog', title: 'Phân quyền', goto: 'PRM-02' },
          { icon: 'user-x', title: 'Tạm dừng hoặc kết thúc' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-02',
    title: 'Xem quyền của nhân sự',
    entryPoint: 'PRM-01',
    objective:
      'Xem quyền theo nhóm với ba trạng thái Theo vai trò, Cấp thêm, Chặn, có đang dùng hay không.',
    visibleData: [
      'Tên, vị trí, trạng thái làm việc',
      'Quyền theo nhóm; quyền cấp thêm nhưng bị chặn ở cấp vai trò hiện rõ là chưa dùng được',
      'Số quyền cấp thêm và quyền bị chặn',
      'Nhân sự đang tạm dừng: cảnh báo quyền chỉ dùng được sau khi kích hoạt lại',
    ],
    primaryAction: 'Chỉnh quyền → PRM-03',
    secondaryActions: [
      'Đặt lại về quyền theo vai trò → PRM-07',
      'Không chỉnh được → PRM-08',
    ],
    nextScreen: 'PRM-03',
    errorsOrOutcomes: [
      'Không tải được: Thử lại',
      'Nhân sự không còn thuộc cơ sở hoặc đã nghỉ việc: PRM-08',
    ],
    layout: [
      bar('Quyền của An Booking'),
      staffCard,
      {
        type: 'keyValue',
        rows: [
          { label: 'Cấp thêm', value: '1 quyền' },
          { label: 'Chặn', value: '1 quyền' },
        ],
      },
      permissionList,
      buttons(
        { label: 'Chỉnh quyền', goto: 'PRM-03' },
        {
          label: 'Đặt lại về quyền theo vai trò',
          variant: 'secondary',
          goto: 'PRM-07',
        },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-03',
    title: 'Chỉnh quyền',
    entryPoint: 'PRM-02 → Chỉnh quyền',
    objective:
      'Đổi từng quyền giữa Theo vai trò, Cấp thêm và Chặn khi được phép. Lựa chọn không được phép bị khoá kèm lý do.',
    visibleData: [
      'Quyền chưa có ở vai trò: chỉ Cấp thêm hoặc giữ nguyên',
      'Quyền đang có ở vai trò: chỉ Chặn hoặc giữ nguyên',
      'Phó quản lý ủy quyền chỉ thấy quyền thông thường mình đang có',
      'Lựa chọn không được phép bị khoá, ví dụ "Bạn không được cấp quyền này"',
    ],
    primaryAction: 'Tiếp tục → PRM-04',
    secondaryActions: ['Huỷ → PRM-02'],
    nextScreen: 'PRM-04',
    layout: [
      bar('Chỉnh quyền An Booking'),
      {
        type: 'field',
        kind: 'radio',
        label: 'Huỷ đơn đặt phòng',
        value: 'Chặn',
        options: ['Theo vai trò', 'Chặn'],
      },
      {
        type: 'field',
        kind: 'radio',
        label: 'Xem hồ sơ danh tính',
        value: 'Theo vai trò',
        options: ['Theo vai trò', 'Cấp thêm'],
        helper: 'Bạn không được cấp quyền này.',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Thay đổi có hiệu lực ngay ở thao tác tiếp theo của nhân sự, không cần đăng nhập lại.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'PRM-04' },
        { label: 'Huỷ', variant: 'secondary', goto: 'PRM-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-04',
    title: 'Xác nhận thay đổi',
    entryPoint: 'PRM-03 → Tiếp tục',
    objective:
      'Tóm tắt quyền được cấp thêm, bị chặn, trả về theo vai trò và nhập lý do bắt buộc.',
    visibleData: [
      'Quyền được cấp thêm, bị chặn, trả về theo vai trò',
      'Câu "Thay đổi có hiệu lực ngay"',
      'Ô Lý do 1 đến 500 ký tự',
    ],
    userInput: ['Lý do'],
    primaryAction: 'Lưu thay đổi → PRM-05',
    secondaryActions: ['Quay lại chỉnh → PRM-03', 'Dữ liệu đã đổi → PRM-06'],
    nextScreen: 'PRM-05',
    errorsOrOutcomes: [
      'Lỗi kết nối: giữ lựa chọn và lý do, Thử lại',
      'Quyền không còn hợp lệ: nêu quyền cần bỏ chọn rồi quay lại PRM-03',
    ],
    layout: [
      bar('Xác nhận thay đổi'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Cấp thêm', value: '0 quyền' },
          { label: 'Chặn', value: '1 quyền' },
          { label: 'Trả về theo vai trò', value: '0 quyền' },
        ],
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do (bắt buộc)',
        placeholder: '1 đến 500 ký tự',
      },
      { type: 'alert', variant: 'info', text: 'Thay đổi có hiệu lực ngay.' },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Lỗi kết nối',
        text: 'Lựa chọn và lý do vẫn được giữ. Bấm Thử lại để lưu.',
      },
      buttons(
        { label: 'Lưu thay đổi', goto: 'PRM-05' },
        { label: 'Thử lại', variant: 'ghost', goto: 'PRM-05' },
        { label: 'Quay lại chỉnh', variant: 'secondary', goto: 'PRM-03' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-05',
    title: 'Đã cập nhật quyền',
    entryPoint: 'PRM-04 hoặc PRM-07 thành công',
    objective:
      'Báo thành công, số quyền thay đổi và nhân sự đã nhận thông báo hay chưa; thay đổi vẫn có hiệu lực nếu thông báo chưa gửi được.',
    visibleData: [
      'Số quyền cấp thêm, bị chặn, trả về theo vai trò',
      '"Nhân sự đã nhận thông báo" hoặc "Chưa gửi được thông báo cho nhân sự"',
    ],
    primaryAction: 'Xong → PRM-02',
    nextScreen: 'PRM-02',
    layout: [
      bar('Quyền của An Booking'),
      {
        type: 'alert',
        variant: 'success',
        title: 'Đã cập nhật quyền',
        text: '1 quyền bị chặn. Nhân sự đã nhận thông báo.',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Chưa gửi được thông báo cho nhân sự. Thay đổi vẫn có hiệu lực.',
      },
      buttons({ label: 'Xong', goto: 'PRM-02' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-06',
    title: 'Dữ liệu đã thay đổi',
    entryPoint:
      'Người khác vừa đổi quyền của nhân sự này khi đang lưu hoặc đặt lại',
    objective:
      'Báo quyền vừa đổi; chưa lưu gì; chỉ cho tải lại, không gửi lại bằng dữ liệu cũ.',
    visibleData: ['"Quyền của nhân sự này vừa được thay đổi bởi người khác"'],
    primaryAction: 'Tải lại → PRM-02',
    nextScreen: 'PRM-02',
    layout: [
      bar('Quyền của An Booking'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Quyền của nhân sự này vừa được thay đổi bởi người khác',
        text: 'Chưa có gì được lưu.',
        actionLabel: 'Tải lại',
        goto: 'PRM-02',
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-07',
    title: 'Đặt lại về quyền theo vai trò',
    entryPoint: 'PRM-02 → Đặt lại',
    objective:
      'Xoá mọi quyền cấp thêm và quyền bị chặn mà người dùng được phép xoá; nhập lý do bắt buộc.',
    visibleData: ['Giải thích đặt lại', 'Ô Lý do bắt buộc'],
    userInput: ['Lý do'],
    primaryAction: 'Đặt lại → PRM-05',
    secondaryActions: ['Huỷ → PRM-02', 'Dữ liệu đã đổi → PRM-06'],
    nextScreen: 'PRM-05',
    errorsOrOutcomes: [
      'Không còn quyền riêng nào để đặt lại: báo và quay về PRM-02',
    ],
    layout: [
      bar('Đặt lại quyền'),
      {
        type: 'text',
        text: 'Mọi quyền cấp thêm và quyền bị chặn sẽ bị xoá; nhân sự dùng đúng quyền theo vai trò.',
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do (bắt buộc)',
        placeholder: '1 đến 500 ký tự',
      },
      buttons(
        { label: 'Đặt lại', variant: 'danger', goto: 'PRM-05' },
        { label: 'Huỷ', variant: 'secondary', goto: 'PRM-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'PRM-08',
    title: 'Không thể chỉnh quyền',
    entryPoint: 'Tình huống bị chặn từ PRM-01 đến PRM-07',
    objective: 'Nêu lý do bằng ngôn ngữ người dùng và không lộ mã quyền.',
    visibleData: [
      '"Bạn không có quyền thay đổi quyền của nhân sự này"',
      '"Không thể chỉnh quyền của chính mình hoặc của người cùng cấp trở lên"',
      '"Nhân sự đã nghỉ việc"',
    ],
    primaryAction: 'Quay lại → PRM-01',
    nextScreen: 'PRM-01',
    layout: [
      bar('Không thể chỉnh quyền'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền thay đổi quyền của nhân sự này',
      },
      {
        type: 'alert',
        variant: 'danger',
        title:
          'Không thể chỉnh quyền của chính mình hoặc của người cùng cấp trở lên',
      },
      { type: 'alert', variant: 'neutral', title: 'Nhân sự đã nghỉ việc' },
      buttons({ label: 'Quay lại', goto: 'PRM-01' }),
    ],
  },
  {
    ...inApp('Nhân sự bị đổi quyền'),
    id: 'NTF-01',
    title: 'Thông báo đổi quyền cho nhân sự',
    entryPoint: 'Thông báo trong ứng dụng khi quyền làm việc đổi',
    objective:
      'Báo quyền làm việc đã đổi, không liệt kê quyền nào, không nêu lý do hay người thực hiện. Mở thông báo đưa tới tài khoản hoặc cơ sở đang làm việc.',
    visibleData: ['"Quyền làm việc của bạn tại [tên cơ sở] đã được thay đổi."'],
    primaryAction: 'Mở thông báo → Tài khoản hoặc cơ sở đang làm việc',
    nextScreen: 'Trang cơ sở',
    layout: [
      bar('Thông báo', true),
      {
        type: 'cardList',
        items: [
          {
            icon: 'bell',
            title:
              'Quyền làm việc của bạn tại Karaoke Blink Sài Gòn đã được thay đổi.',
            subtitle: 'Vừa xong',
            badge: 'Mới',
            tone: 'info',
          },
        ],
      },
    ],
  },
];

export const karaokeStaffPermissions: Flow = {
  id: 'karaoke-staff-permissions',
  title: 'Phân quyền riêng cho nhân sự',
  role: 'karaoke-owner',
  section: 'staff',
  summary:
    'Cấp thêm hoặc chặn quyền riêng cho từng nhân sự, đặt lại về quyền theo vai trò, và thông báo cho nhân sự bị đổi quyền.',
  actors: [
    'Owner',
    'Quản lý',
    'Phó quản lý được ủy quyền',
    'Nhân sự bị đổi quyền',
  ],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-permissions.md',
};
