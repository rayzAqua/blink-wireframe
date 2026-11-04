import type { Block, Flow, Screen } from '../../domain/types.ts';

const hero = (extra?: Partial<Extract<Block, { type: 'hero' }>>): Block => ({
  type: 'hero',
  title: 'Karaoke Blink Sài Gòn',
  verified: true,
  planTag: 'Gói Pro',
  planGoto: 'subscriptions-owner-management/SUB-01',
  cover: true,
  logo: true,
  lines: [
    '123 Nguyễn Thị Minh Khai, Quận 1',
    'Hotline 0901 234 567 · Mở cửa 11:00 (ngày hoạt động 24 giờ)',
  ],
  status: 'Đang hoạt động',
  goto: 'ACC-10',
  action: { label: 'Đổi chi nhánh', goto: 'ACC-02' },
  ...extra,
});

/** The four menu groups of the account screen. */
const menu: Block[] = [
  {
    type: 'listGroup',
    label: 'Vận hành quán',
    rows: [
      { icon: 'settings', title: 'Thiết lập quán hát', goto: 'ACC-11' },
      {
        icon: 'users',
        title: 'Quản lý nhân sự',
        goto: 'karaoke-staff-management/STF-01',
      },
      {
        icon: 'git-branch',
        title: 'Quản lý chi nhánh',
        goto: 'karaoke-branch-creation/BR-01',
      },
      {
        icon: 'key-round',
        title: 'Thu ngân',
        goto: 'cashier-terminal-authentication/CSH-01',
      },
      {
        icon: 'wallet',
        title: 'Gói nhân sự',
        goto: 'subscriptions-owner-management/SUB-01',
      },
      { icon: 'handshake', title: 'Cộng tác viên', goto: 'ACC-17' },
      { icon: 'qr-code', title: 'QR phòng', badge: 'Sắp có', goto: 'ACC-03' },
    ],
  },
  {
    type: 'listGroup',
    label: 'Khách hàng và kinh doanh',
    rows: [
      { icon: 'handshake', title: 'Hợp tác đối tác', goto: 'ACC-20' },
      { icon: 'book-user', title: 'Danh bạ khách hàng', goto: 'ACC-24' },
      { icon: 'gift', title: 'Quà tặng', badge: 'Sắp có', goto: 'ACC-03' },
      { icon: 'mail', title: 'Lời mời phòng', badge: 'Sắp có', goto: 'ACC-03' },
    ],
  },
  {
    type: 'listGroup',
    label: 'Cài đặt',
    rows: [
      { icon: 'bell', title: 'Thông báo', goto: 'ACC-26' },
      {
        icon: 'help-circle',
        title: 'Trợ giúp & hỗ trợ',
        badge: 'Sắp có',
        goto: 'ACC-03',
      },
    ],
  },
  {
    type: 'listGroup',
    label: 'Tài khoản',
    rows: [
      { icon: 'user', title: 'Cập nhật thông tin tài khoản', goto: 'ACC-12' },
      { icon: 'lock', title: 'Phương thức đăng nhập', goto: 'ACC-27' },
      { icon: 'log-out', title: 'Đăng xuất', tone: 'danger', goto: 'ACC-04' },
    ],
  },
];

const appBar: Block = { type: 'appBar', title: 'Tài khoản', actions: ['bell'] };

/** The Owner's own account: avatar and full name; tapping opens the account update screen. */
const profile: Block = {
  type: 'profile',
  name: 'Nguyễn Văn Owner',
  subtitle: 'Chủ cơ sở · chạm để cập nhật thông tin tài khoản',
  goto: 'ACC-12',
};

const common = {
  environment: 'FLUTTER_APP' as const,
  actor: 'Owner Karaoke',
};

