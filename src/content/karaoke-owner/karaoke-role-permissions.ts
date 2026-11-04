import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner hoặc Quản lý chi nhánh';
const affected =
  'Thay đổi có hiệu lực ngay với mọi nhân sự mang vai trò này tại cơ sở.';

const permissionRows: Block = {
  type: 'listGroup',
  label: 'Nhóm Phòng',
  rows: [
    {
      icon: 'door-open',
      title: 'Xem danh sách phòng',
      description: 'Mặc định của Blink · đang dùng',
    },
    {
      icon: 'door-open',
      title: 'Huỷ đơn đặt phòng',
      description: 'Tắt tại cơ sở · không dùng',
      badge: 'Tắt',
    },
    {
      icon: 'lock',
      title: 'Xem hồ sơ danh tính',
      description: 'Quyền nhạy cảm · mặc định của Blink',
    },
  ],
};

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'ROL-01',
    title: 'Danh sách vai trò của cơ sở',
    entryPoint: 'Cài đặt cơ sở → Phân quyền theo vai trò',
    objective:
      'Xem năm vai trò, vai trò nào đã tuỳ chỉnh và số nhân sự đang mang vai trò. Vai trò không được chỉnh hiển thị khoá kèm lý do.',
    visibleData: [
      'Năm vai trò: Quản lý, Phó quản lý, Đặt phòng, Lễ tân, Phục vụ phòng',
      'Nhãn Đã tuỳ chỉnh hoặc Đang dùng mặc định của Blink',
      'Số quyền đã tuỳ chỉnh, số nhân sự',
      'Khoá kèm lý do cho vai trò người xem không chỉnh được',
    ],
    primaryAction: 'Chọn vai trò → ROL-02',
    nextScreen: 'ROL-02',
    errorsOrOutcomes: ['Không tải được: nút Thử lại'],
    layout: [
      bar('Phân quyền theo vai trò'),
      {
        type: 'alert',
        variant: 'info',
        text: 'Vai trò do Blink định nghĩa; cơ sở chỉ thay đổi các quyền của vai trò đó tại cơ sở của mình, ảnh hưởng mọi nhân sự mang vai trò.',
      },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'user-cog',
            title: 'Quản lý',
            description: 'Đang dùng mặc định · 1 nhân sự',
            badge: 'Chỉ chủ cơ sở chỉnh',
            disabled: true,
          },
          {
            icon: 'user-cog',
            title: 'Phó quản lý',
            description: 'Đã tuỳ chỉnh 2 quyền · 1 nhân sự',
            goto: 'ROL-02',
          },
          {
            icon: 'user',
            title: 'Đặt phòng',
            description: 'Đang dùng mặc định · 3 nhân sự',
            goto: 'ROL-02',
          },
          {
            icon: 'user',
            title: 'Lễ tân',
            description: 'Đang dùng mặc định · 2 nhân sự',
            goto: 'ROL-02',
          },
          {
            icon: 'user',
            title: 'Phục vụ phòng',
            description: 'Đang dùng mặc định · 5 nhân sự',
            goto: 'ROL-02',
          },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-02',
    title: 'Quyền của một vai trò',
    entryPoint: 'Chọn một vai trò ở ROL-01',
    objective:
      'Xem quyền theo nhóm với ba trạng thái: Mặc định của Blink, Bật thêm tại cơ sở, Tắt tại cơ sở, và quyền đang dùng hay không.',
    visibleData: [
      'Tên vai trò, số nhân sự bị ảnh hưởng',
      'Quyền theo nhóm, có thể mở rộng hoặc thu gọn',
      'Nhãn Quyền nhạy cảm',
    ],
    primaryAction: 'Chỉnh quyền → ROL-03',
    secondaryActions: [
      'Đặt lại về mặc định của Blink → ROL-07',
      'Quay lại → ROL-01',
    ],
    nextScreen: 'ROL-03',
    errorsOrOutcomes: [
      'Không tải được: Thử lại',
      'Vai trò không còn cấu hình được: ROL-08',
    ],
    layout: [
      bar('Phó quản lý'),
      {
        type: 'keyValue',
        rows: [{ label: 'Nhân sự bị ảnh hưởng', value: '1' }],
      },
      permissionRows,
      buttons(
        { label: 'Chỉnh quyền', goto: 'ROL-03' },
        {
          label: 'Đặt lại về mặc định của Blink',
          variant: 'secondary',
          goto: 'ROL-07',
        },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-03',
    title: 'Chỉnh quyền của vai trò',
    entryPoint: 'ROL-02 → Chỉnh quyền',
    objective:
      'Đổi trạng thái từng quyền khi được phép. Điều khiển không được phép chỉnh bị khoá kèm lý do ngắn.',
    visibleData: [
      'Quyền chưa có: chỉ Bật thêm tại cơ sở hoặc giữ nguyên',
      'Quyền đang có: chỉ Tắt tại cơ sở hoặc giữ nguyên',
      'Quyền đã tuỳ chỉnh: thêm Về mặc định của Blink',
      'Quyền nhạy cảm không bật thêm được cho Đặt phòng, Lễ tân, Phục vụ phòng',
      'Cảnh báo riêng khi thêm quyền ủy quyền phân quyền cho Phó quản lý',
      'Tắt quyền ở cấp vai trò thắng quyền cấp riêng cho từng người',
    ],
    primaryAction: 'Tiếp tục → ROL-04',
    secondaryActions: ['Huỷ → ROL-02'],
    nextScreen: 'ROL-04',
    layout: [
      bar('Chỉnh quyền Phó quản lý'),
      {
        type: 'field',
        kind: 'switch',
        label: 'Xem danh sách phòng',
        checked: true,
        helper: 'Mặc định của Blink',
      },
      {
        type: 'field',
        kind: 'switch',
        label: 'Huỷ đơn đặt phòng',
        checked: false,
        helper: 'Tắt tại cơ sở',
      },
      {
        type: 'field',
        kind: 'switch',
        label: 'Phân quyền cho nhân sự',
        checked: true,
        helper: 'Quyền ủy quyền · Bạn không được cấp quyền này',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Tắt quyền ở cấp vai trò sẽ thắng quyền đã cấp riêng cho từng người. Thêm quyền phân quyền cho Phó quản lý ủy quyền cho mọi Phó quản lý tại cơ sở.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'ROL-04' },
        { label: 'Huỷ', variant: 'secondary', goto: 'ROL-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-04',
    title: 'Xác nhận thay đổi',
    entryPoint: 'ROL-03 → Tiếp tục',
    objective:
      'Tóm tắt quyền được bật thêm, bị tắt, trả về mặc định, số nhân sự bị ảnh hưởng và nhập lý do bắt buộc.',
    visibleData: [
      'Quyền được bật thêm, bị tắt, trả về mặc định',
      'Số nhân sự bị ảnh hưởng',
      'Câu "Thay đổi có hiệu lực ngay"',
      'Ô Lý do 1 đến 500 ký tự',
    ],
    userInput: ['Lý do'],
    primaryAction: 'Lưu thay đổi → ROL-05',
    secondaryActions: ['Quay lại chỉnh → ROL-03', 'Dữ liệu đã đổi → ROL-06'],
    nextScreen: 'ROL-05',
    errorsOrOutcomes: [
      'Lỗi kết nối: giữ nguyên lựa chọn và lý do, Thử lại',
      'Thay đổi không còn hợp lệ: nêu quyền cần bỏ chọn rồi quay lại ROL-03',
    ],
    layout: [
      bar('Xác nhận thay đổi'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Bật thêm', value: '0 quyền' },
          { label: 'Tắt tại cơ sở', value: '1 quyền' },
          { label: 'Trả về mặc định', value: '0 quyền' },
          { label: 'Nhân sự bị ảnh hưởng', value: '1' },
        ],
      },
      { type: 'alert', variant: 'info', text: affected },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do (bắt buộc)',
        placeholder: '1 đến 500 ký tự',
      },
      buttons(
        { label: 'Lưu thay đổi', goto: 'ROL-05' },
        { label: 'Quay lại chỉnh', variant: 'secondary', goto: 'ROL-03' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-05',
    title: 'Đã cập nhật vai trò',
    entryPoint: 'Lưu thay đổi hoặc đặt lại thành công',
    objective:
      'Báo thành công, số quyền được bật thêm, bị tắt, trả về mặc định và số nhân sự bị ảnh hưởng.',
    visibleData: [
      'Thông báo thành công',
      'Số quyền thay đổi',
      'Số nhân sự bị ảnh hưởng',
    ],
    primaryAction: 'Xong → ROL-02',
    nextScreen: 'ROL-02',
    layout: [
      bar('Phó quản lý'),
      {
        type: 'alert',
        variant: 'success',
        title: 'Đã cập nhật vai trò Phó quản lý',
        text: '1 quyền bị tắt. Thay đổi áp dụng cho 1 nhân sự.',
      },
      buttons({ label: 'Xong', goto: 'ROL-02' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-06',
    title: 'Dữ liệu đã thay đổi',
    entryPoint:
      'Người khác vừa đổi cấu hình quyền của cơ sở khi đang lưu hoặc đặt lại',
    objective:
      'Báo cấu hình quyền vừa đổi; chưa lưu gì; chỉ cho tải lại, không gửi lại bằng dữ liệu cũ.',
    visibleData: [
      '"Cấu hình quyền của cơ sở vừa được thay đổi bởi người khác hoặc quyền của bạn đã thay đổi"',
    ],
    primaryAction: 'Tải lại → ROL-02',
    nextScreen: 'ROL-02',
    layout: [
      bar('Phó quản lý'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Cấu hình quyền đã thay đổi',
        text: 'Cấu hình quyền của cơ sở vừa được thay đổi bởi người khác hoặc quyền của bạn đã thay đổi. Chưa có gì được lưu.',
        actionLabel: 'Tải lại',
        goto: 'ROL-02',
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-07',
    title: 'Đặt lại về mặc định của Blink',
    entryPoint: 'ROL-02 → Đặt lại',
    objective:
      'Xoá các tuỳ chỉnh được phép xoá và đưa vai trò về quyền mặc định của Blink; nhập lý do bắt buộc.',
    visibleData: [
      'Giải thích đặt lại',
      'Số nhân sự bị ảnh hưởng',
      'Ô Lý do bắt buộc',
    ],
    userInput: ['Lý do'],
    primaryAction: 'Đặt lại → ROL-05',
    secondaryActions: ['Huỷ → ROL-02', 'Dữ liệu đã đổi → ROL-06'],
    nextScreen: 'ROL-05',
    errorsOrOutcomes: [
      'Không còn tuỳ chỉnh nào để đặt lại: báo và quay về ROL-02',
    ],
    layout: [
      bar('Đặt lại Phó quản lý'),
      {
        type: 'text',
        text: 'Mọi tuỳ chỉnh của vai trò sẽ bị xoá và vai trò quay về quyền mặc định của Blink.',
      },
      {
        type: 'keyValue',
        rows: [{ label: 'Nhân sự bị ảnh hưởng', value: '1' }],
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do (bắt buộc)',
        placeholder: '1 đến 500 ký tự',
      },
      buttons(
        { label: 'Đặt lại', variant: 'danger', goto: 'ROL-05' },
        { label: 'Huỷ', variant: 'secondary', goto: 'ROL-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'ROL-08',
    title: 'Không thể chỉnh vai trò',
    entryPoint: 'Tình huống bị chặn từ ROL-01 đến ROL-07',
    objective: 'Nêu lý do bằng ngôn ngữ người dùng và không lộ mã quyền.',
    visibleData: [
      '"Bạn không có quyền thay đổi cấu hình quyền của cơ sở"',
      '"Chỉ chủ cơ sở chỉnh được vai trò Quản lý"',
      '"Vai trò này không thể cấu hình"',
    ],
    primaryAction: 'Quay lại → ROL-01',
    nextScreen: 'ROL-01',
    layout: [
      bar('Không thể chỉnh vai trò'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Chỉ chủ cơ sở chỉnh được vai trò Quản lý',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền thay đổi cấu hình quyền của cơ sở',
      },
      {
        type: 'alert',
        variant: 'neutral',
        title: 'Vai trò này không thể cấu hình',
      },
      buttons({ label: 'Quay lại', goto: 'ROL-01' }),
    ],
  },
];

export const karaokeRolePermissions: Flow = {
  id: 'karaoke-role-permissions',
  title: 'Cấu hình quyền của vai trò tại cơ sở',
  role: 'karaoke-owner',
  section: 'staff',
  summary:
    'Owner và Quản lý chi nhánh bật hoặc tắt quyền của từng vai trò tại cơ sở; thay đổi áp dụng ngay cho mọi nhân sự mang vai trò đó.',
  actors: ['Owner', 'Quản lý chi nhánh'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-role-permissions.md',
};
