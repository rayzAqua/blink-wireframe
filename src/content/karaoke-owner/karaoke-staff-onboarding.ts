import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const manager = 'Owner, Manager hoặc Vice Manager tạo lời mời';
const invitee = 'Người được mời';

const screens: Screen[] = [
  {
    ...inApp(manager),
    id: 'ONB-01',
    title: 'Danh sách lời mời nhân sự',
    entryPoint: 'Quản lý nhân sự → Lời mời',
    objective:
      'Xem các lời mời đã tạo. Danh sách không hiển thị token; lời mời còn chờ có thể lấy lại link, chia sẻ lại hoặc thu hồi.',
    visibleData: [
      'Vị trí, người nhận (số đã che), hạn dùng, trạng thái',
      'Lấy lại link, chia sẻ lại, thu hồi cho lời mời còn chờ',
    ],
    primaryAction: 'Tạo lời mời → ONB-02',
    secondaryActions: ['Xem link của lời mời còn chờ → ONB-03'],
    nextScreen: 'ONB-02',
    layout: [
      bar('Lời mời nhân sự'),
      {
        type: 'cardList',
        items: [
          {
            icon: 'mail',
            title: 'Booking · 0912 ••• 678',
            subtitle: 'Còn 2 ngày',
            badge: 'Chờ nhận',
            tone: 'warning',
            goto: 'ONB-03',
          },
          {
            icon: 'mail',
            title: 'Lễ tân · không gắn số',
            subtitle: 'Còn 1 ngày',
            badge: 'Chờ nhận',
            tone: 'warning',
            goto: 'ONB-03',
          },
          {
            icon: 'mail',
            title: 'Phục vụ',
            subtitle: 'Đã được nhận',
            badge: 'Đã nhận',
            tone: 'success',
          },
        ],
      },
      buttons({ label: 'Tạo lời mời', goto: 'ONB-02' }),
    ],
  },
  {
    ...inApp(manager),
    id: 'ONB-02',
    title: 'Tạo lời mời nhân sự',
    entryPoint: 'Nút Tạo lời mời',
    objective:
      'Chọn vị trí, nhập số điện thoại nếu cần và xác nhận. Lời mời có hạn cố định 3 ngày.',
    visibleData: [
      'Chi nhánh',
      'Hộp chọn vị trí: Phó quản lý, Booking, Lễ tân, Phục vụ',
      'Số điện thoại: bắt buộc với Phó quản lý, tuỳ chọn với vị trí thường',
      'Số đang làm, đang tạm dừng, đang hoàn thiện hồ sơ, lời mời còn hiệu lực',
      'Số chỗ còn lại theo gói',
      'Thời hạn cố định 3 ngày',
    ],
    userInput: ['Vị trí', 'Số điện thoại'],
    primaryAction: 'Xác nhận → ONB-03',
    secondaryActions: ['Huỷ → ONB-01'],
    nextScreen: 'ONB-03',
    errorsOrOutcomes: [
      'Hết chỗ theo gói: không tạo được lời mời mới',
      'Phó quản lý chỉ có một người hoặc một lời mời đang mở',
    ],
    layout: [
      bar('Tạo lời mời'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Chi nhánh', value: 'Karaoke Blink Sài Gòn' },
          { label: 'Thời hạn', value: '3 ngày' },
        ],
      },
      {
        type: 'field',
        kind: 'select',
        label: 'Vị trí',
        value: 'Booking',
        options: ['Phó quản lý', 'Booking', 'Lễ tân', 'Phục vụ'],
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Số điện thoại',
        placeholder: '0912 345 678',
        helper: 'Bắt buộc với Phó quản lý, tuỳ chọn với vị trí khác.',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Đang làm', value: '6' },
          { label: 'Đang tạm dừng', value: '1' },
          { label: 'Đang hoàn thiện hồ sơ', value: '1' },
          { label: 'Lời mời còn hiệu lực', value: '2' },
          { label: 'Chỗ còn lại theo gói', value: '2' },
        ],
      },
      buttons(
        { label: 'Xác nhận', goto: 'ONB-03' },
        { label: 'Huỷ', variant: 'secondary', goto: 'ONB-01' },
      ),
    ],
  },
  {
    ...inApp(manager),
    id: 'ONB-03',
    title: 'Link lời mời',
    entryPoint: 'Sau khi tạo, hoặc mở lời mời còn chờ',
    objective: 'Sao chép hoặc chia sẻ đúng link của lời mời; thu hồi khi cần.',
    visibleData: ['Link lời mời', 'Hạn dùng', 'Sao chép, chia sẻ, thu hồi'],
    primaryAction: 'Sao chép link',
    secondaryActions: ['Chia sẻ', 'Thu hồi → ONB-04', 'Về danh sách → ONB-01'],
    nextScreen: 'ONB-01',
    layout: [
      bar('Link lời mời'),
      {
        type: 'alert',
        variant: 'success',
        text: 'Đã tạo lời mời Booking. Hạn dùng 3 ngày.',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Link', value: 'blink.nexlink.vn/invite#••••' },
          { label: 'Hết hạn', value: '06/11/2026 19:00' },
        ],
      },
      buttons(
        { label: 'Sao chép link' },
        { label: 'Chia sẻ', variant: 'secondary' },
        { label: 'Thu hồi lời mời', variant: 'danger', goto: 'ONB-04' },
      ),
    ],
  },
  {
    ...inApp(manager),
    id: 'ONB-04',
    title: 'Thu hồi lời mời',
    entryPoint: 'Thu hồi ở danh sách hoặc ở màn link',
    objective:
      'Nhập lý do thu hồi. Thu hồi không ảnh hưởng vai trò hiện tại của người nhận.',
    visibleData: [
      'Ô nhập lý do bắt buộc',
      'Ghi chú không ảnh hưởng vai trò hiện tại của người nhận',
    ],
    userInput: ['Lý do thu hồi'],
    primaryAction: 'Thu hồi → ONB-01',
    secondaryActions: ['Huỷ → ONB-03'],
    nextScreen: 'ONB-01',
    layout: [
      bar('Thu hồi lời mời'),
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do thu hồi',
        placeholder: 'Nhập lý do bắt buộc',
        helper: 'Thu hồi không ảnh hưởng vai trò hiện tại của người nhận.',
      },
      buttons(
        { label: 'Thu hồi', variant: 'danger', goto: 'ONB-01' },
        { label: 'Huỷ', variant: 'secondary', goto: 'ONB-03' },
      ),
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: invitee,
    id: 'ONB-PUB',
    title: 'Xem thông tin lời mời qua link',
    entryPoint: 'Mở link lời mời nhận từ Owner hoặc Manager',
    objective:
      'Cho người nhận thấy thông tin tối thiểu và đi vào ứng dụng. Link chỉ là cửa vào, mọi bước xác nhận diễn ra trong ứng dụng.',
    visibleData: [
      'Logo, tên, địa chỉ cơ sở',
      'Vị trí được mời, người gửi, hạn dùng',
      'Số điện thoại đã che nếu link gắn số',
      'Không có dữ liệu nhân sự, doanh thu hay vận hành',
    ],
    primaryAction: 'Mở ứng dụng Blink → ONB-TRN',
    secondaryActions: [
      'Tiếp tục trên web → ONB-TRN',
      'Link không dùng được → ONB-PUB2',
    ],
    nextScreen: 'ONB-TRN',
    layout: [
      bar('Blink', false),
      {
        type: 'hero',
        title: 'Karaoke Blink Sài Gòn',
        logo: true,
        lines: ['123 Nguyễn Thị Minh Khai, Quận 1'],
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Vị trí được mời', value: 'Booking' },
          { label: 'Người gửi', value: 'Nguyễn Văn Owner' },
          { label: 'Số điện thoại', value: '0912 ••• 678' },
          { label: 'Hạn dùng', value: 'Còn 2 ngày' },
        ],
      },
      {
        type: 'text',
        text: 'Không hiển thị dữ liệu nhân sự, doanh thu hoặc cấu hình vận hành.',
        muted: true,
      },
      buttons(
        { label: 'Mở ứng dụng Blink', goto: 'ONB-TRN' },
        { label: 'Tiếp tục trên web', variant: 'secondary', goto: 'ONB-TRN' },
      ),
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: invitee,
    id: 'ONB-PUB2',
    title: 'Link không dùng được',
    entryPoint:
      'Mở link đã hết hạn, bị thu hồi, đã được nhận, đã từ chối hoặc không hợp lệ',
    objective:
      'Giải thích riêng từng trường hợp, không cho xác nhận lại và hướng dẫn liên hệ cấp quản lý để nhận link mới.',
    visibleData: [
      'Các trường hợp: hết hạn, đã thu hồi, đã được tiếp nhận, đã từ chối, link không hợp lệ',
      'Hướng dẫn liên hệ cấp quản lý',
    ],
    primaryAction: 'Đóng trang',
    layout: [
      bar('Blink', false),
      {
        type: 'empty',
        icon: 'link',
        title: 'Link lời mời không dùng được',
        text: 'Lời mời đã hết hạn hoặc đã bị thu hồi. Hãy liên hệ cấp quản lý để nhận link mới.',
      },
    ],
  },
  {
    environment: 'TRANSITION',
    actor: invitee,
    id: 'ONB-TRN',
    title: 'Chọn nơi tiếp tục',
    entryPoint: 'Từ trang link công khai',
    objective:
      'Chọn mở ứng dụng Flutter hoặc tiếp tục bằng React PWA; mọi bước xác nhận diễn ra trong ứng dụng.',
    visibleData: ['Mở ứng dụng Blink', 'Tiếp tục trên web (React PWA)'],
    primaryAction: 'Vào ứng dụng → ONB-05',
    nextScreen: 'ONB-05',
    layout: [
      bar('Blink', false),
      { type: 'heading', text: 'Tiếp tục nhận lời mời' },
      {
        type: 'text',
        text: 'Bạn cần đăng nhập hoặc đăng ký trong ứng dụng để xác nhận lời mời.',
        muted: true,
      },
      buttons(
        { label: 'Mở ứng dụng Blink', goto: 'ONB-05' },
        { label: 'Tiếp tục trên web', variant: 'secondary', goto: 'ONB-05' },
      ),
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-05',
    title: 'Đăng nhập và xác minh số điện thoại',
    entryPoint: 'Từ màn chọn nơi tiếp tục',
    objective:
      'Đăng nhập hoặc đăng ký, xác minh số điện thoại. Lời mời gắn số thì tài khoản phải có đúng số đã xác minh.',
    visibleData: ['Đăng nhập hoặc đăng ký', 'Xác minh số điện thoại'],
    primaryAction: 'Tiếp tục → ONB-06',
    nextScreen: 'ONB-06',
    layout: [
      bar('Đăng nhập', false),
      {
        type: 'field',
        kind: 'input',
        label: 'Số điện thoại',
        value: '0912 345 678',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Mã xác minh',
        placeholder: 'Nhập mã gồm 6 số',
      },
      buttons({ label: 'Tiếp tục', goto: 'ONB-06' }),
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-06',
    title: 'Xem và xác nhận lời mời',
    entryPoint: 'Sau khi đăng nhập và xác minh số',
    objective:
      'Xem đầy đủ lời mời rồi xác nhận hoặc từ chối. Chỗ trong gói chỉ được giữ khi đã xác nhận.',
    visibleData: ['Đầy đủ thông tin lời mời', 'Nút Xác nhận và Từ chối'],
    primaryAction: 'Xác nhận → ONB-07',
    secondaryActions: ['Từ chối → ONB-09'],
    nextScreen: 'ONB-07',
    errorsOrOutcomes: [
      'Hết chỗ: "Số lượng nhân sự đã đủ"; lời mời chưa được nhận, thử lại trước khi hết hạn',
    ],
    layout: [
      bar('Lời mời làm việc'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Cơ sở', value: 'Karaoke Blink Sài Gòn' },
          { label: 'Vị trí', value: 'Booking' },
          { label: 'Người gửi', value: 'Nguyễn Văn Owner' },
          { label: 'Hạn dùng', value: 'Còn 2 ngày' },
        ],
      },
      buttons(
        { label: 'Xác nhận', goto: 'ONB-07' },
        { label: 'Từ chối', variant: 'secondary', goto: 'ONB-09' },
      ),
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-07',
    title: 'Hồ sơ công việc',
    entryPoint: 'Sau khi xác nhận lời mời',
    objective:
      'Nhập biệt danh và ảnh đại diện công việc. CCCD và ảnh chân dung không bắt buộc để làm nhân sự.',
    visibleData: [
      'Biệt danh công việc (bắt buộc)',
      'Ảnh đại diện công việc (bắt buộc)',
      'Dữ liệu cũ nếu từng làm việc',
    ],
    userInput: ['Biệt danh', 'Ảnh đại diện'],
    primaryAction: 'Hoàn tất → ONB-08',
    nextScreen: 'ONB-08',
    errorsOrOutcomes: [
      'Booking và mọi role có quyền đặt phòng hiển thị là "Booking" trên giao diện khách xác nhận đơn',
    ],
    layout: [
      bar('Hồ sơ công việc'),
      {
        type: 'field',
        kind: 'input',
        label: 'Biệt danh công việc',
        placeholder: 'Ví dụ: An Booking',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Ảnh đại diện công việc',
        placeholder: 'Chọn ảnh',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'CCCD và ảnh chân dung không bắt buộc để đăng ký làm nhân sự.',
      },
      buttons({ label: 'Hoàn tất', goto: 'ONB-08' }),
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-08',
    title: 'Hoàn tất nhận việc',
    entryPoint: 'Sau khi hoàn thiện hồ sơ công việc',
    objective:
      'Hiển thị biệt danh, ảnh, vị trí, mã nhân sự và cơ sở; nơi làm việc mới xuất hiện trong tài khoản.',
    visibleData: ['Biệt danh, ảnh, vị trí, mã nhân sự, cơ sở'],
    primaryAction: 'Vào ứng dụng',
    layout: [
      bar('Hoàn tất', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Bạn đã trở thành nhân sự',
        text: 'Nơi làm việc mới đã xuất hiện trong tài khoản.',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Biệt danh', value: 'An Booking' },
          { label: 'Vị trí', value: 'Booking' },
          { label: 'Mã nhân sự', value: 'NV-0007' },
          { label: 'Cơ sở', value: 'Karaoke Blink Sài Gòn' },
        ],
      },
      buttons({ label: 'Vào ứng dụng' }),
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-09',
    title: 'Hộp lời mời trong tài khoản',
    entryPoint: 'Tài khoản → Lời mời làm việc',
    objective:
      'Xử lý lời mời mới và đăng ký đang hoàn thiện từ nhiều cơ sở; từ chối đăng ký dở để giải phóng chỗ.',
    visibleData: [
      'Lời mời mới gắn đúng số điện thoại',
      'Đăng ký đang hoàn thiện',
      'Gợi ý Tiếp tục đăng ký khi chỉ có một đăng ký dở và chưa có nơi làm việc',
    ],
    primaryAction: 'Chọn lời mời → ONB-06',
    secondaryActions: ['Tiếp tục đăng ký → ONB-07'],
    nextScreen: 'ONB-06',
    layout: [
      bar('Lời mời làm việc'),
      { type: 'heading', text: 'Lời mời mới' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'mail',
            title: 'Karaoke Blink Quận 7',
            subtitle: 'Vị trí Lễ tân',
            badge: 'Mới',
            tone: 'info',
            goto: 'ONB-06',
          },
        ],
      },
      { type: 'heading', text: 'Đăng ký đang hoàn thiện' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'user-plus',
            title: 'Karaoke Blink Sài Gòn',
            subtitle: 'Cần hoàn thiện hồ sơ công việc',
            badge: 'Đang dở',
            tone: 'warning',
            goto: 'ONB-07',
          },
        ],
      },
    ],
  },
  {
    ...inApp(invitee),
    id: 'ONB-10',
    title: 'Lỗi khi nhận lời mời',
    entryPoint: 'Lời mời không còn hợp lệ trong lúc xử lý',
    objective:
      'Màn riêng cho từng lỗi: hết hạn hoặc thu hồi, sai số điện thoại, cơ sở hoặc gói tạm không hoạt động, hết chỗ, Phó quản lý không còn trống, người khác đã nhận.',
    visibleData: [
      'Lời mời hết hạn hoặc đã bị thu hồi',
      'Tài khoản sai số điện thoại',
      'Cơ sở hoặc gói tạm không hoạt động',
      'Số lượng nhân sự đã đủ',
      'Vị trí Phó quản lý không còn trống',
      'Lời mời đã được người khác tiếp nhận',
    ],
    primaryAction: 'Về hộp lời mời → ONB-09',
    nextScreen: 'ONB-09',
    layout: [
      bar('Lời mời làm việc'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Số lượng nhân sự đã đủ',
        text: 'Lời mời chưa được nhận. Bạn có thể thử lại trước khi hết hạn.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Tài khoản chưa đúng số điện thoại',
        text: 'Lời mời này gắn với số khác.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Vị trí Phó quản lý không còn trống',
      },
      {
        type: 'alert',
        variant: 'neutral',
        title: 'Lời mời đã được người khác tiếp nhận',
      },
      buttons({ label: 'Về hộp lời mời', goto: 'ONB-09' }),
    ],
  },
];

export const karaokeStaffOnboarding: Flow = {
  id: 'karaoke-staff-onboarding',
  title: 'Mời và đăng ký nhân sự Karaoke',
  role: 'karaoke-owner',
  section: 'staff',
  summary:
    'Cấp quản lý tạo lời mời nhân sự, người nhận mở link công khai, đăng nhập, xác nhận và hoàn thiện hồ sơ công việc trong ứng dụng.',
  actors: ['Owner, Manager hoặc Vice Manager', 'Người được mời'],
  environments: ['FLUTTER_APP', 'WEB_PUBLIC', 'TRANSITION'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-onboarding.md',
};