const screens: Screen[] = [
  {
    ...common,
    id: 'ACC-01',
    title: 'Tài khoản Owner',
    entryPoint: 'Thẻ Tài khoản trong thanh điều hướng của ứng dụng',
    objective:
      'Xem thông tin chi nhánh đang chọn, đổi chi nhánh và mở các chức năng vận hành, kinh doanh, cài đặt và tài khoản.',
    visibleData: [
      'Thông tin tài khoản của Owner: avatar và họ và tên (chạm để cập nhật)',
      'Ảnh bìa, logo, tên cơ sở, tích xanh hậu kiểm, nhãn tên gói',
      'Địa chỉ, hotline, giờ mở cửa, trạng thái vận hành',
      'Bốn nhóm nút: Vận hành quán, Khách hàng và kinh doanh, Cài đặt, Tài khoản',
    ],
    primaryAction: 'Chạm thẻ cơ sở → ACC-10',
    secondaryActions: [
      'Đổi chi nhánh → ACC-02',
      'Thiết lập quán hát → ACC-11',
      'Đăng xuất → ACC-04',
    ],
    nextScreen: 'ACC-10',
    layout: [appBar, profile, hero(), ...menu],
  },
  {
    ...common,
    id: 'ACC-02',
    title: 'Chọn chi nhánh',
    entryPoint: 'Nút Đổi chi nhánh trên thẻ cơ sở',
    objective:
      'Chuyển sang chi nhánh khác của Owner. Mỗi dòng có logo, tên, địa chỉ ngắn, nhãn trạng thái và dấu chọn ở chi nhánh đang dùng.',
    visibleData: [
      'Danh sách chi nhánh của Owner',
      'Logo và nhãn trạng thái từng chi nhánh',
      'Nút Thêm chi nhánh',
    ],
    primaryAction: 'Chọn chi nhánh → ACC-01',
    secondaryActions: ['Thêm chi nhánh (sang luồng tạo chi nhánh)'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Chi nhánh không còn khả dụng: báo và tự chuyển sang chi nhánh còn lại',
    ],
    layout: [
      appBar,
      profile,
      hero(),
      {
        type: 'bottomSheet',
        title: 'Chọn chi nhánh',
        blocks: [
          {
            type: 'cardList',
            items: [
              {
                icon: 'building',
                title: 'Karaoke Blink Sài Gòn',
                subtitle: 'Quận 1 · đang chọn',
                badge: 'Đang hoạt động',
                tone: 'success',
                goto: 'ACC-01',
              },
              {
                icon: 'building',
                title: 'Karaoke Blink Quận 7',
                subtitle: 'Quận 7',
                badge: 'Hạn chế',
                tone: 'warning',
                goto: 'ACC-08',
              },
              {
                icon: 'building',
                title: 'Karaoke Blink Thủ Đức',
                subtitle: 'Thủ Đức',
                badge: 'Chấm dứt',
                tone: 'danger',
                goto: 'ACC-09',
              },
            ],
          },
          {
            type: 'actions',
            buttons: [
              {
                label: 'Thêm chi nhánh',
                variant: 'secondary',
                goto: 'karaoke-branch-creation/BR-01',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-03',
    title: 'Chức năng sắp có',
    entryPoint: 'Chạm QR phòng, Quà tặng, Lời mời phòng hoặc Trợ giúp & hỗ trợ',
    objective: 'Báo ngắn rằng chức năng chưa có, không mở màn hình mới.',
    visibleData: [
      'Thông báo ngắn "Sắp có" ở cuối màn hình',
      'Nhãn "Sắp có" ở cuối các dòng chưa dùng được',
    ],
    primaryAction: 'Thông báo tự tắt → ACC-01',
    nextScreen: 'ACC-01',
    layout: [
      appBar,
      profile,
      hero(),
      ...menu,
      { type: 'toast', text: 'Sắp có' },
    ],
  },
  {
    ...common,
    id: 'ACC-04',
    title: 'Xác nhận đăng xuất',
    entryPoint: 'Dòng Đăng xuất',
    objective: 'Xác nhận kết thúc phiên trên thiết bị này.',
    visibleData: [
      'Câu hỏi "Đăng xuất khỏi Blink trên thiết bị này?"',
      'Nút Đăng xuất và nút Huỷ',
    ],
    primaryAction: 'Đăng xuất → quay về đăng nhập',
    secondaryActions: ['Huỷ → ACC-01'],
    nextScreen: 'Màn hình đăng nhập',
    errorsOrOutcomes: [
      'Mất kết nối: vẫn thoát khỏi ứng dụng, phiên trên máy chủ được dọn khi có mạng',
      'Thiết bị ngừng nhận thông báo riêng của tài khoản và xoá chi nhánh đã nhớ',
    ],
    layout: [
      appBar,
      profile,
      hero(),
      ...menu,
      {
        type: 'modal',
        title: 'Đăng xuất khỏi Blink trên thiết bị này?',
        blocks: [
          {
            type: 'text',
            text: 'Bạn sẽ ngừng nhận thông báo của tài khoản này trên thiết bị.',
            muted: true,
          },
        ],
        buttons: [
          { label: 'Đăng xuất', variant: 'danger' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-01' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-05',
    title: 'Đang tải thông tin cơ sở',
    entryPoint: 'Mở màn hình Tài khoản hoặc đổi chi nhánh',
    objective: 'Cho biết đang tải; các nút Cài đặt và Tài khoản vẫn dùng được.',
    visibleData: [
      'Khung chờ thay cho thẻ cơ sở',
      'Các nút Cài đặt và Tài khoản',
    ],
    primaryAction: 'Tải xong → ACC-01',
    nextScreen: 'ACC-01',
    layout: [appBar, profile, { type: 'skeleton', lines: 3 }, menu[2], menu[3]],
  },
  {
    ...common,
    id: 'ACC-06',
    title: 'Không tải được thông tin cơ sở',
    entryPoint: 'Mất mạng hoặc lỗi khi tải',
    objective:
      'Báo lỗi tại thẻ cơ sở và cho thử lại; phần còn lại của màn hình vẫn dùng được.',
    visibleData: [
      'Thông báo lỗi kèm nút Thử lại',
      'Các nút Cài đặt và Tài khoản',
    ],
    primaryAction: 'Thử lại → ACC-05',
    secondaryActions: ['Đăng xuất → ACC-04'],
    nextScreen: 'ACC-05',
    layout: [
      appBar,
      profile,
      {
        type: 'alert',
        variant: 'danger',
        title: 'Không tải được thông tin cơ sở',
        text: 'Kiểm tra kết nối rồi thử lại.',
        actionLabel: 'Thử lại',
        goto: 'ACC-05',
      },
      menu[2],
      menu[3],
    ],
  },
  {
    ...common,
    id: 'ACC-07',
    title: 'Blink yêu cầu bổ sung hồ sơ',
    entryPoint:
      'Chi nhánh đang chọn có kết quả hậu kiểm Yêu cầu bổ sung hoặc Không đạt',
    objective:
      'Cho Owner thấy nội dung Blink yêu cầu và đưa tới màn hình cập nhật hồ sơ.',
    visibleData: [
      'Banner nội dung yêu cầu và thời điểm gửi',
      'Nút Cập nhật hồ sơ',
      'Không có tích xanh cạnh tên',
    ],
    primaryAction: 'Cập nhật hồ sơ → ACC-10',
    nextScreen: 'ACC-10',
    errorsOrOutcomes: [
      'Sau khi gửi bổ sung: banner đổi thành "Đã gửi — đang chờ Blink kiểm tra", không còn nút',
    ],
    layout: [
      appBar,
      profile,
      {
        type: 'alert',
        variant: 'warning',
        title: 'Blink cần bạn cập nhật thông tin cơ sở',
        text: 'Bổ sung địa chỉ chi nhánh. Gửi lúc 09:30 ngày 03/11.',
        actionLabel: 'Cập nhật hồ sơ',
        goto: 'ACC-10',
      },
      hero({ verified: false }),
      ...menu,
    ],
  },
  {
    ...common,
    id: 'ACC-08',
    title: 'Cơ sở bị hạn chế bởi Blink',
    entryPoint: 'Chi nhánh đang chọn bị hạn chế hoặc tạm ngưng trên nền tảng',
    objective:
      'Cho biết cơ sở bị hạn chế; hồ sơ và trạng thái vận hành vẫn sửa được, nhiều thiết lập bị khoá.',
    visibleData: [
      'Dải thông báo đầu trang',
      'Nhãn trạng thái trên thẻ cơ sở',
      'Các nút vẫn mở được nhưng thiết lập bên trong bị khoá',
    ],
    primaryAction: 'Cập nhật hồ sơ → ACC-10',
    nextScreen: 'ACC-10',
    layout: [
      appBar,
      profile,
      {
        type: 'alert',
        variant: 'danger',
        title: 'Cơ sở đang bị hạn chế bởi Blink',
        text: 'Giờ mở cửa, ngân hàng, phòng và giá, cấu hình đặt phòng, quản lý Thu ngân đang bị khoá.',
      },
      hero({ status: 'Hạn chế', statusTone: 'warning' }),
      ...menu,
    ],
  },
  {
    ...common,
    id: 'ACC-09',
    title: 'Cơ sở đã chấm dứt hợp tác',
    entryPoint: 'Chi nhánh đang chọn đã chấm dứt hoặc đã xoá',
    objective:
      'Chỉ xem; mọi nút thao tác ghi bị mờ. Vẫn đổi được sang chi nhánh khác và đăng xuất được.',
    visibleData: [
      'Dải thông báo cơ sở đã chấm dứt hợp tác',
      'Các nút thao tác bị mờ',
      'Nút Đổi chi nhánh và Đăng xuất vẫn dùng được',
    ],
    primaryAction: 'Đổi chi nhánh → ACC-02',
    nextScreen: 'ACC-02',
    layout: [
      appBar,
      profile,
      {
        type: 'alert',
        variant: 'neutral',
        title: 'Cơ sở đã chấm dứt hợp tác',
        text: 'Bạn chỉ xem được thông tin. Hãy chọn chi nhánh khác để tiếp tục vận hành.',
        actionLabel: 'Đổi chi nhánh',
        goto: 'ACC-02',
      },
      hero({
        status: 'Đã chấm dứt',
        statusTone: 'neutral',
        verified: false,
        goto: undefined,
      }),
      {
        type: 'listGroup',
        label: 'Vận hành quán',
        rows: [
          { icon: 'settings', title: 'Thiết lập quán hát', disabled: true },
          { icon: 'users', title: 'Quản lý nhân sự', disabled: true },
          { icon: 'key-round', title: 'Thu ngân', disabled: true },
        ],
      },
      menu[3],
    ],
  },
  {
    ...common,
    id: 'ACC-10',
    title: 'Cập nhật thông tin cơ sở',
    entryPoint: 'Thẻ cơ sở, nhãn trạng thái vận hành hoặc nút Cập nhật hồ sơ',
    objective:
      'Sửa hồ sơ cơ sở: hình ảnh, thông tin chung, giờ mở cửa, tài khoản ngân hàng và trạng thái vận hành.',
    visibleData: [
      'Ảnh bìa, logo và ảnh liên quan',
      'Tên, địa chỉ, hotline, thông tin liên hệ',
      'Một mốc giờ mở cửa; giờ đóng cửa là cùng giờ đó của ngày hôm sau',
      'Tài khoản ngân hàng',
      'Trạng thái vận hành: Đang hoạt động, Tạm dừng, Ngừng',
    ],
    userInput: [
      'Tên',
      'Địa chỉ',
      'Hotline',
      'Giờ mở cửa',
      'Tài khoản ngân hàng',
      'Trạng thái vận hành',
    ],
    primaryAction: 'Lưu → ACC-01',
    secondaryActions: ['Huỷ → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Hotline trùng: báo ngay tại ô nhập và giữ nguyên dữ liệu',
      'Đổi hotline thì số đăng nhập Thu ngân đổi theo; gỡ hotline thì dùng số điện thoại của Owner',
      'Đổi giờ mở cửa bị chặn nếu ngày nghiệp vụ hiện tại đã có đơn',
      'Cơ sở bị Blink hạn chế: giờ mở cửa và tài khoản ngân hàng bị khoá kèm giải thích',
    ],
    layout: [
      { type: 'appBar', title: 'Cập nhật thông tin cơ sở', back: true },
      { type: 'heading', text: 'Hình ảnh' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Ảnh bìa', value: 'Đã có' },
          { label: 'Logo', value: 'Đã có' },
          { label: 'Ảnh liên quan', value: '4 ảnh' },
        ],
      },
      { type: 'heading', text: 'Thông tin chung' },
      {
        type: 'field',
        kind: 'input',
        label: 'Tên cơ sở',
        value: 'Karaoke Blink Sài Gòn',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Địa chỉ',
        value: '123 Nguyễn Thị Minh Khai, Quận 1',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hotline',
        value: '0901 234 567',
        error: 'Số hotline đã được cơ sở khác sử dụng.',
      },
      { type: 'heading', text: 'Giờ mở cửa' },
      {
        type: 'field',
        kind: 'input',
        label: 'Giờ mở cửa',
        value: '11:00',
        helper:
          'Giờ đóng cửa là 11:00 ngày hôm sau. Đổi giờ sẽ dịch bảng giá của mọi phòng.',
      },
      { type: 'heading', text: 'Tài khoản ngân hàng' },
      {
        type: 'field',
        kind: 'input',
        label: 'Số tài khoản',
        value: '0123 456 789 · Vietcombank',
      },
      { type: 'heading', text: 'Trạng thái vận hành' },
      {
        type: 'field',
        kind: 'radio',
        label: 'Trạng thái',
        value: 'Đang hoạt động',
        options: ['Đang hoạt động', 'Tạm dừng', 'Ngừng'],
        helper:
          'Tạm dừng hoặc Ngừng: cơ sở không hiện khi khách chọn quán và Thu ngân không đăng nhập được.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-01' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-01' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-11',
    title: 'Thiết lập quán',
    entryPoint: 'Nút Thiết lập quán hát',
    objective:
      'Danh mục các thiết lập của cơ sở: phòng và giá, tầng, giờ mở cửa, đặt phòng, nhãn đơn, hoa hồng, ngân hàng.',
    visibleData: [
      'Phòng và giá',
      'Tầng',
      'Giờ mở cửa',
      'Cấu hình đặt phòng',
      'Nhãn đơn',
      'Hoa hồng',
      'Tài khoản ngân hàng',
    ],
    primaryAction: 'Chọn một dòng thiết lập',
    secondaryActions: ['Quay lại → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Cơ sở bị Blink hạn chế: các dòng phòng và giá, đặt phòng, giờ mở cửa, ngân hàng bị khoá',
    ],
    layout: [
      { type: 'appBar', title: 'Thiết lập quán', back: true },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'door-open',
            title: 'Phòng và giá',
            description: 'Phòng, ảnh, bảng giá, nhận đặt từng phòng',
            goto: 'karaoke-room-management/ROOM-01',
          },
          {
            icon: 'layers',
            title: 'Tầng',
            description: 'Số tầng, đóng hoặc mở từng tầng',
            goto: 'karaoke-floors/FLR-01',
          },
          {
            icon: 'clock',
            title: 'Giờ mở cửa',
            description: 'Một mốc giờ dùng chung cả tuần',
            goto: 'ACC-10',
          },
          {
            icon: 'calendar',
            title: 'Cấu hình đặt phòng',
            description:
              'Thời gian giữ chỗ, hạn nhận phòng, thời lượng mặc định',
            goto: 'ACC-14',
          },
          {
            icon: 'tag',
            title: 'Nhãn đơn',
            description: 'Tạo, sửa, ngừng dùng nhãn',
            goto: 'booking-tagging/TAG-01',
          },
          {
            icon: 'percent',
            title: 'Hoa hồng',
            description: 'Tỷ lệ hoa hồng phòng và món, tối đa 50%',
            goto: 'ACC-15',
          },
          { icon: 'landmark', title: 'Tài khoản ngân hàng', goto: 'ACC-10' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-12',
    title: 'Cập nhật thông tin tài khoản',
    entryPoint:
      'Chạm phần thông tin tài khoản (avatar và họ tên) ở đầu màn Tài khoản, hoặc dòng Cập nhật thông tin tài khoản',
    objective:
      'Xem và sửa hồ sơ cá nhân của Owner: avatar, họ và tên, ngày sinh, giới tính, biệt danh, email; mở xác minh danh tính CCCD.',
    visibleData: [
      'Avatar và họ và tên',
      'Ngày sinh, giới tính (Nam hoặc Nữ; có thể để trống)',
      'Biệt danh, email',
      'Trạng thái xác minh danh tính CCCD',
    ],
    userInput: [
      'Avatar',
      'Họ và tên',
      'Ngày sinh',
      'Giới tính',
      'Biệt danh',
      'Email',
    ],
    primaryAction: 'Lưu → ACC-01',
    secondaryActions: ['Huỷ → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Sau khi tài khoản đã có số định danh, họ tên, ngày sinh và giới tính chỉ đổi được bằng cách quét lại CCCD',
      'Thay đổi thật các thông tin đã xác minh sẽ gỡ tích xanh danh tính cá nhân',
    ],
    layout: [
      { type: 'appBar', title: 'Thông tin tài khoản', back: true },
      {
        type: 'profile',
        name: 'Nguyễn Văn Owner',
        subtitle: 'Chạm để đổi ảnh đại diện',
        verified: true,
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Họ và tên',
        value: 'Nguyễn Văn Owner',
      },
      { type: 'field', kind: 'input', label: 'Ngày sinh', value: '15/06/1985' },
      {
        type: 'field',
        kind: 'select',
        label: 'Giới tính',
        value: 'Nam',
        options: ['Nam', 'Nữ'],
      },
      { type: 'field', kind: 'input', label: 'Biệt danh', value: 'Anh Owner' },
      {
        type: 'field',
        kind: 'input',
        label: 'Email',
        value: 'owner@example.com',
      },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'badge-check',
            title: 'Xác minh danh tính CCCD',
            description: 'Đã xác minh',
            chevron: true,
          },
        ],
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Họ tên, ngày sinh và giới tính của tài khoản đã xác minh chỉ đổi được bằng cách quét lại CCCD. Thay đổi thật sẽ gỡ tích xanh danh tính.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-01' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-01' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-13',
    title: 'Trạng thái hậu kiểm cạnh tên cơ sở',
    entryPoint:
      'Chi nhánh đang chọn đang được Blink kiểm tra, không đạt hoặc đã gửi bổ sung',
    objective:
      'Cho Owner biết kết quả hậu kiểm bằng chữ ngay cạnh tên cơ sở. Chưa kiểm tra và Đạt (tích xanh) đã có ở màn chính; màn này vẽ ba trường hợp còn lại.',
    visibleData: [
      'Đang kiểm tra: không có tích xanh, nhãn "Blink đang kiểm tra"',
      'Không đạt: không có tích xanh, nhãn "Chưa đạt kiểm tra" và nội dung Blink nêu',
      'Đã gửi bổ sung: banner "Đã gửi — đang chờ Blink kiểm tra", không còn nút',
      'Kết quả hậu kiểm không làm cơ sở ngừng hoạt động; các nút bên dưới vẫn dùng đầy đủ',
    ],
    primaryAction: 'Chạm nhãn kết quả → xem giải thích ngắn',
    secondaryActions: ['Cập nhật hồ sơ → ACC-10', 'Quay lại → ACC-01'],
    nextScreen: 'ACC-10',
    layout: [
      appBar,
      profile,
      hero({
        verified: false,
        status: 'Blink đang kiểm tra',
        statusTone: 'info',
      }),
      { type: 'heading', text: 'Không đạt' },
      hero({
        verified: false,
        status: 'Chưa đạt kiểm tra',
        statusTone: 'danger',
        action: undefined,
      }),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Nội dung Blink nêu',
        text: 'Địa chỉ chi nhánh chưa khớp với thực tế. Hãy cập nhật hồ sơ.',
        actionLabel: 'Cập nhật hồ sơ',
        goto: 'ACC-10',
      },
      { type: 'heading', text: 'Đã gửi bổ sung' },
      {
        type: 'alert',
        variant: 'info',
        title: 'Đã gửi — đang chờ Blink kiểm tra',
      },
    ],
  },
  {
    ...common,
    id: 'ACC-14',
    title: 'Cấu hình đặt phòng',
    entryPoint: 'Thiết lập quán → Cấu hình đặt phòng',
    objective:
      'Chỉnh thời gian giữ chỗ, hạn nhận phòng, thời lượng mặc định và việc mở phòng khi đơn còn chờ xác nhận. Khoảng đệm 60 phút giữa hai lượt đặt là cố định, chỉ hiển thị để biết.',
    visibleData: [
      'Thời gian giữ chỗ chờ khách xác nhận: 5 đến 120 phút, mặc định 15',
      'Hạn nhận phòng sau giờ hẹn: 15 đến 240 phút, mặc định 60',
      'Thời lượng chơi mặc định (khách đến trực tiếp): 30 đến 720 phút, mặc định 120',
      'Cho phép mở phòng khi đơn còn chờ xác nhận: bật hoặc tắt, mặc định tắt',
      'Khoảng đệm 60 phút giữa hai lượt đặt: cố định, không chỉnh được',
    ],
    userInput: [
      'Thời gian giữ chỗ',
      'Hạn nhận phòng',
      'Thời lượng mặc định',
      'Cho phép mở phòng khi chờ xác nhận',
    ],
    primaryAction: 'Lưu → ACC-11',
    secondaryActions: ['Huỷ → ACC-11'],
    nextScreen: 'ACC-11',
    errorsOrOutcomes: [
      'Giá trị ngoài khoảng cho phép: báo ngay tại ô nhập và giữ nguyên dữ liệu',
      'Cấu hình vừa được đổi ở thiết bị khác: báo và tải lại, không ghi đè',
      'Hạn nhận phòng áp dụng cả cho đơn đã xác nhận trước đó; thời gian giữ chỗ chỉ áp dụng cho đơn tạo sau khi đổi',
      'Cơ sở bị Blink hạn chế: các ô bị khoá kèm giải thích',
    ],
    layout: [
      { type: 'appBar', title: 'Cấu hình đặt phòng', back: true },
      {
        type: 'field',
        kind: 'input',
        label: 'Thời gian giữ chỗ chờ khách xác nhận (phút)',
        value: '15',
        helper: 'Từ 5 đến 120 phút. Chỉ áp dụng cho đơn tạo sau khi đổi.',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hạn nhận phòng sau giờ hẹn (phút)',
        value: '300',
        error: 'Chỉ được từ 15 đến 240 phút.',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Thời lượng chơi mặc định cho khách đến trực tiếp (phút)',
        value: '120',
        helper: 'Từ 30 đến 720 phút.',
      },
      {
        type: 'field',
        kind: 'switch',
        label: 'Cho phép mở phòng khi đơn còn chờ xác nhận',
        checked: false,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Khoảng đệm giữa hai lượt đặt', value: '60 phút (cố định)' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Cấu hình vừa được đổi ở thiết bị khác',
        text: 'Tải lại để xem bản mới nhất rồi lưu lại.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-11' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-11' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-15',
    title: 'Hoa hồng',
    entryPoint: 'Thiết lập quán → Hoa hồng',
    objective:
      'Xem tỷ lệ hoa hồng phòng và hoa hồng món của từng nhân sự và mở để chỉnh. Mỗi loại tối đa 50%. Owner không có tỷ lệ riêng vì Owner không phải nhân sự.',
    visibleData: [
      'Danh sách nhân sự chưa nghỉ việc (đang làm hoặc đang tạm dừng) kèm tỷ lệ phòng và món',
      'Tỷ lệ chưa cấu hình hiển thị 0%',
      'Mức hoa hồng chung của cơ sở (tối đa 50%): sắp có',
    ],
    primaryAction: 'Chọn nhân sự → ACC-16',
    secondaryActions: ['Quay lại → ACC-11'],
    nextScreen: 'ACC-16',
    errorsOrOutcomes: [
      'Hoa hồng chỉ được ghi khi đơn hoàn thành thanh toán; phần ghi nhận và chi trả chưa triển khai',
    ],
    layout: [
      { type: 'appBar', title: 'Hoa hồng', back: true },
      {
        type: 'alert',
        variant: 'info',
        text: 'Mỗi loại tối đa 50%. Hoa hồng chỉ được ghi khi đơn hoàn thành thanh toán.',
      },
      {
        type: 'listGroup',
        label: 'Mức chung của cơ sở',
        rows: [
          {
            icon: 'percent',
            title: 'Hoa hồng phòng và món chung của cơ sở',
            description: 'Tối đa 50% mỗi loại',
            badge: 'Sắp có',
          },
        ],
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'user',
            title: 'An Booking · 01',
            subtitle: 'Phòng 10% · Món 5%',
            goto: 'ACC-16',
          },
          {
            icon: 'user',
            title: 'Bình Lễ tân · 02',
            subtitle: 'Phòng 0% · Món 0%',
            badge: 'Đang tạm dừng',
            tone: 'warning',
            goto: 'ACC-16',
          },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-16',
    title: 'Chỉnh hoa hồng của nhân sự',
    entryPoint: 'ACC-15 → chọn một nhân sự',
    objective:
      'Đặt tỷ lệ hoa hồng phòng và hoa hồng món cho một nhân sự. Mỗi lần lưu phải gửi đủ cả hai loại.',
    visibleData: [
      'Nhân sự và vị trí',
      'Hoa hồng phòng (0% đến 50%, tối đa 2 chữ số thập phân)',
      'Hoa hồng món (0% đến 50%, tối đa 2 chữ số thập phân)',
    ],
    userInput: ['Hoa hồng phòng', 'Hoa hồng món'],
    primaryAction: 'Lưu → ACC-15',
    secondaryActions: ['Huỷ → ACC-15'],
    nextScreen: 'ACC-15',
    errorsOrOutcomes: [
      'Vượt 50% hoặc nhiều hơn 2 chữ số thập phân: báo tại ô nhập',
      'Chỉ nhân sự chưa nghỉ việc mới chỉnh được',
      'Đơn nguồn Booking lưu tỷ lệ hoa hồng phòng của người tạo tại thời điểm tạo đơn',
    ],
    layout: [
      { type: 'appBar', title: 'An Booking', back: true },
      {
        type: 'keyValue',
        rows: [
          { label: 'Vị trí', value: 'Booking' },
          { label: 'Mã nhân sự', value: '01' },
        ],
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hoa hồng phòng (%)',
        value: '10',
        helper: 'Từ 0 đến 50, tối đa 2 chữ số thập phân.',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hoa hồng món (%)',
        value: '55',
        error: 'Tối đa 50%.',
      },
      {
        type: 'text',
        text: 'Mỗi lần lưu cần có đủ hoa hồng phòng và hoa hồng món.',
        muted: true,
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-15' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-15' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-17',
    title: 'Cộng tác viên của quán',
    entryPoint: 'Vận hành quán → Cộng tác viên',
    objective:
      'Tạo lời mời đăng ký CTV gắn quán làm nguồn và xem các lời mời đã tạo. Xem, cập nhật và kết thúc quan hệ CTV tại quán chưa có.',
    visibleData: [
      'Danh sách lời mời CTV: trạng thái chờ dùng, đã dùng, hết hạn, thu hồi',
      'Mỗi lời mời dùng một lần và hết hạn sau 7 ngày',
      'Xem, cập nhật, kết thúc quan hệ CTV tại quán: sắp có',
    ],
    primaryAction: 'Tạo lời mời CTV → ACC-18',
    secondaryActions: ['Mở lời mời → ACC-19', 'Quay lại → ACC-01'],
    nextScreen: 'ACC-18',
    errorsOrOutcomes: [
      'Cần quyền mời CTV; quán phải là Karaoke đang hoạt động',
    ],
    layout: [
      { type: 'appBar', title: 'Cộng tác viên', back: true },
      {
        type: 'alert',
        variant: 'info',
        text: 'Mỗi lời mời chỉ dùng một lần và hết hạn sau 7 ngày. CTV đăng ký xong sẽ tự có quan hệ hợp tác với quán.',
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'mail',
            title: 'Lời mời CTV #1',
            subtitle: 'Hết hạn 11/11/2026',
            badge: 'Chờ dùng',
            tone: 'warning',
            goto: 'ACC-19',
          },
          {
            icon: 'mail',
            title: 'Lời mời CTV #2',
            subtitle: 'Đã dùng 02/11/2026',
            badge: 'Đã dùng',
            tone: 'success',
          },
          {
            icon: 'mail',
            title: 'Lời mời CTV #3',
            subtitle: 'Hết hạn 25/10/2026',
            badge: 'Hết hạn',
            tone: 'neutral',
          },
        ],
      },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'users',
            title: 'Xem, cập nhật, kết thúc quan hệ CTV',
            badge: 'Sắp có',
          },
        ],
      },
      {
        type: 'actions',
        buttons: [{ label: 'Tạo lời mời CTV', goto: 'ACC-18' }],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-18',
    title: 'Tạo lời mời CTV',
    entryPoint: 'ACC-17 → Tạo lời mời CTV',
    objective: 'Xác nhận tạo một lời mời đăng ký CTV gắn quán nguồn.',
    visibleData: ['Quán nguồn', 'Hiệu lực 7 ngày, dùng một lần'],
    primaryAction: 'Tạo lời mời → ACC-19',
    secondaryActions: ['Huỷ → ACC-17'],
    nextScreen: 'ACC-19',
    errorsOrOutcomes: [
      'Quán không còn hoạt động hoặc bị hạn chế: không tạo được',
    ],
    layout: [
      { type: 'appBar', title: 'Tạo lời mời CTV', back: true },
      {
        type: 'hero',
        title: 'Karaoke Blink Sài Gòn',
        logo: true,
        lines: ['Quán nguồn của CTV đăng ký bằng lời mời này'],
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Hiệu lực', value: '7 ngày' },
          { label: 'Số lần dùng', value: '1 lần' },
        ],
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Tạo lời mời', goto: 'ACC-19' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-17' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-19',
    title: 'Link và mã QR lời mời CTV',
    entryPoint: 'Sau khi tạo, hoặc mở một lời mời còn chờ',
    objective:
      'Sao chép hoặc chia sẻ link và mã QR của lời mời. Người mở link sẽ vào luồng đăng ký CTV.',
    visibleData: ['Link và mã QR', 'Hạn dùng', 'Sao chép, chia sẻ'],
    primaryAction: 'Sao chép link',
    secondaryActions: ['Chia sẻ', 'Về danh sách → ACC-17'],
    nextScreen: 'ACC-17',
    layout: [
      { type: 'appBar', title: 'Lời mời CTV', back: true },
      {
        type: 'alert',
        variant: 'success',
        text: 'Đã tạo lời mời. Hạn dùng 7 ngày, dùng một lần.',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Link', value: 'blink.nexlink.vn/ctv#••••' },
          { label: 'Hết hạn', value: '11/11/2026 09:00' },
        ],
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Sao chép link' },
          { label: 'Chia sẻ', variant: 'secondary' },
          { label: 'Về danh sách', variant: 'ghost', goto: 'ACC-17' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-20',
    title: 'Hợp tác đối tác',
    entryPoint: 'Khách hàng và kinh doanh → Hợp tác đối tác',
    objective:
      'Xem quan hệ hợp tác với nhà hàng (đang hợp tác, chờ, tạm dừng, đã kết thúc) và gửi yêu cầu mới. Quan hệ đang chờ hoặc đã kết thúc không được coi là đang hợp tác.',
    visibleData: [
      'Quan hệ theo trạng thái',
      'Yêu cầu nhận được cần xử lý',
      'Nút Gửi yêu cầu hợp tác',
      'Tìm đối tác: sắp có (hiện gửi theo mã cơ sở)',
    ],
    primaryAction: 'Gửi yêu cầu hợp tác → ACC-21',
    secondaryActions: [
      'Xử lý yêu cầu nhận được → ACC-22',
      'Chọn quan hệ → ACC-23',
    ],
    nextScreen: 'ACC-21',
    layout: [
      { type: 'appBar', title: 'Hợp tác đối tác', back: true },
      {
        type: 'tabs',
        items: ['Đang hợp tác', 'Chờ xử lý', 'Đã kết thúc'],
        active: 0,
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'handshake',
            title: 'Nhà hàng Hương Việt',
            subtitle: 'Hợp tác từ 01/10/2026',
            badge: 'Đang hợp tác',
            tone: 'success',
            goto: 'ACC-23',
          },
          {
            icon: 'handshake',
            title: 'Nhà hàng Biển Xanh',
            subtitle: 'Gửi bởi nhà hàng · cần bạn trả lời',
            badge: 'Chờ bạn xử lý',
            tone: 'warning',
            goto: 'ACC-22',
          },
          {
            icon: 'handshake',
            title: 'Nhà hàng Sen Vàng',
            subtitle: 'Bạn đã tạm dừng',
            badge: 'Tạm dừng',
            tone: 'neutral',
            goto: 'ACC-23',
          },
        ],
      },
      {
        type: 'actions',
        buttons: [{ label: 'Gửi yêu cầu hợp tác', goto: 'ACC-21' }],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-21',
    title: 'Gửi yêu cầu hợp tác',
    entryPoint: 'ACC-20 → Gửi yêu cầu hợp tác',
    objective:
      'Gửi yêu cầu tới một nhà hàng theo mã cơ sở đối tác. Hai cơ sở phải khác loại (Karaoke với nhà hàng).',
    visibleData: [
      'Ô nhập mã cơ sở đối tác',
      'Thông tin cơ sở tìm được trước khi gửi',
    ],
    userInput: ['Mã cơ sở đối tác'],
    primaryAction: 'Gửi yêu cầu → ACC-20',
    secondaryActions: ['Huỷ → ACC-20'],
    nextScreen: 'ACC-20',
    errorsOrOutcomes: [
      'Cùng loại cơ sở, bên kia đã gửi yêu cầu cho bạn đang chờ, hoặc một trong hai cơ sở không được phép hoạt động: không gửi được',
      'Bên gửi không rút được yêu cầu đang chờ',
    ],
    layout: [
      { type: 'appBar', title: 'Gửi yêu cầu hợp tác', back: true },
      {
        type: 'field',
        kind: 'input',
        label: 'Mã cơ sở đối tác',
        value: 'NH-00123',
      },
      {
        type: 'alert',
        variant: 'danger',
        text: 'Nhà hàng này đã gửi yêu cầu hợp tác cho bạn. Hãy trả lời yêu cầu đó.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Gửi yêu cầu', goto: 'ACC-20' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-20' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-22',
    title: 'Trả lời yêu cầu hợp tác',
    entryPoint: 'Yêu cầu do nhà hàng gửi tới',
    objective: 'Chấp nhận hoặc từ chối. Từ chối phải nhập lý do.',
    visibleData: [
      'Thông tin nhà hàng gửi yêu cầu',
      'Nút Chấp nhận và Từ chối',
      'Ô lý do bắt buộc khi từ chối',
    ],
    userInput: ['Lý do từ chối'],
    primaryAction: 'Chấp nhận → ACC-20',
    secondaryActions: ['Từ chối → ACC-20'],
    nextScreen: 'ACC-20',
    errorsOrOutcomes: [
      'Chỉ bên nhận được chấp nhận hoặc từ chối',
      'Chấp nhận chỉ thành công khi cả hai cơ sở được phép hoạt động',
    ],
    layout: [
      { type: 'appBar', title: 'Yêu cầu hợp tác', back: true },
      {
        type: 'hero',
        title: 'Nhà hàng Biển Xanh',
        logo: true,
        lines: ['Gửi yêu cầu hợp tác cho Karaoke Blink Sài Gòn'],
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do (bắt buộc khi từ chối)',
        placeholder: 'Nhập lý do',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Chấp nhận', goto: 'ACC-20' },
          { label: 'Từ chối', variant: 'danger', goto: 'ACC-20' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-23',
    title: 'Chi tiết quan hệ hợp tác',
    entryPoint: 'Chọn một quan hệ ở ACC-20',
    objective:
      'Xem quan hệ và kết thúc hoặc khôi phục. Khôi phục chỉ dành cho bên đã tạm dừng; cơ sở không tự gỡ quyết định tạm dừng của Admin.',
    visibleData: [
      'Thông tin nhà hàng và trạng thái quan hệ',
      'Kết thúc hợp tác',
      'Khôi phục khi chính cơ sở đã tạm dừng',
      'Tạm dừng bởi Blink Admin: không gỡ được',
    ],
    primaryAction: 'Kết thúc hợp tác → ACC-20',
    secondaryActions: ['Khôi phục → ACC-20'],
    nextScreen: 'ACC-20',
    errorsOrOutcomes: [
      'Tạm dừng và kết thúc vẫn làm được khi cơ sở bị hạn chế; khôi phục cần cả hai cơ sở được phép hoạt động',
    ],
    layout: [
      { type: 'appBar', title: 'Nhà hàng Sen Vàng', back: true },
      {
        type: 'keyValue',
        rows: [
          { label: 'Trạng thái', value: 'Tạm dừng bởi bạn' },
          { label: 'Hợp tác từ', value: '15/09/2026' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Nếu Blink Admin tạm dừng quan hệ, cơ sở không tự khôi phục được.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Khôi phục', goto: 'ACC-20' },
          { label: 'Kết thúc hợp tác', variant: 'danger', goto: 'ACC-20' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-24',
    title: 'Danh bạ khách hàng',
    entryPoint: 'Khách hàng và kinh doanh → Danh bạ khách hàng',
    objective:
      'Tìm khách theo tên hoặc số điện thoại. Owner xem được danh bạ của người khác trong cơ sở nhưng chỉ sửa, xoá và dùng liên hệ của chính mình.',
    visibleData: [
      'Ô tìm theo tên hoặc số điện thoại',
      'Liên hệ của tôi và liên hệ của người khác trong cơ sở (chỉ xem)',
      'Số lần dùng và lần dùng gần nhất',
      'Xem lịch sử khách: sắp có',
    ],
    primaryAction: 'Thêm liên hệ → ACC-25',
    secondaryActions: ['Chọn liên hệ của tôi → ACC-25'],
    nextScreen: 'ACC-25',
    layout: [
      {
        type: 'appBar',
        title: 'Danh bạ khách hàng',
        back: true,
        actions: ['search'],
      },
      { type: 'tabs', items: ['Của tôi', 'Của người khác'], active: 0 },
      {
        type: 'cardList',
        items: [
          {
            icon: 'book-user',
            title: 'Nguyễn Thị Hoa',
            subtitle: '0912 345 678 · dùng 3 lần',
            goto: 'ACC-25',
          },
          {
            icon: 'book-user',
            title: 'Lê Văn Nam',
            subtitle: '0987 654 321 · dùng 1 lần',
            goto: 'ACC-25',
          },
        ],
      },
      {
        type: 'text',
        text: 'Liên hệ của người khác trong cơ sở chỉ để xem, không sửa hay xoá được.',
        muted: true,
      },
      { type: 'actions', buttons: [{ label: 'Thêm liên hệ', goto: 'ACC-25' }] },
    ],
  },
  {
    ...common,
    id: 'ACC-25',
    title: 'Thêm hoặc sửa liên hệ',
    entryPoint: 'ACC-24 → Thêm liên hệ hoặc chọn liên hệ của tôi',
    objective:
      'Nhập tên, số điện thoại và ghi chú; có thể xoá liên hệ của chính mình.',
    visibleData: [
      'Tên (tối đa 120 ký tự)',
      'Số điện thoại theo định dạng quốc tế',
      'Ghi chú (tối đa 2000 ký tự)',
      'Xoá liên hệ (chỉ liên hệ của tôi)',
    ],
    userInput: ['Tên', 'Số điện thoại', 'Ghi chú'],
    primaryAction: 'Lưu → ACC-24',
    secondaryActions: ['Xoá liên hệ → ACC-24', 'Huỷ → ACC-24'],
    nextScreen: 'ACC-24',
    errorsOrOutcomes: ['Số điện thoại sai định dạng: báo tại ô nhập'],
    layout: [
      { type: 'appBar', title: 'Liên hệ', back: true },
      { type: 'field', kind: 'input', label: 'Tên', value: 'Nguyễn Thị Hoa' },
      {
        type: 'field',
        kind: 'input',
        label: 'Số điện thoại',
        value: '0912 345',
        error: 'Số điện thoại chưa đúng định dạng.',
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Ghi chú',
        placeholder: 'Tối đa 2000 ký tự',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-24' },
          { label: 'Xoá liên hệ', variant: 'danger', goto: 'ACC-24' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-24' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-26',
    title: 'Thông báo',
    entryPoint: 'Cài đặt → Thông báo',
    objective:
      'Bật hoặc tắt nhận thông báo đẩy trên thiết bị và xem trung tâm thông báo: đánh dấu đã đọc, xoá. Mở thông báo đưa tới đúng nội dung và kiểm tra lại quyền.',
    visibleData: [
      'Công tắc nhận thông báo đẩy trên thiết bị',
      'Danh sách thông báo kèm tên cơ sở',
      'Đánh dấu đã đọc, xoá',
      'Tuỳ chọn theo từng loại thông báo: chưa có',
    ],
    primaryAction: 'Mở một thông báo → đúng nội dung',
    secondaryActions: ['Quay lại → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Nội dung thông báo đẩy là câu chung "Bạn có thông báo mới. Mở Blink để xem chi tiết."',
      'Đăng xuất: thiết bị ngừng nhận thông báo của tài khoản cũ',
    ],
    layout: [
      { type: 'appBar', title: 'Thông báo', back: true },
      {
        type: 'field',
        kind: 'switch',
        label: 'Nhận thông báo đẩy trên thiết bị này',
        checked: true,
        helper: 'Nội dung đẩy chỉ là "Bạn có thông báo mới".',
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'bell',
            title: 'Yêu cầu bổ sung hồ sơ',
            subtitle: 'Karaoke Blink Sài Gòn · 09:30',
            badge: 'Mới',
            tone: 'info',
          },
          {
            icon: 'bell',
            title: 'Lời mời Quản lý được chấp nhận',
            subtitle: 'Karaoke Blink Quận 7 · hôm qua',
          },
        ],
      },
      {
        type: 'actions',
        buttons: [{ label: 'Đánh dấu tất cả đã đọc', variant: 'secondary' }],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-27',
    title: 'Phương thức đăng nhập',
    entryPoint: 'Tài khoản → Phương thức đăng nhập',
    objective:
      'Xem các cách đăng nhập của tài khoản và quản lý: mật khẩu, số điện thoại, Google, Apple.',
    visibleData: [
      'Mật khẩu: đổi mật khẩu',
      'Số điện thoại đã xác minh',
      'Google và Apple: liên kết hoặc huỷ liên kết',
      'Thu hồi các phiên đăng nhập khác',
    ],
    primaryAction: 'Đổi mật khẩu → ACC-28',
    secondaryActions: ['Quay lại → ACC-01'],
    nextScreen: 'ACC-28',
    layout: [
      { type: 'appBar', title: 'Phương thức đăng nhập', back: true },
      {
        type: 'listGroup',
        label: 'Đăng nhập',
        rows: [
          {
            icon: 'lock',
            title: 'Mật khẩu',
            description: 'Đổi lần cuối 01/10/2026',
            goto: 'ACC-28',
          },
          {
            icon: 'phone',
            title: 'Số điện thoại',
            description: '0912 ••• 678 · đã xác minh',
          },
          {
            icon: 'globe',
            title: 'Google',
            description: 'Chưa liên kết',
            badge: 'Liên kết',
          },
          {
            icon: 'smartphone',
            title: 'Apple',
            description: 'Đã liên kết',
            badge: 'Huỷ liên kết',
          },
        ],
      },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'log-out',
            title: 'Đăng xuất các thiết bị khác',
            tone: 'danger',
          },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-28',
    title: 'Đổi mật khẩu',
    entryPoint: 'ACC-27 → Mật khẩu',
    objective: 'Nhập mật khẩu hiện tại và mật khẩu mới để đổi mật khẩu.',
    visibleData: ['Mật khẩu hiện tại', 'Mật khẩu mới', 'Nhập lại mật khẩu mới'],
    userInput: ['Mật khẩu hiện tại', 'Mật khẩu mới', 'Nhập lại mật khẩu mới'],
    primaryAction: 'Lưu → ACC-27',
    secondaryActions: ['Huỷ → ACC-27'],
    nextScreen: 'ACC-27',
    errorsOrOutcomes: [
      'Sai mật khẩu hiện tại hoặc mật khẩu mới không khớp: báo tại ô nhập',
    ],
    layout: [
      { type: 'appBar', title: 'Đổi mật khẩu', back: true },
      {
        type: 'field',
        kind: 'input',
        label: 'Mật khẩu hiện tại',
        placeholder: '••••••••',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Mật khẩu mới',
        placeholder: '••••••••',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Nhập lại mật khẩu mới',
        placeholder: '••••••••',
        error: 'Mật khẩu nhập lại chưa khớp.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-27' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-27' },
        ],
      },
    ],
  },
];

export const accountHome: Flow = {
  id: 'account-home',
  title: 'Tài khoản Owner Karaoke',
  role: 'karaoke-owner',
  section: 'account',
  summary:
    'Màn hình Tài khoản của Owner: thông tin cơ sở và chi nhánh đang chọn, các nhóm chức năng vận hành, kinh doanh, cài đặt, tài khoản, và các màn hình mà từng nút mở ra ở cấp một.',
  actors: ['Owner Karaoke'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/account-home.md',
};
